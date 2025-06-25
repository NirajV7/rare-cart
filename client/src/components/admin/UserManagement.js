import React, { useState, useEffect } from 'react';
import { getAdminUsers } from '../../services/api';

const UserManagement = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getAdminUsers();
        setUserData(response.data);
      } catch (err) {
        setError('Failed to load user data: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{userData.summary.totalUsers}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">VIP Users</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-600">
            {userData.summary.vipUsers}
          </p>
          <p className="text-sm text-gray-500 mt-1">(3+ purchases)</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">Potential Abusers</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">
            {userData.summary.potentialAbusers}
          </p>
          <p className="text-sm text-gray-500 mt-1">(5+ locks, 0 purchases)</p>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lock Attempts
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purchases
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  {userData.users.map(user => {
    const lockAttempts = user.lockAttempts ?? 0;
    const purchases = user.purchases ?? 0;
    const displayName = user.email || user.username || (user._id?.slice(0, 8) + '...');

    const lastActivity = user.lastActivity 
      ? new Date(user.lastActivity).toLocaleDateString()
      : 'N/A';

    return (
      <tr key={user._id} className={user.isPotentialAbuser ? "bg-red-50" : ""}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
  {displayName}
</td>

        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
          lockAttempts >= 5 ? "font-bold text-red-600" : "text-gray-500"
        }`}>
          {lockAttempts}
        </td>

        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
          purchases >= 3 ? "font-bold text-yellow-600" : "text-gray-500"
        }`}>
          {purchases}
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {lastActivity}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          {user.isVIP && (
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
              VIP Buyer
            </span>
          )}
          {user.isPotentialAbuser && (
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
              Potential Abuser
            </span>
          )}
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>

      {/* Key Insights */}
      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-bold text-blue-800 mb-2">Key Insights</h3>
        <ul className="list-disc pl-5 text-blue-700">
          <li>
            VIP Buyers (3+ purchases): {userData.summary.vipUsers} users
          </li>
          <li>
  Conversion Rate: {userData?.summary?.totalUsers ? (
    Math.round(
      (userData.users.reduce((sum, u) => sum + u.purchases, 0) /
       (userData.users.reduce((sum, u) => sum + u.lockAttempts, 0) || 1)) * 100
    )
  ) : 0}%
</li>
          <li>
            Potential Abusers: {userData.summary.potentialAbusers} users need investigation
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
