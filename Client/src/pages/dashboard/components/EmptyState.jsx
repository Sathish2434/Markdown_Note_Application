import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = () => {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate('/markdown-editor');
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Illustration */}
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="FileText" size={48} className="text-muted-foreground" />
      </div>

      {/* Content */}
      <div className="max-w-md">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No notes yet
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Start your markdown journey by creating your first note. Write, preview, and organize your thoughts with our powerful editor.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            iconName="Plus"
            iconPosition="left"
            onClick={handleCreateNote}
            className="w-full sm:w-auto"
          >
            Create Your First Note
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>✨ Real-time markdown preview</p>
            <p>📱 Mobile-friendly interface</p>
            <p>🔒 Secure note storage</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-12 max-w-2xl">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Tips:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon name="Hash" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Use # for headers</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Bold" size={14} className="mt-0.5 flex-shrink-0" />
            <span>**bold** for emphasis</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Code" size={14} className="mt-0.5 flex-shrink-0" />
            <span>`code` for inline code</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="List" size={14} className="mt-0.5 flex-shrink-0" />
            <span>- for bullet lists</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;