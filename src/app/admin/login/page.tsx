/**
 * Admin Login Page
 * 
 * Authentication page for administrators to access the feedback dashboard.
 * Features form validation, error handling, and responsive design.
 */

'use client';

import React, { useState } from 'react';
import { Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageContainer from '@/components/common/PageContainer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { cn } from '@/lib/utils';

interface LoginFormData {
  username: string;
  password: string;
}

/**
 * Admin login page component
 */
const AdminLogin: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  /**
   * Validates form data
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic
      if (formData.username === 'admin' && formData.password === 'password') {
        // Successful login - redirect to dashboard
        window.location.href = '/admin/dashboard';
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles input changes
   */
  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear general error
    if (error) {
      setError('');
    }
  };

  return (
    <PageContainer variant="gradient" className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary-600" />
            </div>
            
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-text-primary">
                Admin Login
              </CardTitle>
              <p className="text-text-secondary">
                Access the feedback management dashboard
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="username" 
                  className="text-sm font-medium text-text-primary"
                >
                  Username <span className="text-error-500">*</span>
                </label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter your username"
                  className={cn(
                    errors.username && 'border-error-500 focus:border-error-500'
                  )}
                  aria-describedby={errors.username ? 'username-error' : undefined}
                  disabled={isLoading}
                />
                {errors.username && (
                  <p id="username-error" className="text-sm text-error-600">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className="text-sm font-medium text-text-primary"
                >
                  Password <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className={cn(
                      'pr-10',
                      errors.password && 'border-error-500 focus:border-error-500'
                    )}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-text-tertiary" />
                    ) : (
                      <Eye className="h-4 w-4 text-text-tertiary" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-sm text-error-600">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" text="Signing in..." />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="bg-info-50 border border-info-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-info-800 mb-2">
                Demo Credentials
              </h4>
              <div className="text-sm text-info-700 space-y-1">
                <p><strong>Username:</strong> admin</p>
                <p><strong>Password:</strong> password</p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="text-center text-sm text-text-tertiary">
              <p>
                This is a secure area. All login attempts are logged and monitored.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AdminLogin;