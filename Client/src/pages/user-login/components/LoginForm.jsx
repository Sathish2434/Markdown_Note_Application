import React, { useState } from 'react';
import { useAuth } from '../../../components/ui/NavigationBridge';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const mockCredentials = {
    email: 'john.doe@example.com',
    password: 'password123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear login error when user modifies form
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check mock credentials
    if (formData?.email !== mockCredentials?.email || formData?.password !== mockCredentials?.password) {
      setLoginError('Invalid email or password. Please try again.');
      return;
    }

    try {
      const result = await login(formData);
      if (!result?.success) {
        setLoginError(result?.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoginError('Network error. Please check your connection and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Login Error Message */}
      {loginError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{loginError}</p>
        </div>
      )}
      {/* Mock Credentials Helper */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <p className="text-xs text-blue-600 font-medium mb-1">Demo Credentials:</p>
        <p className="text-xs text-blue-600">Email: {mockCredentials?.email}</p>
        <p className="text-xs text-blue-600">Password: {mockCredentials?.password}</p>
      </div>
      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      {/* Password Field */}
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        required
        disabled={isLoading}
      />
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;