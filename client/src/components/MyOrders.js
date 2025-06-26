import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchCurrentUser } from '../services/api';

const MyOrders = () => {
  const { user, setUser } = useAuth();
  const purchases = user?.purchaseHistory || [];

  useEffect(() => {
    const fetchLatestUser = async () => {
      try {
        const data = await fetchCurrentUser();
        localStorage.setItem('user', JSON.stringify(data)); // Optional
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch latest orders:', err.message);
      }
    };

    fetchLatestUser();
  }, [setUser]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {purchases.length === 0 ? (
        <p className="text-gray-500">You haven’t purchased anything yet.</p>
      ) : (
        <div className="space-y-4">
          {purchases.map((purchase, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 flex items-center space-x-4"
            >
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {purchase.imageUrl ? (
                  <img
                    src={purchase.imageUrl}
                    alt={purchase.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">{purchase.name}</h4>
                <p className="text-gray-500 text-sm">Price: ${purchase.price.toFixed(2)}</p>
                <p className="text-gray-400 text-xs">
                  Purchased on:{' '}
                  {new Date(purchase.purchasedAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
