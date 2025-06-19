const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000", // Your React app's origin
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'], // Explicitly allow both transports
    credentials: true
  }
});
const mongoose = require('mongoose');

// Enable CORS for regular HTTP requests too
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Basic Route 
app.get('/', (req, res) => res.send('Server alive!'));

//DB connection
mongoose.connect('mongodb://127.0.0.1:27017/rarecart')
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.error(err));

// Test Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

//Start Server
const PORT = 5000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));