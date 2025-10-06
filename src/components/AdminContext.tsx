"use client";

import { useState, createContext, useContext, useEffect } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  getAuthHeaders: () => HeadersInit;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('admin-token');
        console.log('Stored token check:', storedToken ? 'Token found' : 'No token found');
        
        if (storedToken) {
          // Verify token by calling a simple test endpoint instead of dashboard stats
          const response = await fetch('/api/admin/test-auth', {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });
          
          console.log('Token verification response:', response.status);
          
          if (response.ok) {
            setToken(storedToken);
            setIsAuthenticated(true);
            console.log('Authentication successful');
          } else {
            // Token is invalid, remove it
            console.log('Token invalid, removing');
            localStorage.removeItem('admin-token');
            setToken(null);
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('admin-token');
        setToken(null);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (data.success && data.token) {
        // Store JWT token in localStorage
        localStorage.setItem('admin-token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call logout API to invalidate token
      if (token) {
        await fetch('/api/admin/auth', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local state
      localStorage.removeItem('admin-token');
      setToken(null);
      setIsAuthenticated(false);
    }
  };

  const getAuthHeaders = (): HeadersInit => {
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  };

  return (
    <AdminContext.Provider value={{ 
      isAuthenticated, 
      token,
      login, 
      logout, 
      getAuthHeaders 
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}