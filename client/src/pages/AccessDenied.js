// src/pages/AccessDenied.js
import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Access Denied</h1>
      <p className="text-gray-700 mb-6">
        You do not have the necessary permissions to view this page.
      </p>
      <Link to="/" className="text-blue-600 hover:underline">
        ← Go back to homepage
      </Link>
    </div>
  );
};

export default AccessDenied;
