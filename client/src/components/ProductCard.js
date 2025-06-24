import React from 'react';
import { useState } from "react";
import CountdownTimer from './CountdownTimer'; 
import LockConfirmation from './LockConfirmation';
import { lockProduct } from '../services/api'; 


const ProductCard = ({ product, isLiveTab, socket }) => {

  const [showLockModal, setShowLockModal] = useState(false);
  const [lockStatus, setLockStatus] = useState(null); // 'locking', 'locked', 'error'

  const handleBuyClick = async () => {
    if (!socket || !socket.id) {
      console.error('Socket not connected');
      return;
    }
    
    try {
      setLockStatus('locking');
      // Attempt to lock the product
      await lockProduct(product._id, socket.id);
      setLockStatus('locked');
      setShowLockModal(true);
    } catch (error) {
      setLockStatus('error');
      console.error('Lock failed:', error.response?.data?.message || error.message);
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
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/300'} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        
        {/* Status Badge */}
        <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
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
      {showLockModal && socket && (
        <LockConfirmation 
          product={product} 
          socket={socket} 
          onClose={() => setShowLockModal(false)} 
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
