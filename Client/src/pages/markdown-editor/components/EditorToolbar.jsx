import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EditorToolbar = ({ onFormat, shortcuts = {} }) => {
  const toolbarItems = [
    {
      id: 'bold',
      icon: 'Bold',
      label: 'Bold',
      shortcut: 'Ctrl+B',
      action: () => onFormat('**', '**')
    },
    {
      id: 'italic',
      icon: 'Italic',
      label: 'Italic',
      shortcut: 'Ctrl+I',
      action: () => onFormat('*', '*')
    },
    {
      id: 'heading',
      icon: 'Heading',
      label: 'Heading',
      shortcut: 'Ctrl+H',
      action: () => onFormat('## ', '')
    },
    {
      id: 'list',
      icon: 'List',
      label: 'Bullet List',
      shortcut: 'Ctrl+L',
      action: () => onFormat('- ', '')
    },
    {
      id: 'numbered-list',
      icon: 'ListOrdered',
      label: 'Numbered List',
      shortcut: 'Ctrl+Shift+L',
      action: () => onFormat('1. ', '')
    },
    {
      id: 'link',
      icon: 'Link',
      label: 'Link',
      shortcut: 'Ctrl+K',
      action: () => onFormat('[', '](url)')
    },
    {
      id: 'code',
      icon: 'Code',
      label: 'Inline Code',
      shortcut: 'Ctrl+`',
      action: () => onFormat('`', '`')
    },
    {
      id: 'code-block',
      icon: 'FileCode',
      label: 'Code Block',
      shortcut: 'Ctrl+Shift+`',
      action: () => onFormat('```\n', '\n```')
    }
  ];

  return (
    <div className="flex items-center space-x-1 p-2 bg-surface border-b border-border overflow-x-auto">
      {toolbarItems?.map((item) => (
        <Button
          key={item?.id}
          variant="ghost"
          size="sm"
          onClick={item?.action}
          className="flex-shrink-0"
          title={`${item?.label} (${item?.shortcut})`}
        >
          <Icon name={item?.icon} size={16} />
        </Button>
      ))}
      <div className="flex-1" />
      <div className="hidden md:flex items-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Keyboard" size={14} />
        <span>Keyboard shortcuts available</span>
      </div>
    </div>
  );
};

export default EditorToolbar;