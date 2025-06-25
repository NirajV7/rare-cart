const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // We'll track users by their session/socket ID
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  lockAttempts: {
    type: Number,
    default: 0
  },
  purchases: {
    type: Number,
    default: 0
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Static method to update user stats
userSchema.statics.updateUserStats = async function(sessionId, action) {
  const updateData = { 
    lastActivity: Date.now(),
    $inc: {}
  };
  
  if (action === 'lock') {
    updateData.$inc.lockAttempts = 1;
  } else if (action === 'purchase') {
    updateData.$inc.purchases = 1;
  }
  
  return this.findOneAndUpdate(
    { sessionId },
    updateData,
    { upsert: true, new: true }
  );
};

module.exports = mongoose.model('User', userSchema);
