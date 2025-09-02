import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsBar = ({ notes }) => {
  const safeNotes = Array.isArray(notes) ? notes : [];
  const totalNotes = safeNotes.length;
  const totalCharacters = safeNotes.reduce((sum, note) => sum + (note?.content?.length || 0), 0);
  const totalWords = safeNotes.reduce((sum, note) => {
    const wordCount = note?.content ? note.content.split(/\s+/).filter(word => word.length > 0).length : 0;
    return sum + wordCount;
  }, 0);

  const recentNotes = safeNotes.filter(note => {
    const noteDate = new Date(note?.updatedAt || note?.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return noteDate >= weekAgo;
  }).length;

  const stats = [
    {
      icon: 'FileText',
      label: 'Total Notes',
      value: totalNotes,
      color: 'text-primary'
    },
    {
      icon: 'Type',
      label: 'Total Words',
      value: totalWords.toLocaleString(),
      color: 'text-success'
    },
    {
      icon: 'Hash',
      label: 'Characters',
      value: totalCharacters.toLocaleString(),
      color: 'text-warning'
    },
    {
      icon: 'Clock',
      label: 'Recent',
      value: recentNotes,
      color: 'text-accent'
    }
  ];

  if (totalNotes === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted mb-2`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <div className="text-lg font-semibold text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;