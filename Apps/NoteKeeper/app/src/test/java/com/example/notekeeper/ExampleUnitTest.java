package com.example.notekeeper;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class ExampleUnitTest {
    @Test
    public void addition_isCorrect() {
        assertEquals(4, 2 + 2);
    }

    @Test
    public void createNote() {
        //createNewNote
        DataManager dm = DataManager.getInstance();
        int newNoteIndex = dm.createNewNote(); //when using DataManager.createNewNote, it creates a new NoteInfo object with null values
        NoteInfo note = dm.getNotes().get(newNoteIndex);

        //note isn't null, but has null values
        assertNotNull(note);
        assertNull(note.getCourse());
        assertNull(note.getTitle());
        assertNull(note.getText());
    }

    @Test
    public void createNoteAndRegret() {
        createNote();
        //go back
    }

    @Test
    public void updateCourse() {
        DataManager dm = DataManager.getInstance();
        NoteInfo note = dm.getNotes().get(0);
        CourseInfo currentCourse = note.getCourse();
        CourseInfo course = dm.getCourses().get(0);
        if (currentCourse == course) course = dm.getCourses().get(1);

        note.setCourse(course);
        assertNotEquals(course, currentCourse);
        assertEquals(course, note.getCourse());
    }

    @Test
    public void updateTitle() {
        DataManager dm = DataManager.getInstance();
        NoteInfo note = dm.getNotes().get(1);
        String currentTitle = note.getTitle();
        String newTitle = "Unit testing Title";

        note.setTitle(newTitle);
        assertNotEquals(currentTitle, note.getTitle());
        assertEquals(newTitle, note.getTitle());
    }

    @Test
    public void updateText() {
        DataManager dm = DataManager.getInstance();
        NoteInfo note = dm.getNotes().get(2);
        String currentText = note.getText();
        String newText = "Unit testing text";

        note.setText(newText);
        assertNotEquals(currentText, note.getText());
        assertEquals(newText, note.getText());
    }

    @Test
    public void updateTextAndCancel() {
        updateText();
        //cancel changes
    }

    @Test
    public void deleteNote() {
        DataManager dm = DataManager.getInstance();
        List<NoteInfo> notes = dm.getNotes();
        int index = 3;
        NoteInfo note = notes.get(index);
        dm.removeNote(index);
        NoteInfo sameIndexNote = notes.get(index);

        assertNotEquals(note, sameIndexNote);
    }
}