const Product = require('../models/Product');

async function activateProducts(io) {
  try {
    const now = new Date();
    
    // Find products that should be activated
    const productsToActivate = await Product.find({
      isLive: false,
      isSold: false,
      dropTime: { $lte: now } // Drop time has passed
    });

    for (const product of productsToActivate) {
      try {
        // Atomically activate the product
        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: product._id,
            isLive: false // Ensure it's still not active
          },
          {
            isLive: true,
            isLocked: false,
            lockedBy: null,
            lockExpiresAt: null
          },
          { new: true }
        );

        if (updatedProduct) {
          // Broadcast activation to all clients
          io.emit('product_activated', {
  productId: updatedProduct._id,
  activatedAt: now,
  product: updatedProduct  // 👈 include full product data
});
          
          console.log(`Product activated: ${product.name}`);
        }
      } catch (err) {
        console.error(`Error activating product ${product._id}:`, err);
      }
    }
  } catch (err) {
    console.error('Error in product activation service:', err);
  }
}

function startActivationScheduler(io) {
  // Run every 15 seconds
  setInterval(() => activateProducts(io), 3000);
  
  // Run immediately on startup
  activateProducts(io);
  
  console.log('Product activation scheduler started');
}

module.exports = { startActivationScheduler };
