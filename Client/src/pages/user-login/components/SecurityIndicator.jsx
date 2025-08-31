import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicator = () => {
  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
      <div className="flex items-center space-x-2">
        <Icon name="Shield" size={16} className="text-green-600" />
        <span className="text-sm font-medium text-green-800">Secure Login</span>
      </div>
      <p className="mt-1 text-xs text-green-600">
        Your credentials are encrypted and protected with industry-standard security measures.
      </p>
    </div>
  );
};

export default SecurityIndicator;