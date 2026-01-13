// src/context/AuthContext.js
// 웹앱 전체에서 로그인 상태 관리

import React, { createContext, useEffect, useState, useContext } from 'react';
import { getAuthToken, clearAuthToken } from '../api/http/tokenStorage';
import { logout as apiLogout } from '../api/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 앱 시작 시 토큰 존재 여부 확인
  useEffect(() => {
    async function checkToken() {
      const token = await getAuthToken();
      setIsAuthenticated(!!token);
      setLoading(false);
    }
    checkToken();
  }, []);

  const login = () => setIsAuthenticated(true);

  const logout = async () => {
    try {
      await apiLogout();
    } catch (e) {
      console.warn('Logout error (ignored):', e);
    } finally {
      await clearAuthToken();
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}