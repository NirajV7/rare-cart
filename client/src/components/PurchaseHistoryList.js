// src/components/PurchaseHistoryList.js
import React from 'react';

const PurchaseHistoryList = ({ purchases = [] }) => {
  if (!Array.isArray(purchases) || purchases.length === 0) {
    return <p className="text-gray-500">You haven’t purchased anything yet.</p>;
  }

   return (
    <ul className="space-y-3">
      {[...purchases]
        .sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt))
        .map((purchase, index) => (
          <li
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg text-blue-700">
                  {purchase.productName || 'Unnamed Product'}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(purchase.purchasedAt).toLocaleString()}
                </div>
              </div>
              <div className="text-green-600 font-bold text-md">
                ₹{purchase.price?.toFixed(2) || '0.00'}
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default PurchaseHistoryList;
