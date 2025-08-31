import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const NavigationBridge = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/markdown-editor'];
  
  // Public routes that redirect to dashboard if authenticated
  const publicRoutes = ['/user-login', '/user-registration'];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    handleRouteProtection();
  }, [location?.pathname, isAuthenticated, isLoading]);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        // Validate token (in real app, verify with backend)
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRouteProtection = () => {
    if (isLoading) return;

    const currentPath = location?.pathname;

    // Redirect to dashboard if authenticated user tries to access auth pages
    if (isAuthenticated && publicRoutes?.includes(currentPath)) {
      navigate('/dashboard', { replace: true });
      return;
    }

    // Redirect to login if unauthenticated user tries to access protected routes
    if (!isAuthenticated && protectedRoutes?.includes(currentPath)) {
      navigate('/user-login', { replace: true });
      return;
    }

    // Redirect to dashboard if authenticated user is on root path
    if (isAuthenticated && currentPath === '/') {
      navigate('/dashboard', { replace: true });
      return;
    }

    // Redirect to login if unauthenticated user is on root path
    if (!isAuthenticated && currentPath === '/') {
      navigate('/user-login', { replace: true });
      return;
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Simulate API call (replace with actual authentication)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser = {
        id: '1',
        name: credentials?.name || 'John Doe',
        email: credentials?.email
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store auth data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      // Navigate to dashboard
      navigate('/dashboard', { replace: true });
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call (replace with actual registration)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const newUser = {
        id: Date.now()?.toString(),
        name: userData?.name,
        email: userData?.email
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store auth data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      // Navigate to dashboard
      navigate('/dashboard', { replace: true });
      
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      // Clear auth data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      
      setUser(null);
      setIsAuthenticated(false);
      
      // Navigate to login
      navigate('/user-login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const refreshAuth = () => {
    checkAuthStatus();
  };

  const contextValue = {
    isAuthenticated,
    user,
    isLoading,
    login,
    register,
    logout,
    refreshAuth
  };

  // Show loading spinner during initial auth check
  if (isLoading && location?.pathname !== '/user-login' && location?.pathname !== '/user-registration') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default NavigationBridge;