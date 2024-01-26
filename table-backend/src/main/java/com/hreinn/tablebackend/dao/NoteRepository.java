package com.hreinn.tablebackend.dao;

import com.hreinn.tablebackend.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
