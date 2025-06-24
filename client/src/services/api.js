import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const getUpcomingProducts = () => axios.get(`${API_BASE}/products/upcoming`);
export const getLiveProducts = () => axios.get(`${API_BASE}/products/live`);
export const getProductDetails = (id) => axios.get(`${API_BASE}/products/${id}`);
export const lockProduct = (id, socketId) => 
  axios.post(`${API_BASE}/products/${id}/lock`, { socketId });
export const confirmPurchase = (id, socketId) => 
  axios.post(`${API_BASE}/products/${id}/confirm`, { socketId });
