package dev.sathish.Markdown_Note_Application.core;

import dev.sathish.Markdown_Note_Application.core.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
