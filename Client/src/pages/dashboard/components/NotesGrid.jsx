import React from 'react';
import NoteCard from './NoteCard';

const NotesGrid = ({ notes, onDeleteNote, onDuplicateNote, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
            <div className="flex items-start justify-between mb-3">
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="flex space-x-1">
                <div className="h-8 w-8 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <div className="h-3 bg-muted rounded w-20"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
              </div>
              <div className="h-3 bg-muted rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!notes || notes?.length === 0) {
    return null; // EmptyState will be shown by parent component
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {notes?.map((note) => (
        <NoteCard
          key={note?.id}
          note={note}
          onDelete={onDeleteNote}
          onDuplicate={onDuplicateNote}
        />
      ))}
    </div>
  );
};

export default NotesGrid;