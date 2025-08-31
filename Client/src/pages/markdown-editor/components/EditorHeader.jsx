import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import SaveStatus from './SaveStatus';

const EditorHeader = ({ 
  title, 
  onTitleChange, 
  saveStatus, 
  lastSaved, 
  onSave, 
  onBack,
  isSaving = false 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Back Button */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex-shrink-0"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>

        {/* Center Section - Title Input */}
        <div className="flex-1 max-w-md mx-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e?.target?.value)}
            placeholder="Untitled Note"
            className="text-center font-medium"
          />
        </div>

        {/* Right Section - Save Status and Actions */}
        <div className="flex items-center space-x-3">
          <SaveStatus 
            status={saveStatus} 
            lastSaved={lastSaved}
            className="hidden sm:flex"
          />
          
          <Button
            variant="default"
            size="sm"
            onClick={onSave}
            loading={isSaving}
            disabled={isSaving}
            className="flex-shrink-0"
          >
            <Icon name="Save" size={16} className="mr-2" />
            Save
          </Button>
        </div>
      </div>
      {/* Mobile Save Status */}
      <div className="sm:hidden mt-2 flex justify-center">
        <SaveStatus status={saveStatus} lastSaved={lastSaved} />
      </div>
    </header>
  );
};

export default EditorHeader;