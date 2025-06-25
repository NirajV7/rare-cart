const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const sessionId = req.headers['session-id'] || req.body.sessionId;
    
    if (sessionId) {
      // Track user activity without blocking the request
      User.updateUserStats(sessionId, req.actionType)
        .catch(err => console.error('User tracking error:', err));
    }
    
    next();
  } catch (err) {
    console.error('User tracking middleware error:', err);
    next();
  }
};
