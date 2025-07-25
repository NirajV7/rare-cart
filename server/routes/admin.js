const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const adminAuth = require('../middleware/adminAuth');

// GET user analytics
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().sort({ lastActivity: -1 });
    
    // Add VIP status (3+ purchases) and abuser flag (5+ locks, 0 purchases)
    const processedUsers = users.map(user => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  lockAttempts: user.lockAttempts || 0,
  purchases: user.purchases || 0,
  lastActivity: user.lastActivity,
  isVIP: (user.purchases || 0) >= 3,
  isPotentialAbuser: (user.lockAttempts || 0) >= 5 && (user.purchases || 0) === 0
}));
    
    // Calculate summary stats
    const totalUsers = users.length;
    const vipUsers = processedUsers.filter(u => u.isVIP).length;
    const potentialAbusers = processedUsers.filter(u => u.isPotentialAbuser).length;
    
    res.json({
      summary: {
        totalUsers,
        vipUsers,
        potentialAbusers
      },
      users: processedUsers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET sales analytics
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const { range = 'month' } = req.query;
    
    // Calculate date ranges
    const now = new Date();
    let startDate;
    
    switch (range) {
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'quarter':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'month':
      default:
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
    }
    
    // Get sold products in date range
    const soldProducts = await Product.find({
      isSold: true,
      soldAt: { $gte: startDate }
    });
    
    // Calculate metrics
    const totalRevenue = soldProducts.reduce((sum, product) => sum + product.price, 0);
    const productsSold = soldProducts.length;
    
    // Calculate conversion rate (simplified)
    const allProducts = await Product.countDocuments({
      dropTime: { $gte: startDate }
    });
    const conversionRate = allProducts > 0 
      ? Math.round((productsSold / allProducts) * 100) 
      : 0;
    
    // Generate monthly revenue data (simulated)
    const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
      const month = new Date(now);
      month.setMonth(now.getMonth() - (5 - i));
      return {
        month: month.toLocaleString('default', { month: 'short' }),
        revenue: Math.floor(Math.random() * 10000) + 5000
      };
    });
    
    // Generate top products data
    const topProducts = soldProducts
      .slice(0, 5)
      .map(product => ({
        productName: product.name,
        revenue: product.price
      }));
    
    // Generate daily sales trend
    const dailySales = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (29 - i));
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        sales: Math.floor(Math.random() * 20) + 5
      };
    });
    
    res.json({
      summary: {
        totalRevenue,
        productsSold,
        conversionRate
      },
      monthlyRevenue,
      topProducts,
      dailySales
    });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
