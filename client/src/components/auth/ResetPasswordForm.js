import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ResetPasswordForm = () => {
  const navigate = useNavigate();  
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password has been reset successfully');
        setMessage('Password reset successful!');
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
  navigate('/login');
}, 2000);

      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded p-2"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full border rounded p-2"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
{/* Show password length warning */}
{newPassword && newPassword.length < 6 && (
  <p className="text-sm text-red-600 mt-1">Password must be at least 6 characters long.</p>
)}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Password
        </button>
      </form>
      {/* ✅ Success message + redirect info */}
{message && (
  <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
    {message} Redirecting to login...
  </div>
)}

{error && (
  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
    {error}
  </div>
)}
    </div>
  );
};

export default ResetPasswordForm;
