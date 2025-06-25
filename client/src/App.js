import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import AdminDashboard from './components/admin/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import  LoginForm  from './components/auth/LoginForm';
import SignupForm  from "./components/auth/SignupForm";
import ProtectedRoute from "./components/ProtectedRoute";
import  UserProfile  from "./components/UserProfile";

function App() {
  return (
    
    <Router>
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">RareCart</h1>
        </div>
      </header>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ProductCatalog />} />
            <Route path="/login" element={<LoginForm />} />
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
