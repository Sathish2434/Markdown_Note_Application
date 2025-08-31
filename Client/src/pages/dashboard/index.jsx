import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../components/ui/NavigationBridge';
import AppHeader from '../../components/ui/AppHeader';
import DashboardHeader from './components/DashboardHeader';
import StatsBar from './components/StatsBar';
import NotesGrid from './components/NotesGrid';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { notesAPI } from '../../services/api';



const Dashboard = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock notes data
  const mockNotes = [
    {
      id: '1',
      title: 'React Hooks Best Practices',
      content: `# React Hooks Best Practices

## useState Hook
Always use functional updates when the new state depends on the previous state:

\`\`\`javascript
const [count, setCount] = useState(0);
// Good
setCount(prevCount => prevCount + 1);
// Avoid
setCount(count + 1);
\`\`\`

## useEffect Hook
Remember to clean up side effects to prevent memory leaks:

\`\`\`javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
\`\`\`

## Custom Hooks
Extract reusable logic into custom hooks for better code organization and reusability.`,
      createdAt: '2025-08-25T10:30:00Z',
      updatedAt: '2025-08-30T14:20:00Z'
    },
    {
      id: '2',
      title: 'Markdown Syntax Guide',
      content: `# Markdown Syntax Guide

## Headers
Use # for headers. More # means smaller header.

## Emphasis
- **Bold text** with double asterisks
- *Italic text* with single asterisks
- ~~Strikethrough~~ with double tildes

## Lists
### Unordered Lists
- Item 1
- Item 2
  - Nested item
  - Another nested item

### Ordered Lists
1. First item
2. Second item
3. Third item

## Code
Inline code with \`backticks\`

Code blocks with triple backticks:
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Links and Images
[Link text](https://example.com)
![Alt text](image-url.jpg)

## Tables
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More data|
| Row 2    | Data     | More data|`,
      createdAt: '2025-08-20T09:15:00Z',
      updatedAt: '2025-08-29T16:45:00Z'
    },
    {
      id: '3',
      title: 'Project Ideas',
      content: `# Project Ideas

## Web Development
1. **Personal Portfolio Website**
   - Showcase skills and projects
   - Responsive design
   - Contact form integration

2. **Task Management App**
   - Create, edit, delete tasks
   - Priority levels
   - Due date reminders

3. **Weather Dashboard**
   - Current weather display
   - 5-day forecast
   - Location-based updates

## Mobile Development
1. **Expense Tracker**
   - Track daily expenses
   - Category-wise breakdown
   - Monthly reports

2. **Recipe App**
   - Browse recipes
   - Save favorites
   - Shopping list generator

## Learning Goals
- Master React hooks
- Learn TypeScript
- Explore GraphQL
- Practice testing with Jest`,
      createdAt: '2025-08-28T11:00:00Z',
      updatedAt: '2025-08-31T09:30:00Z'
    },
    {
      id: '4',
      title: 'Meeting Notes - August 31',
      content: `# Team Meeting - August 31, 2025

## Attendees
- John Doe (Project Manager)
- Jane Smith (Frontend Developer)
- Mike Johnson (Backend Developer)
- Sarah Wilson (UI/UX Designer)

## Agenda Items

### 1. Project Status Update
- Frontend development: 85% complete
- Backend API: 90% complete
- UI/UX design: 95% complete
- Testing: 60% complete

### 2. Upcoming Deadlines
- **September 5**: Feature freeze
- **September 10**: Beta testing begins
- **September 20**: Production deployment

### 3. Action Items
- [ ] Complete user authentication module (Mike)
- [ ] Implement responsive design fixes (Jane)
- [ ] Conduct usability testing (Sarah)
- [ ] Update project documentation (John)

### 4. Blockers
- Third-party API integration delays
- Need approval for additional server resources

## Next Meeting
**Date**: September 7, 2025
**Time**: 10:00 AM
**Location**: Conference Room B`,
      createdAt: '2025-08-31T09:45:00Z',
      updatedAt: '2025-08-31T09:45:00Z'
    },
    {
      id: '5',
      title: 'Quick Note',
      content: `Remember to:
- Buy groceries
- Call dentist
- Review pull requests
- Update resume`,
      createdAt: '2025-08-30T18:20:00Z',
      updatedAt: '2025-08-30T18:20:00Z'
    }
  ];

  // Load notes from API
  const loadNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const apiNotes = await notesAPI.getAllNotes();
      setNotes(apiNotes);
      setFilteredNotes(apiNotes);
    } catch (error) {
      console.error('Failed to load notes from API:', error);
      // Fallback to localStorage if API fails
      const savedNotes = localStorage.getItem('markdownNotes');
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
        setFilteredNotes(parsedNotes);
      } else {
        setNotes([]);
        setFilteredNotes([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search functionality
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    if (!term?.trim()) {
      setFilteredNotes(notes);
      return;
    }

    const filtered = notes?.filter(note => 
      note?.title?.toLowerCase()?.includes(term?.toLowerCase()) ||
      note?.content?.toLowerCase()?.includes(term?.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [notes]);

  // Delete note
  const handleDeleteNote = useCallback(async (noteId) => {
    try {
      await notesAPI.deleteNote(noteId);
      const updatedNotes = notes?.filter(note => note?.id !== noteId);
      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes?.filter(note => 
        !searchTerm?.trim() || 
        note?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        note?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      ));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  }, [notes, searchTerm]);

  // Duplicate note
  const handleDuplicateNote = useCallback((note) => {
    const duplicatedNote = {
      ...note,
      id: Date.now()?.toString(),
      title: `${note?.title} (Copy)`,
      createdAt: new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString()
    };

    const updatedNotes = [duplicatedNote, ...notes];
    setNotes(updatedNotes);
    setFilteredNotes([duplicatedNote, ...filteredNotes]);
    localStorage.setItem('markdownNotes', JSON.stringify(updatedNotes));
  }, [notes, filteredNotes]);

  // Refresh notes
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await loadNotes();
    } finally {
      setIsRefreshing(false);
    }
  }, [loadNotes]);

  // Load notes on component mount
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Update filtered notes when notes change
  useEffect(() => {
    handleSearch(searchTerm);
  }, [notes, searchTerm, handleSearch]);

  return (
    <div className="min-h-screen bg-background">
      {/* App Header */}
      <AppHeader 
        isAuthenticated={true}
        user={user}
        onLogout={logout}
      />
      {/* Main Content */}
      <div className="pt-16">
        {/* Dashboard Header */}
        <DashboardHeader
          notesCount={filteredNotes?.length}
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          searchTerm={searchTerm}
        />

        {/* Content Area */}
        <div className="px-4 lg:px-6 py-6">
          {/* Stats Bar */}
          <StatsBar notes={notes} />

          {/* Notes Grid or Empty State */}
          {filteredNotes?.length > 0 ? (
            <NotesGrid
              notes={filteredNotes}
              onDeleteNote={handleDeleteNote}
              onDuplicateNote={handleDuplicateNote}
              isLoading={isLoading}
            />
          ) : !isLoading ? (
            searchTerm ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No notes found
                </h3>
                <p className="text-muted-foreground mb-4">
                  No notes match your search for "{searchTerm}"
                </p>
                <Button
                  variant="outline"
                  onClick={() => handleSearch('')}
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <EmptyState />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;