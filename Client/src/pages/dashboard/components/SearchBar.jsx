import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, placeholder = "Search notes..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon 
            name="Search" 
            size={16} 
            className={`transition-colors duration-200 ${
              isFocused ? 'text-primary' : 'text-muted-foreground'
            }`} 
          />
        </div>
        
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-10"
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Clear search"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {/* Search suggestions or recent searches could go here */}
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-elevated z-10 animate-slide-down">
          <div className="p-2">
            <div className="flex items-center space-x-2 px-2 py-1 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>Searching in {searchTerm?.length > 0 ? 'titles and content' : 'all notes'}...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;