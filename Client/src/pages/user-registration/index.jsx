import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/ui/AuthLayout';
import RegistrationForm from './components/RegistrationForm';
import SecurityBadge from './components/SecurityBadge';
import Icon from '../../components/AppIcon';

const UserRegistration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AuthLayout
        title="Create your account"
        subtitle="Start taking beautiful markdown notes today"
        footerText="Already have an account?"
        footerLinkText="Sign in here"
        footerLinkTo="/user-login"
      >
        {/* Registration Form */}
        <RegistrationForm />

        {/* Additional Features Section */}
        <div className="mt-8 space-y-4">
          <div className="text-center">
            <h3 className="text-sm font-medium text-foreground mb-3">
              What you'll get with MarkNote
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="FileText" size={16} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Real-time Preview</p>
                  <p className="text-xs text-muted-foreground">See your markdown rendered instantly</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="Cloud" size={16} className="text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Cloud Sync</p>
                  <p className="text-xs text-muted-foreground">Access your notes from anywhere</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={16} className="text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Lightning Fast</p>
                  <p className="text-xs text-muted-foreground">Optimized for speed and performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <SecurityBadge />

        {/* Terms and Privacy */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <Link
              to="/terms"
              className="text-primary hover:text-accent underline transition-colors duration-200"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to="/privacy"
              className="text-primary hover:text-accent underline transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </AuthLayout>
    </div>
  );
};

export default UserRegistration;