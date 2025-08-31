import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../components/ui/NavigationBridge';
import AppHeader from '../../components/ui/AppHeader';
import EditorHeader from './components/EditorHeader';
import EditorPane from './components/EditorPane';
import PreviewPane from './components/PreviewPane';
import MobileToggle from './components/MobileToggle';
import { notesAPI } from '../../services/api';

const MarkdownEditor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user, logout } = useAuth();
  
  // Editor state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saveStatus, setSaveStatus] = useState('ready');
  const [lastSaved, setLastSaved] = useState(null);
  const [mobileView, setMobileView] = useState('edit');
  const [noteId, setNoteId] = useState(null);
  
  // Auto-save functionality
  const autoSaveTimeoutRef = useRef(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock notes data for demonstration
  const mockNotes = [
    {
      id: '1',
      title: 'Getting Started with Markdown',
      content: `# Welcome to MarkNote!\n\nThis is your first markdown note. Here are some basics:\n\n## Formatting\n\n**Bold text** and *italic text*\n\n## Lists\n\n- Item 1\n- Item 2\n- Item 3\n\n## Code\n\n\`inline code\` and:\n\n\`\`\`javascript\nconst hello = "world";\nconsole.log(hello);\n\`\`\`\n\n## Links\n\n[Visit our website](https://example.com)\n\nHappy writing! 📝`,
      createdAt: new Date('2025-08-30T10:00:00Z'),
      updatedAt: new Date('2025-08-31T09:30:00Z')
    },
    {
      id: '2',
      title: 'Project Ideas',
      content: `# Project Ideas\n\n## Web Development\n\n- [ ] Personal portfolio website\n- [ ] Task management app\n- [ ] Weather dashboard\n- [x] Markdown editor (completed!)\n\n## Learning Goals\n\n1. Master React hooks\n2. Learn TypeScript\n3. Explore Next.js\n4. Build with Tailwind CSS\n\n> "The best way to learn is by doing." - Anonymous\n\n---\n\n**Next steps:** Start with the portfolio website project.`,
      createdAt: new Date('2025-08-29T14:20:00Z'),
      updatedAt: new Date('2025-08-31T08:45:00Z')
    }
  ];

  // Initialize note data
  useEffect(() => {
    const noteIdParam = searchParams?.get('id');
    
    if (noteIdParam) {
      // Load existing note from API
      const loadNote = async () => {
        try {
          const existingNote = await notesAPI.getNoteById(noteIdParam);
          if (existingNote) {
            setNoteId(noteIdParam);
            setTitle(existingNote?.title);
            setContent(existingNote?.content);
            setLastSaved(existingNote?.updatedAt);
            setSaveStatus('saved');
          } else {
            // Note not found, redirect to dashboard
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Failed to load note:', error);
          navigate('/dashboard');
        }
      };
      loadNote();
    } else {
      // Create new note
      setNoteId(null);
      setTitle('');
      setContent('');
      setLastSaved(null);
      setSaveStatus('ready');
    }
  }, [searchParams, navigate]);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      // Clear existing timeout
      if (autoSaveTimeoutRef?.current) {
        clearTimeout(autoSaveTimeoutRef?.current);
      }

      // Set new timeout for auto-save
      autoSaveTimeoutRef.current = setTimeout(() => {
        handleAutoSave();
      }, 3000); // Auto-save after 3 seconds of inactivity
    }

    return () => {
      if (autoSaveTimeoutRef?.current) {
        clearTimeout(autoSaveTimeoutRef?.current);
      }
    };
  }, [hasUnsavedChanges, title, content]);

  // Handle content changes
  const handleContentChange = useCallback((newContent) => {
    setContent(newContent);
    setHasUnsavedChanges(true);
    setSaveStatus('unsaved');
  }, []);

  const handleTitleChange = useCallback((newTitle) => {
    setTitle(newTitle);
    setHasUnsavedChanges(true);
    setSaveStatus('unsaved');
  }, []);

  // Auto-save function
  const handleAutoSave = async () => {
    if (!hasUnsavedChanges) return;

    setSaveStatus('saving');
    
    try {
      if (noteId) {
        // Update existing note
        await notesAPI.updateNote(noteId, title, content);
      } else {
        // Create new note
        const newNote = await notesAPI.saveNote(title, content);
        setNoteId(newNote.id);
        // Update URL without triggering navigation
        window.history?.replaceState(null, '', `/markdown-editor?id=${newNote.id}`);
      }
      
      setLastSaved(new Date());
      setSaveStatus('saved');
      setHasUnsavedChanges(false);
      
      console.log('Auto-saved note:', { title, content, noteId });
    } catch (error) {
      console.error('Auto-save failed:', error);
      setSaveStatus('error');
    }
  };

  // Manual save function
  const handleManualSave = async () => {
    setSaveStatus('saving');
    
    try {
      if (noteId) {
        // Update existing note
        await notesAPI.updateNote(noteId, title, content);
      } else {
        // Create new note
        const newNote = await notesAPI.saveNote(title, content);
        setNoteId(newNote.id);
        // Update URL without triggering navigation
        window.history?.replaceState(null, '', `/markdown-editor?id=${newNote.id}`);
      }
      
      const now = new Date();
      setLastSaved(now);
      setSaveStatus('saved');
      setHasUnsavedChanges(false);
      
      console.log('Manually saved note:', { title, content, noteId });
    } catch (error) {
      console.error('Manual save failed:', error);
      setSaveStatus('error');
    }
  };

  // Format text with markdown
  const handleFormat = useCallback((prefix, suffix = '') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const selectedText = content?.substring(start, end);
    
    const newContent = 
      content?.substring(0, start) + 
      prefix + selectedText + suffix + 
      content?.substring(end);
    
    setContent(newContent);
    setHasUnsavedChanges(true);
    setSaveStatus('unsaved');
    
    // Restore cursor position
    setTimeout(() => {
      textarea?.focus();
      const newCursorPos = start + prefix?.length + selectedText?.length;
      textarea?.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [content]);

  // Handle back navigation with unsaved changes warning
  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (!confirmLeave) return;
    }
    navigate('/dashboard');
  };

  // Prevent accidental page refresh with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e?.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={logout}
      />
      
      <div className="pt-16">
        <EditorHeader
          title={title}
          onTitleChange={handleTitleChange}
          saveStatus={saveStatus}
          lastSaved={lastSaved}
          onSave={handleManualSave}
          onBack={handleBack}
          isSaving={saveStatus === 'saving'}
        />

        {/* Mobile View Toggle */}
        <div className="lg:hidden p-4 bg-surface border-b border-border">
          <MobileToggle
            activeView={mobileView}
            onViewChange={setMobileView}
          />
        </div>

        {/* Editor Layout */}
        <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)]">
          {/* Desktop Split View */}
          <div className="hidden lg:flex h-full">
            <div className="w-1/2 p-4">
              <EditorPane
                content={content}
                onChange={handleContentChange}
                onFormat={handleFormat}
                lineNumbers={true}
              />
            </div>
            <div className="w-1/2 p-4 border-l border-border">
              <PreviewPane content={content} />
            </div>
          </div>

          {/* Mobile Single View */}
          <div className="lg:hidden h-full p-4">
            {mobileView === 'edit' ? (
              <EditorPane
                content={content}
                onChange={handleContentChange}
                onFormat={handleFormat}
                lineNumbers={false}
              />
            ) : (
              <PreviewPane content={content} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;