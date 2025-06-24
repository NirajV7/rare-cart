//File to Create: server/routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Your model
const mongoose = require('mongoose');
const adminAuth = require('../middleware/adminAuth'); 

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET live products
router.get('/live', async (req, res) => {
  try {
    const liveProducts = await Product.find({
      isLive: true,
      isSold: false
    });
    res.json(liveProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New GET upcoming products
router.get('/upcoming', async (req, res) => {
  const currentTime = new Date();
  
  try {
    const upcomingProducts = await Product.find({
      dropTime: { $gt: currentTime },
      isSold: false,
      isLive:false
    })
    .sort({ dropTime: 1 }) // Ascending order (soonest first)
    .select('-__v -createdAt -updatedAt') // Exclude technical fields
    .limit(50); // Prevent excessive data
    
    res.json(upcomingProducts);
  } catch (err) {
    res.status(500).json({ 
      message: "Failed to fetch upcoming products",
      error: err.message 
    });
  }
});

// Add protected update endpoint
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update allowed fields
    const updatableFields = ['name', 'description', 'price', 'imageUrl', 'category', 'dropTime'];
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add protected delete endpoint
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get Admin Products
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ dropTime: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new product
router.post('/', adminAuth, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    dropTime: req.body.dropTime
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const product = await Product.findById(req.params.id)
      .select('-__v -createdAt -updatedAt'); // Exclude technical fields

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to fetch product',
      error: err.message 
    });
  }
});
router.post('/:id/lock', async (req, res) => {
  try {
    const productId = req.params.id;
    const { socketId } = req.body; // Client's socket ID

    if (!socketId) {
      return res.status(400).json({ message: 'Socket ID required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate product state
    if (!product.isLive) {
      return res.status(400).json({ message: 'Product is not live' });
    }
    if (product.isLocked) {
      return res.status(409).json({ 
        message: 'Product already locked',
        lockedBy: product.lockedBy,
        lockExpiresAt: product.lockExpiresAt
      });
    }
    if (product.isSold) {
      return res.status(400).json({ message: 'Product already sold' });
    }

    // Attempt to lock the product atomically
    const lockExpiresAt = new Date(Date.now() + 60000); // 60 seconds from now
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: productId,
        isLocked: false, // Only lock if currently unlocked
        isSold: false
      },
      {
        isLocked: true,
        lockedBy: socketId,
        lockExpiresAt
      },
      { new: true } // Return updated document
    );

    if (!updatedProduct) {
      return res.status(409).json({ message: 'Lock conflict - please try again' });
    }

    // Broadcast lock event to all clients
    const io = req.app.get('io');
    io.emit('product_locked', {
      productId,
      lockedBy: socketId,
      lockExpiresAt
    });

    res.json({
      message: 'Product locked successfully',
      lockExpiresAt,
      product: updatedProduct
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/:id/confirm', async (req, res) => {
  try {
    const productId = req.params.id;
    const { socketId } = req.body;

    if (!socketId) {
      return res.status(400).json({ message: 'Socket ID required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate lock ownership
    if (!product.isLocked || product.lockedBy !== socketId) {
      return res.status(403).json({ message: 'You do not hold the lock' });
    }

    // Mark as sold
    const soldProduct = await Product.findByIdAndUpdate(
      productId,
      {
        isLocked: false,
        isSold: true,
        soldAt: new Date(),
        lockedBy: null,
        lockExpiresAt: null
      },
      { new: true }
    );

    // Broadcast sold event
    const io = req.app.get('io');
    io.emit('product_sold', {
      productId,
      soldAt: soldProduct.soldAt
    });

    res.json({
      message: 'Purchase confirmed successfully',
      product: soldProduct
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
