/* ======================
   INITIAL SETUP
   ====================== */
require('dotenv').config(); // Load environment variables first
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);

/* ======================
   MIDDLEWARE
   ====================== */
app.use(express.json()); // Parse JSON request bodies

// CORS Headers - Allow React development server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/* ======================
   DATABASE CONNECTION
   ====================== */
mongoose.connect('mongodb://127.0.0.1:27017/rarecart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); // Exit if DB connection fails
});

// Add MongoDB error logging
mongoose.connection.on('error', err => {
  console.error('MongoDB runtime error:', err);
});

/* ======================
   ROUTES SETUP
   ====================== */
// Import route handlers
const productRoutes = require('./routes/products');

// Register routes
app.use('/api/products', productRoutes);

/* ======================
   HEALTH CHECK ENDPOINT
   ====================== */
app.get('/', (req, res) => {
  res.send('🚀 RareCart Server is Running');
});

/* ======================
   ERROR HANDLING
   ====================== */
// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('⚠️ Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

/* ======================
   SERVER STARTUP
   ====================== */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
  console.log(`=================================\n`);
})