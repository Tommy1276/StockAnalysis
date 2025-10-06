import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, User, LoginCredentials, SignupCredentials } from '@/services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check if user is already authenticated on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await apiService.getCurrentUser();
        if (response.user) {
          setUser(response.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // User is not authenticated, which is fine
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await apiService.login(credentials);
    if (response.success && response.user) {
      setUser(response.user);
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }
    } else {
      throw new Error(response.message || 'Login failed');
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    const response = await apiService.signup(credentials);
    if (response.success && response.user) {
      setUser(response.user);
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }
    } else {
      throw new Error(response.message || 'Signup failed');
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;