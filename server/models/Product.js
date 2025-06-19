const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  dropTime: { type: Date, required: true },
  isLive: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
  lockedBy: { type: String, default: null }, // socketId or userId
  lockExpiresAt: Date,
  isSold: { type: Boolean, default: false },
  category: { type: String, enum: ['sneakers', 'art', 'collectibles'] }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);