const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_...');
const Product = require('../models/Product');

router.post('/create-checkout-session', async (req, res) => {
  const product = await Product.findById(req.body.productId);
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: product.name },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/canceled`,
  });

  res.json({ id: session.id });
});

// Webhook handler (for local testing)
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      'your_webhook_signing_secret'
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Update your product status here
  }

  res.json({ received: true });
});

module.exports = router;