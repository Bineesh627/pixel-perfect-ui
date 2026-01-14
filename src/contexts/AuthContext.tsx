import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo
const mockUser: User = {
  id: '1',
  username: 'demo_user',
  email: 'demo@example.com',
  isAdmin: false,
  createdAt: new Date(),
};

const mockAdmin: User = {
  id: '2',
  username: 'admin',
  email: 'admin@example.com',
  isAdmin: true,
  createdAt: new Date(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    if (email.includes('admin')) {
      setUser(mockAdmin);
    } else {
      setUser(mockUser);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({ ...mockUser, username, email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
