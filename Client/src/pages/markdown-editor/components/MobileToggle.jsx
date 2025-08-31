import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileToggle = ({ activeView, onViewChange, className = "" }) => {
  const views = [
    {
      id: 'edit',
      label: 'Edit',
      icon: 'Edit3'
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: 'Eye'
    }
  ];

  return (
    <div className={`flex bg-surface border border-border rounded-lg p-1 ${className}`}>
      {views?.map((view) => (
        <Button
          key={view?.id}
          variant={activeView === view?.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewChange(view?.id)}
          className="flex-1"
        >
          <Icon name={view?.icon} size={16} className="mr-2" />
          {view?.label}
        </Button>
      ))}
    </div>
  );
};

export default MobileToggle;