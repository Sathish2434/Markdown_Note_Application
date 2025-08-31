import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  footerText, 
  footerLinkText, 
  footerLinkTo,
  isLoading = false 
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="FileText" size={28} color="white" />
            </div>
            <span className="text-2xl font-semibold text-foreground">MarkNote</span>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-semibold text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-subtle sm:rounded-lg sm:px-10 border border-border">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-xs rounded-lg flex items-center justify-center z-10">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Processing...</span>
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="relative">
            {children}
          </div>

          {/* Footer */}
          {footerText && footerLinkText && footerLinkTo && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">or</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {footerText}{' '}
                  <Link
                    to={footerLinkTo}
                    className="font-medium text-primary hover:text-accent transition-colors duration-200"
                  >
                    {footerLinkText}
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Footer Info */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Secure markdown note-taking for focused productivity
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;