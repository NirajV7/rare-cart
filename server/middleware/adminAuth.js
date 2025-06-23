const adminAuth = (req, res, next) => {
  const ADMIN_KEY = process.env.ADMIN_KEY;
  
  // Check if environment variable is set
  if (!ADMIN_KEY) {
    console.error('ADMIN_KEY environment variable not set');
    return res.status(500).json({ 
      message: 'Server configuration error' 
    });
  }
  
  // Get key from request headers
  const providedKey = req.headers['x-admin-key'];
  
  if (!providedKey) {
    return res.status(401).json({ 
      message: 'Admin key required' 
    });
  }
  
  if (providedKey === ADMIN_KEY) {
    return next(); // Authorized
  }
  
  res.status(403).json({ 
    message: 'Invalid admin key' 
  });
};

module.exports = adminAuth;
