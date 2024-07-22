import React, { createContext, useContext, useState } from 'react';
import { login as loginApi, register as registerApi, logout as logoutApi } from '../service/AuthenticationApiService';

interface AuthContextType {
    token: string | null;
    role: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userName: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

    const login = async (email: string, password: string) => {
        const { token, role } = await loginApi({ email, password });
        setToken(token);
        setRole(role);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
    };

    const register = async (fullName: string, email: string, password: string) => {
        const { token, role } = await registerApi({ fullName, email, password });
        setToken(token);
        setRole(role);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
    };

    const logout = async () => {
        if (token) {
            await logoutApi(token); // appel API pour invalider le token côté serveur
        }
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ role, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
