import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const NoteCard = ({ note, onDelete, onDuplicate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    if (note?.id) {
      navigate(`/markdown-editor?id=${note.id}`); // ✅ pass id in URL
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setIsDeleting(true);
      try {
        await onDelete(note?.id);
      } catch (error) {
        console.error("Failed to delete note:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleDuplicate = () => {
    onDuplicate(note);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPreviewText = (content) => {
    if (!content) return "No content";
    const plainText = content
      .replace(/#{1,6}\s+/g, "") // headers
      .replace(/\*\*(.*?)\*\*/g, "$1") // bold
      .replace(/\*(.*?)\*/g, "$1") // italic
      .replace(/`(.*?)`/g, "$1") // inline code
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // links
      .replace(/\n/g, " ") // newlines
      .trim();

    return plainText.length > 120 ? plainText.substring(0, 120) + "..." : plainText;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-moderate transition-all duration-200 group relative">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground line-clamp-2 flex-1 mr-2">
          {note?.title || "Untitled Note"}
        </h3>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="icon"
            iconName="Edit"
            iconSize={16}
            onClick={handleEdit}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="Copy"
            iconSize={16}
            onClick={handleDuplicate}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="Trash2"
            iconSize={16}
            onClick={handleDelete}
            loading={isDeleting}
            className="h-8 w-8 text-muted-foreground hover:text-error"
          />
        </div>
      </div>

      {/* Content Preview */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {getPreviewText(note?.content)}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>Created {formatDate(note?.createdAt)}</span>
          </div>
          {note?.updatedAt && note?.updatedAt !== note?.createdAt && (
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>Updated {formatDate(note?.updatedAt)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="FileText" size={12} />
          <span>{note?.content ? Math.ceil(note.content.length / 1000) : 0}k chars</span>
        </div>
      </div>

      {/* Mobile Click Overlay */}
      <button
        onClick={handleEdit}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer md:hidden"
        aria-label={`Edit note: ${note?.title}`}
      />
    </div>
  );
};

export default NoteCard;
