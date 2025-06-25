import React, { useState, useEffect } from 'react';
import { confirmPurchase } from '../services/api';


const LockConfirmation = ({ product, socket, onClose , timeLeft: initialTimeLeft }) => {

  //const [timeLeft, setTimeLeft] = useState(initialTimeLeft || 60);
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft ?? 60);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState(null);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      onClose();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onClose]);

  const handleConfirm = async () => {
    try {
      setIsConfirming(true);
      await confirmPurchase(product._id, socket.id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Confirmation failed');
      setIsConfirming(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Confirm Purchase</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="text-center mb-6">
          <p className="mb-4">You've locked <span className="font-bold">{product.name}</span></p>
          <div className="text-4xl font-bold mb-4">
            {timeLeft}s
          </div>
          <p className="text-gray-600 mb-6">
            Confirm your purchase before the timer expires
          </p>
          
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            className={`py-3 px-8 rounded-lg font-bold text-white ${
              isConfirming ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isConfirming ? 'Processing...' : 'Confirm Purchase'}
          </button>
          
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LockConfirmation;
