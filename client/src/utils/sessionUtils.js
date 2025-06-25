export const getSessionId = () => {
  // Try to get existing session ID from localStorage
  let sessionId = localStorage.getItem('rareCartSessionId');
  
  // Generate new ID if none exists
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('rareCartSessionId', sessionId);
  }
  
  return sessionId;
};
