import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import SearchBar from './SearchBar';

const DashboardHeader = ({ 
  notesCount, 
  onSearch, 
  onRefresh, 
  isRefreshing,
  searchTerm 
}) => {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate('/markdown-editor');
  };

  return (
    <div className="bg-background border-b border-border sticky top-16 z-40 backdrop-blur-sm">
      <div className="px-4 lg:px-6 py-4">
        {/* Top Row - Title and Create Button */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              My Notes
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {notesCount === 0 
                ? 'No notes yet' 
                : `${notesCount} ${notesCount === 1 ? 'note' : 'notes'}`
              }
              {searchTerm && ` • Searching for "${searchTerm}"`}
            </p>
          </div>
          
          {/* Desktop Create Button */}
          <div className="hidden sm:block">
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={handleCreateNote}
            >
              Create Note
            </Button>
          </div>
        </div>

        {/* Bottom Row - Search and Actions */}
        <div className="flex items-center justify-between space-x-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <SearchBar 
              onSearch={onSearch}
              placeholder="Search notes by title or content..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Refresh Button */}
            <Button
              variant="ghost"
              size="icon"
              iconName="RefreshCw"
              iconSize={16}
              onClick={onRefresh}
              loading={isRefreshing}
              className="text-muted-foreground hover:text-foreground"
            />

            {/* View Options - Future enhancement */}
            <Button
              variant="ghost"
              size="icon"
              iconName="Grid3X3"
              iconSize={16}
              className="text-muted-foreground hover:text-foreground hidden md:flex"
            />
          </div>
        </div>
      </div>

      {/* Mobile Create Button - Floating */}
      <Button
        variant="default"
        size="icon"
        iconName="Plus"
        iconSize={20}
        onClick={handleCreateNote}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-elevated sm:hidden"
      />
    </div>
  );
};

export default DashboardHeader;