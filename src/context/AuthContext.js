// src/context/AuthContext.js
// 웹앱 전체에서 로그인 상태 관리

import React, { createContext, useEffect, useState, useContext } from 'react';
import { getAuthToken, clearAuthToken } from '../api/http/tokenStorage';
import { http } from '../api/http';
import { logout as apiLogout } from '../api/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // 앱 시작 시 저장된 토큰으로 인증 상태 확인
    useEffect(() => {
        async function checkSession() {
            try {
                const token = await getAuthToken();
                if (!token) {
                    setIsAuthenticated(false);
                    return;
                }
                // 토큰이 유효한지 서버에 확인
                await http.get('/mypage/info');
                setIsAuthenticated(true);
            } catch (_error) {
                await clearAuthToken();
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }

        checkSession();
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
        <AuthContext.Provider
            value={{ isAuthenticated, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
