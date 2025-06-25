// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">RareCart</Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700">Hi, {user.username}</span>
              <Link
                to="/profile"
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-200"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-red-600 hover:underline text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline text-sm">Login</Link>
              <Link to="/signup" className="text-blue-600 hover:underline text-sm">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
