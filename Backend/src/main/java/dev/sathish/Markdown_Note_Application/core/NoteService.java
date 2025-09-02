package dev.sathish.Markdown_Note_Application.core;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class NoteService {

    private final NoteRepository noteRepository;
    private final StorageService storageService;
    private final MarkdownToHtmlConverter markdownToHtmlConverter;

    public NoteService(NoteRepository noteRepository,
                       StorageService storageService,
                       MarkdownToHtmlConverter markdownToHtmlConverter) {
        this.noteRepository = noteRepository;
        this.storageService = storageService;
        this.markdownToHtmlConverter = markdownToHtmlConverter;
    }

    // ✅ Create Note
    public Note saveNote(String title, InputStream content) {
        try {
            String text = new String(content.readAllBytes(), StandardCharsets.UTF_8);
            Note note = new Note();
            note.setTitle(title);
            note.setContent(text);
            // createdAt handled by JPA Auditing
            return this.noteRepository.save(note);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // ✅ Get All Notes
    public List<Note> getAllNotes() {
        return this.noteRepository.findAll();
    }

    // ✅ Get by Id
    public Note getNoteById(Long id) {
        return this.noteRepository.findById(id).orElse(null);
    }

    // ✅ Update Note
    public Note updateNote(Long id, String title, InputStream content) {
        return this.noteRepository.findById(id).map(existingNote -> {
            try {
                String text = new String(content.readAllBytes(), StandardCharsets.UTF_8);
                existingNote.setTitle(title);
                existingNote.setContent(text);
                // updatedAt handled by JPA Auditing
                return this.noteRepository.save(existingNote);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).orElseThrow(() -> new RuntimeException("Note not found with id: " + id));
    }

    // ✅ Delete Note
    public void deleteNote(Long id) {
        if (this.noteRepository.existsById(id)) {
            this.noteRepository.deleteById(id);
        }
    }

    // ✅ Render as HTML
    public void renderNote(Long id, OutputStream html) {
        Note note = this.noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + id));
        try (InputStream markdown = new java.io.ByteArrayInputStream(
                note.getContent().getBytes(StandardCharsets.UTF_8))) {
            this.markdownToHtmlConverter.convert(markdown, html);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
