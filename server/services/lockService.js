const Product = require('../models/Product');

async function releaseExpiredLocks(io) {
  try {
    const now = new Date();
    const expiredLocks = await Product.find({
      isLocked: true,
      lockExpiresAt: { $lt: now }
    });

    for (const product of expiredLocks) {
      // Release lock atomically
      const unlockedProduct = await Product.findOneAndUpdate(
        {
          _id: product._id,
          isLocked: true,
          lockExpiresAt: { $lt: now } // Double-check expiration
        },
        {
          isLocked: false,
          lockedBy: null,
          lockExpiresAt: null
        },
        { new: true }
      );

      if (unlockedProduct) {
        // Broadcast unlock event
        io.emit('product_unlocked', {
          productId: product._id,
          reason: 'lock_expired'
        });
        // ✅ Broadcast toast-style notification
        io.emit('notification', {
          type: 'lock_expired',
          message: `⏱️ Lock expired for ${unlockedProduct.name}`
        });
      }
    }
  } catch (err) {
    console.error('Error releasing expired locks:', err);
  }
}

// Run every 15 seconds
function startLockCleanup(io) {
  setInterval(() => releaseExpiredLocks(io), 15000);
}

module.exports = { startLockCleanup };
