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
    <div>
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'upcoming' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Drops
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'live' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('live')}
        >
          Live Now
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product._id} 
            product={product} 
            isLiveTab={activeTab === 'live'}
            socket={socket}
          />

        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
