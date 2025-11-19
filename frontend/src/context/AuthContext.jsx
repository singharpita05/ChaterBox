// AUTHENTICATION CONTEXT 

import { createContext, useContext, useEffect, useState } from 'react';
import api from '../config/axios';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (on app load)
  useEffect(() => {
    checkAuth();
  }, []);

  // Check authentication status
  const checkAuth = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Sign up new user
  const signup = async (username, email, password) => {
    try {
      setError(null);
      const { data } = await api.post('/auth/signup', {
        username,
        email,
        password,
      });
      setUser(data);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setError(null);
      const { data } = await api.post('/auth/login', {
        email,
        password,
      });
      setUser(data);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};