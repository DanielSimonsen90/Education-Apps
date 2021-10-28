package com.example.notekeeper;

import android.os.Bundle;

import androidx.lifecycle.ViewModel;

public class NoteActivityViewModel extends ViewModel {
    /** Key for original course id */
    public static final String ORIGINAL_NOTE_COURSE_ID = "com.example.notekeeper.ORIGINAL_NOTE_COURSE_ID";
    /** Key for original note title */
    public static final String ORIGINAL_NOTE_TITLE = "com.example.notekeeper.ORIGINAL_NOTE_TITLE";
    /** Key for original note text */
    public static final String ORIGINAL_NOTE_TEXT = "com.example.notekeeper.ORIGINAL_NOTE_TEXT";

    public String originalNoteCourseId;
    public String originalNoteTitle;
    public String originalNoteText;

    /** ViewModel is newly created = true, ViewModel is re-initialized due to activity death = false */
    public boolean isNewlyCreated = true;

    /** Sets original values to provided values */
    public void saveOriginalValues(String courseId, String title, String text) {
        originalNoteCourseId = courseId;
        originalNoteTitle = title;
        originalNoteText = text;
    }

    /** Adds original values to outState's kvp collection */
    public void saveState(Bundle outState) {
        outState.putString(ORIGINAL_NOTE_COURSE_ID, originalNoteCourseId);
        outState.putString(ORIGINAL_NOTE_TITLE, originalNoteTitle);
        outState.putString(ORIGINAL_NOTE_TEXT, originalNoteText);
    }

    /** Sets public properties to inState's kvp collection values */
    public void restoreState(Bundle inState) {
        originalNoteCourseId = inState.getString(ORIGINAL_NOTE_COURSE_ID);
        originalNoteTitle = inState.getString(ORIGINAL_NOTE_TITLE);
        originalNoteText = inState.getString(ORIGINAL_NOTE_TEXT);
    }
}
