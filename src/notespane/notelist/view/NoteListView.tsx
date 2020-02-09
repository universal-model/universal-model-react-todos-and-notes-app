import * as React from 'react';
import store from '@/store/store';
import { Note } from '@/notespane/notelist/model/state/initialNoteListState';
import removeNote from '@/notespane/notelist/model/actions/removeNote';

const NoteListView = () => {
  const { shownNotes } = store.getSelectors();
  store.useSelectors([shownNotes]);

  const noteListItems = shownNotes.value.map((note: Note) => (
    <li key={note.id}>
      <span>{note.text}</span>
      <button onClick={() => removeNote(note)}>Remove</button>
    </li>
  ));

  return <ul>{noteListItems}</ul>;
};

export default NoteListView;
