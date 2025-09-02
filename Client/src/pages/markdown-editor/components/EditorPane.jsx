import React, { forwardRef } from "react";
import EditorToolbar from "./EditorToolbar";

const EditorPane = forwardRef(({ content, onChange, onFormat, lineNumbers = false }, ref) => {
  return (
    <div className="flex flex-col h-full bg-surface border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <EditorToolbar onFormat={onFormat} />

      {/* Textarea */}
      <textarea
        ref={ref}   // ✅ this now works because of forwardRef
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full resize-none p-4 font-mono text-sm bg-background text-foreground outline-none"
        style={{
          lineHeight: "1.5",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
        }}
        placeholder="Write your markdown here..."
      />
    </div>
  );
});

export default EditorPane;
