package com.hreinn.tablebackend.controller;


import com.hreinn.tablebackend.model.Note;
import com.hreinn.tablebackend.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping(value = "/note")
public class NotesController {

    private final NoteService noteService;

    public NotesController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/helloworld")
    public String helloWorld() {
        return "Hello World";
    }

    @PostMapping
    public Note save(@RequestBody NoteTextDTO noteText) {
        return noteService.save(noteText.noteText);
    }

    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @RequestBody Note note) {
        return noteService.updateById(id, note).orElse(null);
    }

    @GetMapping
    public List<Note> findAll() {
        return noteService.findAll();
    }

    @GetMapping("/{id}")
    public Note findById(@PathVariable Long id) {
        return noteService.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        noteService.deleteById(id);
    }

    private record NoteTextDTO(String noteText){}

}
