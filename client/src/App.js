import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import AdminDashboard from './components/admin/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import  LoginForm  from './components/auth/LoginForm';
import SignupForm  from "./components/auth/SignupForm";
import ProtectedRoute from "./components/ProtectedRoute";
import  UserProfile  from "./components/UserProfile";
import  Header  from "./components/Header";
import ResetPasswordForm from './components/auth/ResetPasswordForm';
import HomeLanding from './pages/HomeLanding'; // add this
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Inside Routes
<Route path="/" element={<HomeLanding />} />

function App() {
  return (
    
    <Router>
    <AuthProvider>
    <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen bg-gray-50">
      <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
          <Route path="/" element={<HomeLanding />} />
            <Route path="/live" element={<ProductCatalog />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
             <Route path="/signup" element={<SignupForm />} />
            {/* Protected routes */}
  <Route path="/admin/*" element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  } />
  
  <Route path="/profile" element={
    <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  } />
             
          </Routes>
        </main>
      </div>
      </AuthProvider>
    </Router>
    
  );
}

export default App;
