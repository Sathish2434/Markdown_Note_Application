package dev.sathish.Markdown_Note_Application.core;

import java.util.Collection;
import java.util.UUID;

public interface NoteRepository {
  Note save(Note note);

  Collection<Note> getAll();

  Note getNote(UUID id);

  void delete(UUID id);
}
