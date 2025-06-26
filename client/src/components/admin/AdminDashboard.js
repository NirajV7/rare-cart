import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import ProductList from './ProductList';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import SalesAnalytics from './SalesAnalytics'; 
import UserManagement from './UserManagement';
import AdminHome from './AdminHome';
const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="max-w-7xl mx-auto p-4">
        <Routes>
        <Route index element={<AdminHome />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<CreateProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} /> 
          <Route path="analytics" element={<SalesAnalytics />} /> 
          <Route path="users" element={<UserManagement />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
