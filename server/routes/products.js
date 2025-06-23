//File to Create: server/routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Your model

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
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
      isSold: false
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

// POST create new product
router.post('/', async (req, res) => {
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

module.exports = router;
