const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create product
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get upcoming drops
router.get('/products/upcoming', async (req, res) => {
  const products = await Product.find({
    dropTime: { $gt: new Date() },
    isSold: false
  }).sort('dropTime');
  res.send(products);
});

module.exports = router;