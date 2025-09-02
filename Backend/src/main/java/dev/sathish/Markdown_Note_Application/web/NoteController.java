package dev.sathish.Markdown_Note_Application.web;

import dev.sathish.Markdown_Note_Application.core.Note;
import dev.sathish.Markdown_Note_Application.core.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collection;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public Collection<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable("id") Long id) {
        Note note = noteService.getNoteById(id);
        return note != null ? ResponseEntity.ok(note) : ResponseEntity.notFound().build();
    }

    // ✅ Create with JSON
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Note> createNote(@RequestBody NoteRequest request) {
        Note saved = noteService.saveNote(request.getTitle(), request.getContent());
        return ResponseEntity.ok(saved);
    }

    // ✅ Update with JSON
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Note> updateNote(@PathVariable("id") Long id, @RequestBody NoteRequest request) {
        try {
            Note updated = noteService.updateNote(id, request.getTitle(), request.getContent());
            return ResponseEntity.ok(updated);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable("id") Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{id}/render", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> renderNote(@PathVariable("id") Long id) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            noteService.renderNote(id, out);
            String html = out.toString(StandardCharsets.UTF_8);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_HTML_VALUE)
                    .body(html);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Inner DTO class (no new file created)
    public static class NoteRequest {
        private String title;
        private String content;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
    }
}
