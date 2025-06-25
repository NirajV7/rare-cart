// src/pages/HomeLanding.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomeLanding = () => {
    const { user } = useAuth();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
          Welcome to RareCart
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Buy rare limited-edition items before they're gone. Real-time locking, VIP access, and blazing speed.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/live"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded shadow transition transform hover:scale-105"
          >
            🔴 View Drops
          </Link>
          
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why RareCart?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow text-center hover:shadow-lg hover:bg-white transition duration-300 ease-in-out">
            <h3 className="font-bold text-xl mb-2">🔐 Lock to Buy</h3>
            <p className="text-gray-600">Reserve your product with our real-time lock system before purchasing.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow text-center hover:shadow-lg hover:bg-white transition duration-300 ease-in-out">
            <h3 className="font-bold text-xl mb-2">⚡ VIP Access</h3>
            <p className="text-gray-600">Buyers with 3+ purchases get 2x more time to complete their checkout.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow text-center hover:shadow-lg hover:bg-white transition duration-300 ease-in-out">
            <h3 className="font-bold text-xl mb-2">🚫 Abuser Protection</h3>
            <p className="text-gray-600">We automatically block users trying to exploit the system unfairly.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
  <section className="py-12 bg-gray-100 text-center">
    <h2 className="text-2xl font-bold mb-4">Ready to grab your first drop?</h2>
    <Link
      to="/signup"
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow transition transform hover:scale-105"
    >
      Create Your Account
    </Link>
  </section>
)}
    </div>
  );
};

export default HomeLanding;
