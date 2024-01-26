package com.hreinn.tablebackend.model;


import jakarta.persistence.*;



@Entity
@Table(name = "note")
public final class Note {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name="date", nullable = false)
    private Long date;

    @Column(name = "note_text", nullable = false)
    private String noteText;

    public Note(){

    }

    public Note(Long id, long date, String noteText) {
        this.id = id;
        this.date = date;
        this.noteText = noteText;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getNoteText() {
        return noteText;
    }

    public void setNoteText(String noteText) {
        this.noteText = noteText;
    }

    public Long getDate() {
        return date;
    }

    public void setDate(long date) {
        this.date = date;
    }
}
