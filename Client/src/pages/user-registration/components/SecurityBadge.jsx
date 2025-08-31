import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadge = () => {
  const securityFeatures = [
    {
      icon: 'Lock',
      title: 'SSL Encrypted',
      description: 'End-to-end encryption'
    },
    {
      icon: 'Shield',
      title: 'Secure Storage',
      description: 'Protected data centers'
    },
    {
      icon: 'Eye',
      title: 'Privacy First',
      description: 'No data sharing'
    }
  ];

  return (
    <div className="mt-6 space-y-4">
      <div className="text-center">
        <h3 className="text-sm font-medium text-foreground mb-2">
          Trusted by thousands of users
        </h3>
        <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
          <Icon name="Users" size={14} />
          <span>10,000+ active users</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="text-center p-3 bg-muted/30 rounded-lg border border-border/50"
          >
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={feature?.icon} size={14} className="text-primary" />
              </div>
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center pt-2">
        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <Icon name="CheckCircle" size={14} className="text-green-600" />
          <span>GDPR Compliant</span>
          <span>•</span>
          <Icon name="CheckCircle" size={14} className="text-green-600" />
          <span>SOC 2 Certified</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadge;