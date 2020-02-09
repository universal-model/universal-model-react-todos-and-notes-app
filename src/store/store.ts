import {combineSelectors, createStore, createSubState} from 'universal-model-react';
import {filterStateSelectors, initialFiltersState} from '@/common/filter/model/store/filterSubStore';
import initialHeaderState from '@/header/model/state/initialHeaderState';
import initialNoteListState from '@/notespane/notelist/model/state/initialNoteListState';
import {initialAddItemsState} from '@/common/additem/model/store/addItemSubStore';
import createTodoListStateSelectors from '@/todospane/todolist/model/state/createTodoListStateSelectors';
import createNoteListStateSelectors from '@/notespane/notelist/model/state/createNoteListStateSelectors';
import initialTodoListState from "@/todospane/todolist/model/state/initialTodoListState";

const initialState = {
  headerState: createSubState(initialHeaderState),
  noteListState: createSubState(initialNoteListState),
  todoListState: createSubState(initialTodoListState),
  ...initialAddItemsState,
  ...initialFiltersState
};

export type State = typeof initialState;

const todoListStateSelectors = createTodoListStateSelectors<State>();
const noteListStateSelectors = createNoteListStateSelectors<State>();

const selectors = combineSelectors<
  State,
  typeof todoListStateSelectors,
  typeof noteListStateSelectors,
  typeof filterStateSelectors
>(todoListStateSelectors, noteListStateSelectors, filterStateSelectors);

export default createStore<State, typeof selectors>(initialState, selectors);
