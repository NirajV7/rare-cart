import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PurchaseHistoryList from './PurchaseHistoryList';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [message, setMessage] = useState('');
const [error, setError] = useState('');
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
    
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (newPassword !== confirmPassword) {
          setError('New passwords do not match');
          return;
        }

        try {
          await fetch('http://localhost:5000/api/auth/change-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ currentPassword, newPassword })
          });

          setMessage('Password changed successfully');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } catch (err) {
          setError('Failed to update password');
        }
      }}
    >
      <div className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Password
        </button>
      </div>
    </form>

    {message && <p className="text-green-600 mt-4">{message}</p>}
    {error && <p className="text-red-600 mt-4">{error}</p>}
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;