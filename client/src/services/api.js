import axios from 'axios';
import { getSessionId } from '../utils/sessionUtils';

const API_BASE = 'http://localhost:5000/api';

export const loginUser = (credentials) => 
  axios.post(`${API_BASE}/auth/login`, credentials);

export const signupUser = (userData) => 
  axios.post(`${API_BASE}/auth/signup`, userData);
export const getUpcomingProducts = () => axios.get(`${API_BASE}/products/upcoming`);
export const getLiveProducts = () => axios.get(`${API_BASE}/products/live`);
export const getProductDetails = (id) => axios.get(`${API_BASE}/products/${id}`);
export const lockProduct = (id, socketId) => 
  axios.post(`${API_BASE}/products/${id}/lock`, { 
    socketId,
    sessionId: getSessionId() // Add session ID
  });

export const confirmPurchase = (id, socketId) => 
  axios.post(`${API_BASE}/products/${id}/confirm`, { 
    socketId,
    sessionId: getSessionId() // Add session ID
  });

export const createProduct = (productData) => 
  axios.post(`${API_BASE}/products`, productData, {
    headers: {
      'x-admin-key': "your_secure_key_here" // We'll handle auth properly later
    }
  });
// For admin product listing (we'll implement fully in next step)
export const getAdminProducts = () => 
  axios.get(`${API_BASE}/products/admin`, {
    headers: {
      'x-admin-key': "your_secure_key_here"
    }
  });

export const getSalesAnalytics = (timeRange = 'month') => 
  axios.get(`${API_BASE}/admin/analytics?range=${timeRange}`, {
    headers: {
      'x-admin-key': "your_secure_key_here"
    }
  });
export const getAdminUsers = () => 
  axios.get(`${API_BASE}/admin/users`, {
    headers: {
      'x-admin-key': "your_secure_key_here"
    }
  });

export const updateProduct = (id, productData) => 
  axios.patch(`${API_BASE}/products/${id}`, productData, {
    headers: {
      'x-admin-key': "your_secure_key_here"
    }
  });

export const deleteProduct = (id) => 
  axios.delete(`${API_BASE}/products/${id}`, {
    headers: {
      'x-admin-key': "your_secure_key_here"
    }
  });

