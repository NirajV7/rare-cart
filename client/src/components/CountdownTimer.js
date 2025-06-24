import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ dropTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [hasDropped, setHasDropped] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(dropTime) - new Date();
      
      if (difference <= 0) {
        setHasDropped(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // Set initial time
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [dropTime]);

  if (hasDropped) {
    return (
      <div className="bg-green-50 p-3 rounded-lg text-center">
        <span className="font-medium text-green-700">Dropped! Refresh to see</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Drops in:</h4>
      <div className="flex justify-center space-x-2">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="bg-white border rounded-md w-12 h-12 flex items-center justify-center shadow-sm">
              <span className="font-bold text-lg">{value.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
