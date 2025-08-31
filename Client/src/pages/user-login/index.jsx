import React from 'react';

import AuthLayout from '../../components/ui/AuthLayout';
import LoginForm from './components/LoginForm';
import SecurityIndicator from './components/SecurityIndicator';

const UserLogin = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <AuthLayout
        title="Welcome Back"
        subtitle="Sign in to your MarkNote account"
        footerText="Don't have an account?"
        footerLinkText="Create one here"
        footerLinkTo="/user-registration"
      >
        <div className="space-y-6">
          <LoginForm />
          <SecurityIndicator />
        </div>
      </AuthLayout>
    </div>
  );
};

export default UserLogin;