import React from 'react';
import Icon from '../../../components/AppIcon';

const SaveStatus = ({ status, lastSaved, className = "" }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'saving':
        return {
          icon: 'Loader2',
          text: 'Saving...',
          color: 'text-warning',
          animate: 'animate-spin'
        };
      case 'saved':
        return {
          icon: 'Check',
          text: 'Saved',
          color: 'text-success',
          animate: ''
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          text: 'Save failed',
          color: 'text-error',
          animate: ''
        };
      case 'unsaved':
        return {
          icon: 'Circle',
          text: 'Unsaved changes',
          color: 'text-warning',
          animate: ''
        };
      default:
        return {
          icon: 'Circle',
          text: 'Ready',
          color: 'text-muted-foreground',
          animate: ''
        };
    }
  };

  const config = getStatusConfig();

  const formatLastSaved = (timestamp) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const saved = new Date(timestamp);
    const diffInMinutes = Math.floor((now - saved) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return saved?.toLocaleDateString();
  };

  return (
    <div className={`flex items-center space-x-2 text-sm ${className}`}>
      <Icon 
        name={config?.icon} 
        size={14} 
        className={`${config?.color} ${config?.animate}`} 
      />
      <span className={config?.color}>
        {config?.text}
      </span>
      {lastSaved && status === 'saved' && (
        <span className="text-muted-foreground">
          • {formatLastSaved(lastSaved)}
        </span>
      )}
    </div>
  );
};

export default SaveStatus;