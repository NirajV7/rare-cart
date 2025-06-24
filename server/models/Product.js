const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0.01, 'Price must be at least 0.01']
  },
  imageUrl: {
    type: String,
    default: '',
    validate: {
      validator: v => v === '' || v.startsWith('https://'),
      message: 'Image URL must be a valid HTTPS link'
    }
  },
  category: {
    type: String,
    default: 'general'
  },
  dropTime: {
    type: Date,
    required: [true, 'Drop time is required'],
    validate: {
      validator: v => v > Date.now(),
      message: 'Drop time must be in the future'
    }
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
    type: String,
    default: null
  },
  isSold: {
    type: Boolean,
    default: false
  },
  soldAt: {
    type: Date,
    default: null
  },
  lockExpiresAt: {
  type: Date,
  default: null
}
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
