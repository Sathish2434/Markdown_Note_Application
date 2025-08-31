package dev.sathish.Markdown_Note_Application.core;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collection;
import java.util.UUID;

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
    String objectId = this.storageService.store(content);
    Note note = new Note(null, title, objectId);
    return this.noteRepository.save(note);
  }

  public Collection<Note> getAllNotes() {
    return this.noteRepository.getAll();
  }

  public Note getNoteById(UUID id) {
    return this.noteRepository.getNote(id);
  }

  public Note updateNote(UUID id, String title, InputStream content) {
    Note existingNote = this.noteRepository.getNote(id);
    if (existingNote == null) {
      throw new RuntimeException("Note not found with id: " + id);
    }

    String objectId = this.storageService.store(content);
    Note updatedNote = new Note(id, title, objectId);
    return this.noteRepository.save(updatedNote);
  }

  public void deleteNote(UUID id) {
    Note note = this.noteRepository.getNote(id);
    if (note != null) {
      this.storageService.delete(note.objectId());
      this.noteRepository.delete(id);
    }
  }

  public void renderNote(UUID id, OutputStream html) {
    Note note = this.noteRepository.getNote(id);
    try (InputStream markdown = this.storageService.retrieve(note.objectId())) {
      this.markdownToHtmlConverter.convert(markdown, html);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
