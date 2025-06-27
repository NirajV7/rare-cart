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
      <h2 className="text-3xl font-bold mb-8 text-gray-800">🛍️ My Orders</h2>

      {purchases.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          You haven’t purchased anything yet.
        </p>
      ) : (
        <div className="space-y-6">
          {purchases.map((purchase, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition flex items-center p-4 space-x-4"
            >
              {/* Product image */}
              <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                {purchase.imageUrl ? (
                  <img
                    src={purchase.imageUrl}
                    alt={purchase.productName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{purchase.productName}</h3>

                <div className="mt-1 text-sm text-gray-500">
                  <span className="inline-block bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold mr-2">
                    Purchase Successful
                  </span>

                  {purchase.category && (
                    <span className="inline-block bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                      {purchase.category.toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Purchased on:{' '}
                    <span className="font-medium text-gray-800">
                      {new Date(purchase.purchasedAt).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </span>
                  </p>

                  <p className="text-lg font-bold text-green-600">
                    ₹{purchase.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
