package com.example.notekeeper;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.List;

public class NoteListActivity extends AppCompatActivity {

    private ArrayAdapter<NoteInfo> _adapterNotes;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_note_list);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(NoteListActivity.this, NoteActivity.class));
            }
        });

        initializeDisplayContent();
    }

    @Override
    /** App is now visible on screen again */
    protected void onResume() {
        super.onResume();
        _adapterNotes.notifyDataSetChanged(); //Update note list with new/changed notes
    }

    private void initializeDisplayContent() {
        final ListView listNotes = findViewById(R.id.list_notes); //readonly ListView component
        List<NoteInfo> notes = DataManager.getInstance().getNotes(); //Get notes
        _adapterNotes = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, notes); //Set _adapterNotes' values to notes
        listNotes.setAdapter(_adapterNotes); //Set listNotes' children to _adapterNotes

        //ListItem onClick
        listNotes.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            Intent intent = new Intent(NoteListActivity.this, NoteActivity.class); //Get NoteActivity intent
//           NoteInfo note = (NoteInfo)listNotes.getItemAtPosition(position);
            intent.putExtra(NoteActivity.NOTE_POSITION, position); //Set NOTE_POSITION key to position
            startActivity(intent); //Emit intent
            }
        });
    }
}
