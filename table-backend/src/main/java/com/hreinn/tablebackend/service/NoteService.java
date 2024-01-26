package com.hreinn.tablebackend.service;

import com.hreinn.tablebackend.model.Note;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface NoteService {

    Note save(String noteText);

    Optional<Note> updateById(Long id, Note note);

    List<Note> findAll();

    Optional<Note> findById(Long id);

    void deleteById(Long id);
}
