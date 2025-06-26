import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const avatarLetter = user?.username?.charAt(0).toUpperCase() || '?';


  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current); // cancel hiding
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    // hide after 200ms only if user doesn’t come back in
    timeoutRef.current = setTimeout(() => {
      setDropdownVisible(false);
    }, 200);
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          RareCart
        </Link>

        {isAuthenticated ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Avatar */}
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg"
            >
              {avatarLetter}
            </button>

            {/* Dropdown */}
            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 transition-all duration-200">
                <div className="px-4 py-2 text-sm bg-blue-50 text-blue-800 font-semibold border-b">
                    👋 Welcome, <span>{user?.username || 'Guest'}</span>

                    </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
  My Orders
</Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >

                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
