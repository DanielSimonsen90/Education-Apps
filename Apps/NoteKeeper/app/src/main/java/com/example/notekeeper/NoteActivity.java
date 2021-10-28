package com.example.notekeeper;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.lifecycle.ViewModelProvider;

import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;

import java.util.List;

public class NoteActivity extends AppCompatActivity {
    /** Note position key */
    public static final String NOTE_POSITION = "com.example.notekeeper.NOTE_POSITION";
    /** Fallback value, if NOTE_POSITION stores null */
    public static final int POSITION_NOT_SET = -1;

    /** Note object */
    private NoteInfo _note;
    /** User pressed fab (Floating Action Button) from NoteListActivity */
    private boolean _isNewNote;

    /** Spinner component from UI */
    private Spinner _spinnerCourses;
    /** EditText/Textbox for _note.title component from UI */
    private EditText _title;
    /** EditText/Textbox for _note.text component from UI */
    private EditText _text;

    /** _note's position in course list */
    private int _notePosition;
    /** Whether user is canceling current changes */
    private boolean _isCancelling;
    /** _note state manager */
    private NoteActivityViewModel _viewModel;

    /** App is constructed/restored */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_note);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //#region ViewModel Data
        ViewModelProvider viewModelProvider = new ViewModelProvider(getViewModelStore(), ViewModelProvider.AndroidViewModelFactory.getInstance(getApplication())); //Get ViewModelProvider
        _viewModel = viewModelProvider.get(NoteActivityViewModel.class); //Get ViewModel object from custom ViewModel class

        //Activity was destroyed, but is now restored -- restore previous state
        if (savedInstanceState != null && _viewModel.isNewlyCreated)
            _viewModel.restoreState(savedInstanceState);

        //viewModel now stores original state
        _viewModel.isNewlyCreated = false;
        //#endregion

        //#region Get list of courses from the spinner component
        _spinnerCourses = findViewById(R.id.spinner_courses); //Get spinner component on UI
        List<CourseInfo> courses = DataManager.getInstance().getCourses(); //Get courses
        ArrayAdapter<CourseInfo> adapterCourses = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, courses); //Convert course items into simple_spinner_item components
        adapterCourses.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item); //Set adapter display
        _spinnerCourses.setAdapter(adapterCourses); //Set spinner's children to adapterCourses
        //#endregion

        readDisplayStateValues(); //Set _note to selected note, or create a new note, if none was selected
        saveOriginalNoteValues(); //Incase user wishes to cancel changes

        _title = findViewById(R.id.text_note_title); //Note title
        _text = findViewById(R.id.text_note_text); //Note text

        //If saved note was selected, display selected note
        if (!_isNewNote) displayNote(_spinnerCourses, _title, _text);
    }

    /** Saves original note values, incase user cancels changes */
    private void saveOriginalNoteValues() {
        if (_isNewNote) return; //No original values

        _viewModel.saveOriginalValues(
            _note.getCourse().getCourseId(),
            _note.getTitle(),
            _note.getText()
        );
    }

    /** App is not on screen */
    @Override
    protected void onPause() {
        super.onPause();

        if (_isCancelling) { //User selected "Cancel" option from Options
            if (_isNewNote) DataManager.getInstance().removeNote(_notePosition); //If canceling a new note, delete new note
            else storePreviousNoteValues(); //If canceling saved note, restore original values
        }
        else saveNote(); //User used arrow back - treat as autosave
    }

    /** Saves instance state, when viewing mode (portrait/landscape) changes */
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);

        //App is being destroyed
        if (outState != null) _viewModel.saveState(outState);
    }

    /** Replace _note's values with _viewModel's original values */
    private void storePreviousNoteValues() {
        CourseInfo course = DataManager.getInstance().getCourse(_viewModel.originalNoteCourseId); //Get course
        _note = new NoteInfo(course, _viewModel.originalNoteTitle, _viewModel.originalNoteText); //Replace note values
    }

    /** Save UI's components' values into _note */
    private void saveNote() {
        _note.setData(
            (CourseInfo)_spinnerCourses.getSelectedItem(), //Spinner's selected item
            _title.getText().toString(),  //_title's value
            _text.getText().toString() //_text's value
        );
    }

    /** Update UI to display saved note */
    private void displayNote(Spinner coursesSpinner, EditText title, EditText text) {
        List<CourseInfo> courses = DataManager.getInstance().getCourses(); //Get courses
        int coursesIndex = courses.indexOf(_note.getCourse()); //Find index of _note's course
        coursesSpinner.setSelection(coursesIndex); //Set spinner's selectedItem to corresponding course

        title.setText(_note.getTitle()); //Set title's value to _note's title
        text.setText(_note.getText()); //Set text's value to _note's text
    }

    /** Updates UI with values to display, when activity starts */
    private void readDisplayStateValues() {
        Intent intent = getIntent(); //Get the intent that caused activity to start
        int position = intent.getIntExtra(NOTE_POSITION, POSITION_NOT_SET); //Find position stored in intent
        _isNewNote = position == POSITION_NOT_SET; //If position returned fallback value (POSITION_NOT_SET), _isNewNote is true

        //If _isNewNote, create note, else find note that corresponds to position returned
        if (_isNewNote) createNewNote();
        else  _note = DataManager.getInstance().getNotes().get(position);
    }

    /** Handles when user presses fab (Floating Action Button) from NoteListActivity */
    private void createNewNote() {
        DataManager dm = DataManager.getInstance();
        _notePosition = dm.createNewNote(); //Creates new position for new note
        _note = dm.getNotes().get(_notePosition); //Set _note to note corresponding _notePosition -- new NoteInfo instance with null values
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_note, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_send_mail) {
            sendEmail();
            return true;
        }
        else if (id == R.id.action_cancel) {
            _isCancelling = true;
            finish();
        }

        return super.onOptionsItemSelected(item);
    }

    /** Handles Send Email option in Options */
    private void sendEmail() {
        CourseInfo course = (CourseInfo)_spinnerCourses.getSelectedItem(); //Get course
        String subject = _title.getText().toString(); //Email subject = _title
        String text = "Check out what I learned in the Pluralsight course!\"" + course.getTitle() + "\"\n" + _text.getText(); //text = boilerplate + title & text
        Intent intent = new Intent(Intent.ACTION_SEND); //Create new ACTION_SEND intent
        intent.setType("message/rfc2822"); //Intent type -- perspective would be text/html || text/json
        intent.putExtra(Intent.EXTRA_SUBJECT, subject); //Set EXTRA_SUBJECT key to subject
        intent.putExtra(Intent.EXTRA_TEXT, text); //Set EXTRA_TEXT key to text
        startActivity(intent); //Emit intent activity
    }
}
