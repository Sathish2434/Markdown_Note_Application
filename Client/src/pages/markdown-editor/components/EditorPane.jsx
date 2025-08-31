import React, { useRef, useEffect } from 'react';
import EditorToolbar from './EditorToolbar';

const EditorPane = ({ 
  content, 
  onChange, 
  onFormat, 
  lineNumbers = true,
  className = "" 
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef?.current?.scrollHeight + 'px';
    }
  }, [content]);

  const handleKeyDown = (e) => {
    // Handle keyboard shortcuts
    if (e?.ctrlKey || e?.metaKey) {
      switch (e?.key) {
        case 'b':
          e?.preventDefault();
          onFormat('**', '**');
          break;
        case 'i':
          e?.preventDefault();
          onFormat('*', '*');
          break;
        case 'h':
          e?.preventDefault();
          onFormat('## ', '');
          break;
        case 'l':
          e?.preventDefault();
          if (e?.shiftKey) {
            onFormat('1. ', '');
          } else {
            onFormat('- ', '');
          }
          break;
        case 'k':
          e?.preventDefault();
          onFormat('[', '](url)');
          break;
        case '`':
          e?.preventDefault();
          if (e?.shiftKey) {
            onFormat('```\n', '\n```');
          } else {
            onFormat('`', '`');
          }
          break;
        default:
          break;
      }
    }

    // Handle tab for indentation
    if (e?.key === 'Tab') {
      e?.preventDefault();
      const start = e?.target?.selectionStart;
      const end = e?.target?.selectionEnd;
      const newValue = content?.substring(0, start) + '  ' + content?.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const getLineNumbers = () => {
    const lines = content?.split('\n');
    return lines?.map((_, index) => (
      <div key={index} className="text-right text-xs text-muted-foreground pr-2 select-none">
        {index + 1}
      </div>
    ));
  };

  return (
    <div className={`flex flex-col h-full bg-card border border-border rounded-lg ${className}`}>
      <EditorToolbar onFormat={onFormat} />
      <div className="flex flex-1 overflow-hidden">
        {lineNumbers && (
          <div className="flex flex-col bg-surface border-r border-border py-4 min-w-[3rem]">
            {getLineNumbers()}
          </div>
        )}
        
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e?.target?.value)}
            onKeyDown={handleKeyDown}
            placeholder="Start writing your markdown here...\n\n# Heading 1\n## Heading 2\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2\n\n[Link text](url)\n\n`inline code`\n\n```\ncode block\n```"
            className="w-full h-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed text-foreground placeholder-muted-foreground"
            style={{ minHeight: '100%' }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between p-2 bg-surface border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Lines: {content?.split('\n')?.length}</span>
          <span>Words: {content?.trim() ? content?.trim()?.split(/\s+/)?.length : 0}</span>
          <span>Characters: {content?.length}</span>
        </div>
        <div className="hidden sm:block">
          Markdown Editor
        </div>
      </div>
    </div>
  );
};

export default EditorPane;