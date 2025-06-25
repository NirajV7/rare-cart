import React, { useState, useEffect } from 'react';
import { confirmPurchase } from '../services/api';


const LockConfirmation = ({ product, socket, onClose , timeLeft: initialTimeLeft }) => {

  //const [timeLeft, setTimeLeft] = useState(initialTimeLeft || 60);
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft ?? 60);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState(null);

  const isVIP = initialTimeLeft >= 120;
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
      <div className={`rounded-xl shadow-xl max-w-md w-full p-6 transition-all duration-300 
        ${isVIP ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-white'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Confirm Purchase
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">
            ✕
          </button>
        </div>

        {isVIP && (
          <div className="mb-4 text-center">
            <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold shadow">
              ⭐ VIP Access – Extended Time
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <p className="mb-3">
            You've locked <span className="font-bold">{product.name}</span>
          </p>

          <div className={`text-5xl font-extrabold mb-3 tracking-widest ${
            isVIP ? 'text-yellow-600 animate-pulse' : 'text-gray-800'
          }`}>
            {timeLeft}s
          </div>

          <p className="text-gray-600 mb-6 text-sm">
            Confirm your purchase before the timer expires.
          </p>

          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            className={`py-3 px-8 rounded-lg font-bold text-white shadow transition ${
              isConfirming
                ? 'bg-gray-400 cursor-not-allowed'
                : isVIP
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isConfirming ? 'Processing...' : 'Confirm Purchase'}
          </button>

          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LockConfirmation;
