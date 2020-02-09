import { State } from '@/store/store';
import {Note} from "./initialNoteListState";
import createFilterStateSelectors from "@/common/filter/model/state/createFilterStateSelectors";

const createNoteListStateSelectors = <T extends State>() => ({
  shownNotes: (state: T) => {
    const notesFilterText = createFilterStateSelectors<State>().notesFilterText(state);
    return state.noteListState.items.filter(
        (note: Note) => note.text.includes(notesFilterText));
  }
});


export default createNoteListStateSelectors;
