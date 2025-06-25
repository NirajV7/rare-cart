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
       <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center shadow-sm">
        <span className="font-semibold text-green-700">Dropped! Refresh to see</span>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm">
      <h4 className="text-sm font-semibold text-blue-700 mb-3 text-center uppercase tracking-wide">
        Drops In
      </h4>
      <div className="flex justify-center gap-3">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center text-blue-700 font-extrabold text-lg border border-blue-300 shadow">
              {value.toString().padStart(2, '0')}
            </div>
            <span className="text-xs text-blue-500 mt-1 capitalize">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
