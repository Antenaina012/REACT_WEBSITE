import React, { createContext, useState, useCallback } from 'react';
import { login, signup } from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = useCallback(async (email, password, paymentInfo) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await login(email, password);
      // attach payment info locally (not stored on server)
      if (paymentInfo) {
        userData.payment = paymentInfo;
      }
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (err) {
      setError(err.message || 'Erreur lors de la connexion');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSignup = useCallback(async (nom, email, password) => {
    setLoading(true);
    setError(null);
    try {
      await signup(nom, email, password);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'inscription');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    signup: handleSignup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
