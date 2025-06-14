import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Components
import LandingPage from './pages/LandingPage';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import StudentSignup from './pages/StudentSignup';
import ForgotPassword from './pages/ForgotPassword';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Toast from './components/Toast';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/student/signup" element={<StudentSignup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route 
        path="/student/dashboard" 
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
            <Toast />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;