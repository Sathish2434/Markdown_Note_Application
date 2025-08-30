package dev.sathish.Markdown_Note_Application.core;

import java.io.InputStream;
import java.io.OutputStream;

public interface MarkdownToHtmlConverter {
  void convert(InputStream markdown, OutputStream html);
}
