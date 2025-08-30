package dev.sathish.Markdown_Note_Application.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        // Redirect to notes page if authenticated, otherwise Spring Security will redirect to login
        return "redirect:/notes";
    }
}
