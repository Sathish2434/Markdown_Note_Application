package dev.sathish.Markdown_Note_Application.core;

import java.nio.file.Path;
import java.util.UUID;

public record Note(UUID id, String title, String objectId) {
  public Note withId(UUID newId) {
    return new Note(newId, title, objectId);
  }
}
