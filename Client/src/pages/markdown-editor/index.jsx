import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../components/ui/NavigationBridge";
import AppHeader from "../../components/ui/AppHeader";
import EditorHeader from "./components/EditorHeader";
import EditorPane from "./components/EditorPane";
import PreviewPane from "./components/PreviewPane";
import MobileToggle from "./components/MobileToggle";
import { notesAPI } from "../../services/api";

const MarkdownEditor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user, logout } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saveStatus, setSaveStatus] = useState("ready");
  const [lastSaved, setLastSaved] = useState(null);
  const [mobileView, setMobileView] = useState("edit");
  const [noteId, setNoteId] = useState(null);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const textareaRef = useRef(null);

  // ✅ Load note if editing
  useEffect(() => {
    const noteIdParam = searchParams?.get("id");

    if (noteIdParam) {
      const loadNote = async () => {
        try {
          const existingNote = await notesAPI.getNoteById(noteIdParam);
          if (existingNote) {
            setNoteId(noteIdParam);
            setTitle(existingNote?.title ?? "");
            setContent(existingNote?.content ?? "");
            setLastSaved(existingNote?.updatedAt ?? null);
            setSaveStatus("saved");
          } else {
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Failed to load note:", error);
          navigate("/dashboard");
        }
      };
      loadNote();
    } else {
      // New note
      setNoteId(null);
      setTitle("");
      setContent("");
      setLastSaved(null);
      setSaveStatus("ready");
    }
  }, [searchParams, navigate]);

  // ✅ Manual Save
  const handleManualSave = async () => {
    setSaveStatus("saving");
    try {
      if (noteId) {
        await notesAPI.updateNote(noteId, title, content); // PUT
      } else {
        const newNote = await notesAPI.saveNote(title, content); // POST
        if (newNote?.id != null) {
          setNoteId(newNote.id);
          window.history.replaceState(null, "", `/markdown-editor?id=${newNote.id}`);
        }
      }
      setLastSaved(new Date());
      setSaveStatus("saved");
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Save failed:", error);
      setSaveStatus("error");
    }
  };

  // ✅ Formatting Handler
  const handleFormat = (prefix, suffix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);

    const newValue =
      content.substring(0, start) +
      prefix +
      selected +
      suffix +
      content.substring(end);

    setContent(newValue);
    setHasUnsavedChanges(true);
    setSaveStatus("unsaved");

    // Restore cursor selection
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + prefix.length;
      textarea.selectionEnd = end + prefix.length;
    }, 0);
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm("You have unsaved changes. Leave anyway?");
      if (!confirmLeave) return;
    }
    navigate("/dashboard");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader isAuthenticated={isAuthenticated} user={user} onLogout={logout} />

      <div className="pt-16">
        <EditorHeader
          title={title}
          onTitleChange={(val) => {
            setTitle(val);
            setHasUnsavedChanges(true);
            setSaveStatus("unsaved");
          }}
          saveStatus={saveStatus}
          lastSaved={lastSaved}
          onSave={handleManualSave}
          onBack={handleBack}
          isSaving={saveStatus === "saving"}
        />

        {/* Mobile View Toggle */}
        <div className="lg:hidden p-4 bg-surface border-b border-border">
          <MobileToggle activeView={mobileView} onViewChange={setMobileView} />
        </div>

        {/* Editor Layout */}
        <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)]">
          <div className="hidden lg:flex h-full">
            <div className="w-1/2 p-4">
              <EditorPane
                ref={textareaRef}
                content={content}
                onChange={(val) => {
                  setContent(val);
                  setHasUnsavedChanges(true);
                  setSaveStatus("unsaved");
                }}
                onFormat={handleFormat}   // ✅ Pass formatting
                lineNumbers={true}
              />
            </div>
            <div className="w-1/2 p-4 border-l border-border">
              <PreviewPane content={content} />
            </div>
          </div>

          <div className="lg:hidden h-full p-4">
            {mobileView === "edit" ? (
              <EditorPane
                ref={textareaRef}
                content={content}
                onChange={(val) => {
                  setContent(val);
                  setHasUnsavedChanges(true);
                  setSaveStatus("unsaved");
                }}
                onFormat={handleFormat}   // ✅ Pass formatting
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
