import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin/products', label: 'Products' },
    { path: '/admin/analytics', label: 'Analytics' },
    { path: '/admin/users', label: 'Users' },
  ];

  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between">
      <Link
  to="/admin"
  className="text-xl font-bold"
>
Admin Dashboard
</Link>

        
        <nav className="flex space-x-4">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === item.path 
                  ? 'bg-gray-900' 
                  : 'hover:bg-gray-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminNavbar;
