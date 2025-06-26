import axios from 'axios';


const API_BASE = 'http://localhost:5000/api';

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-auth-token': token
    }
  };
};

// 🧾 Auth
export const loginUser = (credentials) => 
  axios.post(`${API_BASE}/auth/login`, credentials);

export const signupUser = (userData) => 
  axios.post(`${API_BASE}/auth/signup`, userData);

// 🛒 Products
export const getUpcomingProducts = () => axios.get(`${API_BASE}/products/upcoming`);
export const getLiveProducts = () => axios.get(`${API_BASE}/products/live`);
export const getProductDetails = (id) => axios.get(`${API_BASE}/products/${id}`);

// 🛡️ Lock & Confirm (now using JWT-based auth)
export const lockProduct = (id, socketId) => 
  axios.post(`${API_BASE}/products/${id}/lock`, { socketId }, getAuthHeader());

export const confirmPurchase = (id, socketId) => 
  axios.post(`${API_BASE}/products/${id}/confirm`, { socketId }, getAuthHeader());

// 🛠️ Admin (temporary auth via x-admin-key)
const adminHeader = {
  headers: {
    'x-admin-key': "your_secure_key_here"
  }
};
export const createProduct = (productData) => 
  axios.post(`${API_BASE}/products`, productData, adminHeader);

// services/api.js
export const fetchCurrentUser = async () => {
  const token = localStorage.getItem('token');
  return fetch('http://localhost:5000/api/auth/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  }).then(res => {
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  });
};


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

