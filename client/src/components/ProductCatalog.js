import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; 
import { getUpcomingProducts, getLiveProducts } from '../services/api';
import { initSocket, disconnectSocket } from '../services/socket'; 

const ProductCatalog = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [products, setProducts] = useState([]);
  const [socket, setSocket] = useState(null);

  // ADD SOCKET INITIALIZATION
  useEffect(() => {
    const socketInstance = initSocket();
    setSocket(socketInstance);
    
    return () => disconnectSocket();
  }, []);

  // ADD REAL-TIME UPDATES
  useEffect(() => {
    if (!socket) return;

    // Handle product activation (upcoming → live)
    socket.on('product_activated', (data) => {
      setProducts(prev => prev.map(p => 
        p._id === data.productId ? { ...p, isLive: true } : p
      ));
    });
    
    // NEW: Handle lock events
  socket.on('product_locked', (data) => {
    setProducts(prev => prev.map(p => 
      p._id === data.productId ? { ...p, isLocked: true, lockedBy: data.lockedBy } : p
    ));
  });

  // NEW: Handle unlock events
  socket.on('product_unlocked', (data) => {
    setProducts(prev => prev.map(p => 
      p._id === data.productId ? { ...p, isLocked: false, lockedBy: null } : p
    ));
  });

  // NEW: Handle sold events
  socket.on('product_sold', (data) => {
    setProducts(prev => prev.map(p => 
      p._id === data.productId ? { ...p, isSold: true, isLocked: false } : p
    ));
  });

    return () => {
      socket.off('product_activated');
      socket.off('product_locked');
      socket.off('product_unlocked');
      socket.off('product_sold');
    };
  }, [socket]);


  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = activeTab === 'upcoming' 
          ? await getUpcomingProducts() 
          : await getLiveProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    
    loadProducts();
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Tabs */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-6 py-2 rounded-full font-semibold transition duration-200 ${
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
          }`}
        >
          Upcoming Drops
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`px-6 py-2 rounded-full font-semibold transition duration-200 ${
            activeTab === 'live'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
          }`}
        >
          Live Now
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              isLiveTab={activeTab === 'live'}
              socket={socket}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg py-12">
            No {activeTab === 'upcoming' ? 'upcoming' : 'live'} drops available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};


export default ProductCatalog;
