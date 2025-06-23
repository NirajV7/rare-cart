const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: "Limited edition item"
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    default: "/placeholder.jpg"
  },
  dropTime: {
    type: Date,
    required: true
  },
  isLive: {
    type: Boolean,
    default: false
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  lockedBy: {
    type: String,  // Will store socket ID or user ID later
    default: null
  },
  lockExpiresAt: {
    type: Date,
    default: null
  },
  isSold: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true  // Adds createdAt/updatedAt automatically
});

module.exports = mongoose.model('Product', productSchema);
