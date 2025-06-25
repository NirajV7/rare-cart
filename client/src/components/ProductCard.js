import React from 'react';
import { useState } from "react";
import CountdownTimer from './CountdownTimer'; 
import LockConfirmation from './LockConfirmation';
import { lockProduct } from '../services/api'; 

import { toast } from 'react-toastify';


const ProductCard = ({ product, isLiveTab, socket }) => {
 

  const [showLockModal, setShowLockModal] = useState({ show: false, timeLeft: 0 });

  const [lockStatus, setLockStatus] = useState(null); // 'locking', 'locked', 'error'

  const handleBuyClick = async () => {
    if (!socket || !socket.id) {
      console.error('Socket not connected');
      return;
    }
    
    try {
      setLockStatus('locking');
      // Attempt to lock the product
     // ✅ Capture response from lockProduct
      const response = await lockProduct(product._id, socket.id);
      const { lockTimeInSeconds } = response.data;

      const timeLeft = lockTimeInSeconds || 60;

      // Pass lock timer to modal
      setShowLockModal({ show: true, timeLeft });
      setLockStatus('locked');
      
    }catch (error) {
    setLockStatus('error');

    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      toast.warn("Please login to continue.");
    } else {
      toast.error("Something went wrong: " + message);
    }

    console.error('Lock failed:', message);
  }
};

  // Get status for badge
  const getStatus = () => {
    if (product.isSold) return 'sold';
    if (product.isLocked) return 'locked';
    if (product.isLive) return 'live';
    return 'upcoming';
  };

  const status = getStatus();
  
  // Status badge colors
  const statusColors = {
    upcoming: 'bg-gray-100 text-gray-800',
    live: 'bg-green-100 text-green-800',
    locked: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative">
        {product.imageUrl ? (
  <img 
    src={product.imageUrl} 
    alt={product.name} 
    className="w-full h-48 object-cover rounded-t-2xl"
  />
) : (
  <div className="w-full h-48 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 rounded-t-2xl relative overflow-hidden">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-12 w-12 mb-2 text-gray-400" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h2a2 2 0 012 2v11h10V9a2 2 0 012-2h2M3 7V5a2 2 0 012-2h14a2 2 0 012 2v2m-6 10l-2-2-2 2m0 0l-2-2-2 2" />
    </svg>
    <span className="text-sm font-medium text-gray-500">No Image Available</span>
  </div>
)}

        
        {/* Status Badge */}
        <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 uppercase">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
  {product.description || <span className="opacity-0">No description</span>}
</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-green-700 bg-green-100 px-2 py-1 rounded-md text-lg font-semibold">
  ${product.price.toFixed(2)}
</span>
         <span
  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full shadow-sm tracking-wide uppercase ${
    product.category.toLowerCase() === 'general'
      ? 'bg-gray-100 text-gray-800'
      : 'bg-purple-100 text-purple-800'
  }`}
>
  {product.category}
</span>
        </div>
        
        {/* Action Button */}
        {isLiveTab && !product.isSold && (
          <button onClick={handleBuyClick}
          disabled={lockStatus === 'locking' || product.isLocked}
          className={`w-full py-2 px-4 rounded-md font-medium text-white ${
            lockStatus === 'locking' || product.isLocked 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {product.isLocked 
            ? (lockStatus === 'locked' ? 'You have locked!' : 'Locked by another user')
            : lockStatus === 'locking' 
              ? 'Locking...' 
              : 'Buy Now'}
          </button>
        )}

        {/* Lock Confirmation Modal */}
      {showLockModal.show && socket && (
        <LockConfirmation 
          product={product} 
          socket={socket} 
          timeLeft={showLockModal.timeLeft}
          onClose={() => setShowLockModal({ show: false, timeLeft: 0 })}
        />
      )}

        {/* COUNTDOWN TIMER FOR UPCOMING PRODUCTS */}
      {!isLiveTab && (
        <div className="mt-4">
          <CountdownTimer dropTime={new Date(product.dropTime)} />
        </div>
      )}

      </div>
    </div>
  );
};

export default ProductCard;
