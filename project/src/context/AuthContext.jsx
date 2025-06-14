import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password, role) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, validate against backend
    if (email && password) {
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        name: role === 'admin' ? 'Admin User' : 'Student User',
        email,
        role,
        studentId: role === 'student' ? 'STU' + Math.random().toString(36).substr(2, 6).toUpperCase() : undefined
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (name, email, password, studentId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password) {
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: 'student',
        studentId: studentId || 'STU' + Math.random().toString(36).substr(2, 6).toUpperCase()
      });
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};