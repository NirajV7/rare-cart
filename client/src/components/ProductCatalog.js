import React, { useState, useEffect } from 'react';
import { getUpcomingProducts, getLiveProducts } from '../services/api';

const ProductCatalog = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [products, setProducts] = useState([]);

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
          <div key={product._id} className="bg-white rounded-xl shadow-md p-4">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
