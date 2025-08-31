import React, { useState } from 'react';
import { useAuth } from '../../../components/ui/NavigationBridge';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData?.name?.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await register(formData);
      if (!result?.success) {
        setErrors({ submit: result?.error });
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/\d/?.test(password)) strength++;
    if (/[^a-zA-Z\d]/?.test(password)) strength++;

    const levels = [
      { strength: 0, label: '', color: '' },
      { strength: 1, label: 'Very Weak', color: 'bg-red-500' },
      { strength: 2, label: 'Weak', color: 'bg-orange-500' },
      { strength: 3, label: 'Fair', color: 'bg-yellow-500' },
      { strength: 4, label: 'Good', color: 'bg-blue-500' },
      { strength: 5, label: 'Strong', color: 'bg-green-500' }
    ];

    return levels?.[strength];
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name Input */}
      <Input
        label="Full Name"
        type="text"
        name="name"
        value={formData?.name}
        onChange={handleInputChange}
        placeholder="Enter your full name"
        error={errors?.name}
        required
        disabled={isLoading}
      />
      {/* Email Input */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder="Enter your email address"
        error={errors?.email}
        description="We'll use this for account verification and login"
        required
        disabled={isLoading}
      />
      {/* Password Input */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="Create a strong password"
            error={errors?.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {/* Password Strength Indicator */}
        {formData?.password && (
          <div className="space-y-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5]?.map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                    level <= passwordStrength?.strength
                      ? passwordStrength?.color
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            {passwordStrength?.label && (
              <p className="text-xs text-muted-foreground">
                Password strength: <span className="font-medium">{passwordStrength?.label}</span>
              </p>
            )}
          </div>
        )}
      </div>
      {/* Confirm Password Input */}
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
          disabled={isLoading}
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
        </button>
      </div>
      {/* Submit Error */}
      {errors?.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-red-600" />
            <p className="text-sm text-red-700">{errors?.submit}</p>
          </div>
        </div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
      {/* Security Notice */}
      <div className="mt-4 p-3 bg-muted/50 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-primary mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Your data is secure</p>
            <p>We use industry-standard encryption to protect your account information and notes.</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;