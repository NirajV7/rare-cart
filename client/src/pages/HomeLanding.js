import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomeLanding = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white min-h-screen flex flex-col">
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

      {/* Why RareCart */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why RareCart?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '🔐 Lock to Buy',
              desc: 'Reserve your product with our real-time lock system before purchasing.'
            },
            {
              title: '⚡ VIP Access',
              desc: 'Buyers with 3+ purchases get 2x more time to complete their checkout.'
            },
            {
              title: '🚫 Abuser Protection',
              desc: 'We automatically block users trying to exploit the system unfairly.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 rounded-lg shadow text-center hover:shadow-lg hover:bg-white transition duration-300 ease-in-out"
            >
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-blue-800">How It Works</h2>
        <div className="space-y-10 max-w-3xl mx-auto">
          {[
            {
              step: '1',
              title: 'Browse Drops',
              desc: 'Explore rare, upcoming, or live product drops with real-time availability.'
            },
            {
              step: '2',
              title: 'Lock Instantly',
              desc: 'Click "Buy Now" to instantly lock the product — it’s yours for the timer duration.'
            },
            {
              step: '3',
              title: 'Confirm & Purchase',
              desc: 'Complete your purchase within the countdown. No rush if you’re a VIP!'
            }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-4 group">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold transition group-hover:scale-105">
                  {item.step}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg w-full transition group-hover:shadow-xl">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">What Users Are Saying</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              quote: 'RareCart makes grabbing limited drops feel like a game — and I love winning!',
              name: 'Aarav M.'
            },
            {
              quote: 'As a VIP, the extra time makes all the difference. Super smooth experience!',
              name: 'Shirin Fathima'
            },
            {
              quote: 'Clean UI, smart locking system. I haven’t missed a drop since.',
              name: 'Jatin K.'
            }
          ].map((t, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition"
            >
              <p className="text-gray-700 mb-3 italic">"{t.quote}"</p>
              <h4 className="font-semibold text-blue-600">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {user ? (
  <section className="py-12 bg-blue-50 text-center">
    <h2 className="text-2xl font-bold mb-4">Welcome back, {user.username} 👋</h2>
    <p className="text-gray-700 mb-4">Head over to live drops and claim your next rare item.</p>
    <Link
      to="/live"
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow transition transform hover:scale-105"
    >
      Go to Live Drops
    </Link>
  </section>
) : (
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center mt-12">
        <p className="text-sm">&copy; {new Date().getFullYear()} RareCart. All rights reserved.</p>
        <p className="text-sm mt-2">
          Built by <span className="font-bold text-blue-400">Niraj V</span>
        </p>
      </footer>
    </div>
  );
};

export default HomeLanding;
