package com.hreinn.tablebackend.service;

import com.hreinn.tablebackend.dao.NoteRepository;
import com.hreinn.tablebackend.model.Note;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NoteServiceImpl implements NoteService {

    private static final Logger log = LoggerFactory.getLogger(NoteServiceImpl.class);
    private final NoteRepository repository;
    public NoteServiceImpl(NoteRepository repository){
        this.repository = repository;
    }

    @PostConstruct
    public void initData(){
        Note myFirstNote = new Note();
        myFirstNote.setNoteText("Remember to close the db connection");
        save(myFirstNote);

        Note mySecondNote = new Note();
        mySecondNote.setNoteText("Get dressed.");
        save(mySecondNote);
        log.info("Initial notes created");
    }


    @Override
    public Optional<Note> updateById(Long id, Note note) {
        Optional<Note> updatedNote = this.findById(id);
        if (updatedNote.isPresent()){
            Note savedNote = updatedNote.get();
            savedNote.setNoteText(note.getNoteText());
            return Optional.of(save(savedNote));
        }
        return Optional.empty();
    }

    private Note save(Note note){
        note.setDate(currentEpochMillis());
        return repository.save(note);
    }

    @Override
    public Note save(String noteText){
        Note note = new Note();
        note.setDate(currentEpochMillis());
        note.setNoteText(noteText);
        return repository.save(note);
    }

    @Override
    public List<Note> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Note> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    private static long currentEpochMillis() {
        return OffsetDateTime.now().toInstant().toEpochMilli();
    }
}
