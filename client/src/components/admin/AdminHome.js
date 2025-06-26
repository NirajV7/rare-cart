// src/components/admin/AdminHome.js
import React from 'react';

const AdminHome = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 text-gray-700 space-y-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800">Welcome to the Admin Dashboard</h2>
      <p className="text-gray-600 max-w-xl">
        Manage products, track sales, and monitor user activity. Use the navigation above or choose a quick action below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 w-full max-w-4xl">
        <a
          href="/admin/products"
          className="bg-white border rounded-xl shadow-md hover:shadow-lg transition p-6 text-blue-700 hover:text-blue-900 text-center"
        >
          <div className="text-4xl mb-2">📦</div>
          <div className="font-semibold">Manage Products</div>
        </a>

        <a
          href="/admin/analytics"
          className="bg-white border rounded-xl shadow-md hover:shadow-lg transition p-6 text-green-700 hover:text-green-900 text-center"
        >
          <div className="text-4xl mb-2">📈</div>
          <div className="font-semibold">View Analytics</div>
        </a>

        <a
          href="/admin/users"
          className="bg-white border rounded-xl shadow-md hover:shadow-lg transition p-6 text-red-700 hover:text-red-900 text-center"
        >
          <div className="text-4xl mb-2">👥</div>
          <div className="font-semibold">User Management</div>
        </a>
      </div>
    </div>
  );
};

export default AdminHome;
