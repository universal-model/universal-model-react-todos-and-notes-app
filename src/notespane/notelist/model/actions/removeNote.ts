import store from '@/store/store';
import { Note } from '@/notespane/notelist/model/state/initialNoteListState';

export default function removeNote(noteToRemove: Note): void {
  const { noteListState } = store.getState();
  noteListState.items = noteListState.items.filter((note: Note) => note !== noteToRemove);
}
