package dev.sathish.Markdown_Note_Application.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NotesController {

    @GetMapping("/notes")
    public String notes(Model model) {
        model.addAttribute("message", "Welcome to your Markdown Notes!");
        return "notes";
    }
}
