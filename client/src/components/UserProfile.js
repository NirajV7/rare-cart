import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PurchaseHistoryList from './PurchaseHistoryList';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
// Show spinner while user is undefined (e.g. loading from localStorage)
  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-50 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div className="ml-4">
                <h2 className="text-xl font-bold">{user?.username}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('purchases')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'purchases'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Purchase History
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'settings'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Account Settings
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </nav>
          </div>
          
          <div className="md:w-2/3 p-6">
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                {/* Profile form would go here */}
              </div>
            )}
            
            {activeTab === 'purchases' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Purchase History</h3>
                <PurchaseHistoryList purchases={user?.purchaseHistory || []} />
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Account Settings</h3>
                {/* Account settings form would go here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;