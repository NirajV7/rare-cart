import React from 'react';

const ProductCard = ({ product, isLiveTab }) => {
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
          <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-white">
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
