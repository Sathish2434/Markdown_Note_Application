package dev.sathish.Markdown_Note_Application.core;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.List;

public class NoteService {
  private final NoteRepository noteRepository;
  private final StorageService storageService;
  private final MarkdownToHtmlConverter markdownToHtmlConverter;

  public NoteService(NoteRepository noteRepository, StorageService storageService,
      MarkdownToHtmlConverter markdownToHtmlConverter) {
    this.noteRepository = noteRepository;
    this.storageService = storageService;
    this.markdownToHtmlConverter = markdownToHtmlConverter;
  }

  public Note saveNote(String title, InputStream content) {
    try {
      String text = new String(content.readAllBytes(), StandardCharsets.UTF_8);
      Note note = new Note();
      note.setTitle(title);
      note.setContent(text);
      return this.noteRepository.save(note);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  public List<Note> getAllNotes() {
    return this.noteRepository.findAll();
  }

  public Note getNoteById(Long id) {
    return this.noteRepository.findById(id).orElse(null);
  }

  public Note updateNote(Long id, String title, InputStream content) {
    Note existingNote = this.noteRepository.findById(id).orElse(null);
    if (existingNote == null) {
      throw new RuntimeException("Note not found with id: " + id);
    }
    try {
      String text = new String(content.readAllBytes(), StandardCharsets.UTF_8);
      existingNote.setTitle(title);
      existingNote.setContent(text);
      return this.noteRepository.save(existingNote);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  public void deleteNote(Long id) {
    if (this.noteRepository.existsById(id)) {
      this.noteRepository.deleteById(id);
    }
  }

  public void renderNote(Long id, OutputStream html) {
    Note note = this.noteRepository.findById(id).orElse(null);
    if (note == null) {
      throw new RuntimeException("Note not found with id: " + id);
    }
    try (InputStream markdown = new java.io.ByteArrayInputStream(note.getContent().getBytes(StandardCharsets.UTF_8))) {
      this.markdownToHtmlConverter.convert(markdown, html);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
