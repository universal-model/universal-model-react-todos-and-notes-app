# Universal Model React Todos and Notes App

This sample App is built for React, but model parts apply to other UI frameworks Angular/Svelte/Vue also.
If you want to adopt this example for Angular/Svelte/Vue, you need to change only the view parts.

## App
![alt text](https://github.com/universal-model/universal-model-react-todos-and-notes-app/raw/master/images/todos_and_notes_app_wireframe.png 'App')

Todos and Notes app consist of following UI components:
 * Header 
 * TodosPane 
   * Filter
   * TodoList
   * AddItem
 * NotesPane 
   * Filter 
   * NoteList
   * AddItem 

### App directory layout

    - src
      |- common
      |  |- additem
      |  |  |- model
      |  |  |- view
      |  |- filter
      |  |  |- model
      |  |  |- view
      |- header
      |  | - model
      |  | - view
      |- notespane
      |  |- notelist
      |  |  |- model
      |  |  |- view
      |  |- view
      |- todospane
      |  |- todolist
      |  |  |- model
      |  |  |- view
      |  |- view
      |- store

### Store
**src/store/store.ts**
    
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
       
       const selectors = combineSelectors<State,
         typeof todoListStateSelectors,
         typeof noteListStateSelectors,
         typeof filterStateSelectors
       >(todoListStateSelectors, noteListStateSelectors, filterStateSelectors);
       
       export default createStore<State, typeof selectors>(initialState, selectors);
    
### AddItem
**src/common/additem/model/actions/addItem.ts**

    import {
      AddItemStateNamespace,
      getItemListStateForNamespace
    } from '@/common/additem/model/state/AddItemStateNamespace';
    
    let id = 3;
    
    export default function addItem(addItemStateNamespace: AddItemStateNamespace, text: string): void {
      getItemListStateForNamespace(addItemStateNamespace).items.push({ id, text });
      id++;
    }

**src/common/additem/model/actions/changeAddItemInputText.ts**

    import {
      AddItemStateNamespace,
      getAddItemStateForNamespace
    } from "@/common/additem/model/state/AddItemStateNamespace";
    
    export default function changeAddItemInputText(
      addItemStateNamespace: AddItemStateNamespace,
      newInputText: string
    ) {
      getAddItemStateForNamespace(addItemStateNamespace).inputText = newInputText;
    }

**src/common/additem/model/state/AddItemStateNamespace.ts**

    import store from '@/store/store';
    
    export type AddItemStateNamespace = 'notes' | 'todos';
    
    export function getAddItemStateForNamespace(addItemStateNamespace: AddItemStateNamespace) {
      switch (addItemStateNamespace) {
        case 'todos':
          return store.getState().todosAddItemState;
        case 'notes':
          return store.getState().notesAddItemState;
        default:
          throw new Error('Unsupported addItemStateNamespace');
      }
    }
    
    export function getItemListStateForNamespace(addItemStateNamespace: AddItemStateNamespace) {
      switch (addItemStateNamespace) {
        case 'todos':
          return store.getState().todoListState;
        case 'notes':
          return store.getState().noteListState;
        default:
          throw new Error('Unsupported addItemStateNamespace');
      }
    }

**src/common/additem/model/state/initialAddItemState.ts**

    export default {
      inputText: ''
    };
    
**src/common/additem/model/store/addItemSubStore.ts**
    
    import {createSubState} from 'universal-model-react';
    import initialAddItemState from '../state/initialAddItemState';
    
    export const initialAddItemsState = {
      notesAddItemState: createSubState(initialAddItemState),
      todosAddItemState: createSubState(initialAddItemState)
    };

**src/common/additem/view/AddItemView.tsx**
    
    import * as React from 'react';
    import store from '@/store/store';
    import {
      AddItemStateNamespace,
      getAddItemStateForNamespace
    } from '@/common/additem/model/state/AddItemStateNamespace';
    import changeAddItemInputText from '@/common/additem/model/actions/changeAddItemInputText';
    import addItem from '@/common/additem/model/actions/addItem';
    
    interface Props {
      stateNamespace: AddItemStateNamespace;
    }
    
    export default ({ stateNamespace }: Props) => {
      const addItemState = getAddItemStateForNamespace(stateNamespace);
      store.useState([addItemState]);
    
      return (
        <div>
          <input
            placeholder={`Enter ${stateNamespace} text...`}
            value={addItemState.inputText}
            onChange={({ target: { value } }) => changeAddItemInputText(stateNamespace, value)}
          />
          <button onClick={() => addItem(stateNamespace, addItemState.inputText)}>
            Add {stateNamespace === 'todos' ? 'Todo' : 'Note'}
          </button>
        </div>
      );
    };

### Filter 
**src/common/filter/model/actions/changeFilterText.ts**

    import getFilterStateForNamespace, { FilterStateNamespace } from '../state/filterStateNamespace';
    
    export default function changeFilterText(
      filterStateNamespace: FilterStateNamespace,
      newText: string
    ): void {
      getFilterStateForNamespace(filterStateNamespace).text = newText;
    }

**src/common/filter/model/state/createFilterStateSelectors.ts**

    import { FiltersState } from '@/common/filter/model/store/filterSubStore';
    
    export default <T extends FiltersState>() => ({
      notesFilterText: (state: T) => state.notesFilterState.text,
      todosFilterText: (state: T) => state.todosFilterState.text
    });

**src/common/filter/model/state/filterStateNamespace.ts**

    import store from '@/store/store';
    
    export type FilterStateNamespace = 'notes' | 'todos';
    
    export default function getFilterStateForNamespace(filterStateNamespace: FilterStateNamespace) {
      switch (filterStateNamespace) {
        case 'notes':
          return store.getState().notesFilterState;
        case 'todos':
          return store.getState().todosFilterState;
        default:
          throw new Error('Unsupported filterStateNamespace');
      }
    }

**src/common/filter/model/state/initialFilterState.ts**

    export default {
      text: ''
    };

**src/common/filter/model/store/filterSubStore.ts**

    import createFilterStateSelectors from '../state/createFilterStateSelectors';
    import { createSubState } from 'universal-model-react';
    import initialFilterState from "@/common/filter/model/state/initialFilterState";
    
    export const initialFiltersState = {
      notesFilterState: createSubState(initialFilterState),
      todosFilterState: createSubState(initialFilterState)
    };
    
    export type FiltersState = typeof initialFiltersState;
    export const filterStateSelectors = createFilterStateSelectors<FiltersState>();

**src/common/filter/view/FilterView.tsx**

    import * as React from 'react';
    import store from '@/store/store';
    import getFilterStateForNamespace, {
      FilterStateNamespace
    } from '@/common/filter/model/state/filterStateNamespace';
    import changeFilterText from '@/common/filter/model/actions/changeFilterText';
    
    interface Props {
      stateNamespace: FilterStateNamespace;
    }
    
    export default ({ stateNamespace }: Props) => {
      const filterState = getFilterStateForNamespace(stateNamespace);
      store.useState([filterState]);
    
      return (
        <div>
          <input
            value={filterState.text}
            placeholder={`Filter ${stateNamespace}...`}
            onChange={({ target: { value } }) => changeFilterText(stateNamespace, value)}
          />
        </div>
      );
    };

### Header
**src/header/model/actions/loginUser.ts**

    import store from '@/store/store';
    
    export default function loginUser(loggedInUserName: string): void {
      const { headerState } = store.getState();
      headerState.loggedInUserName = loggedInUserName;
    }

**src/header/model/actions/logoutUser.ts**

    import store from '@/store/store';
    
    export default function logoutUser(): void {
      const { headerState } = store.getState();
      headerState.loggedInUserName = '';
    }

**src/header/model/state/initialHeaderState.ts**

    export default {
      loggedInUserName: 'John'
    };

**src/header/view/HeaderView.tsx**

    import * as React from 'react';
    import store from '@/store/store';
    import loginUser from '@/header/model/actions/loginUser';
    import logoutUser from '@/header/model/actions/logoutUser';
    
    export default () => {
      const { headerState: state } = store.getState();
      store.useState([state]);
    
      return (
        <div>
          <h1>
            {state.loggedInUserName || ''} {state.loggedInUserName ? '´s' : ''} Todos and Notes
          </h1>
          {state.loggedInUserName === '' ? (
            <button onClick={() => loginUser('John')}>Login</button>
          ) : (
            <button onClick={() => logoutUser()}>Logout</button>
          )}
        </div>
      );
    };

### NotesPane
**src/notespane/view/NotesPaneView.tsx**

    import * as React from 'react';
    import FilterView from '@/common/filter/view/FilterView';
    import NoteListView from "@/notespane/notelist/view/NoteListView";
    import AddItemView from "@/common/additem/view/AddItemView";
    
    export default () => (
      <div>
        <h2>Notes</h2>
        <FilterView stateNamespace="notes" />
        <NoteListView />
        <AddItemView stateNamespace="notes" />
      </div>
    );

## NotesList
**src/notespane/notelist/model/actions/removeNote.ts**

    import store from '@/store/store';
    import { Note } from '@/notespane/notelist/model/state/initialNoteListState';
    
    export default function removeNote(noteToRemove: Note): void {
      const { noteListState } = store.getState();
      noteListState.items = noteListState.items.filter((note: Note) => note !== noteToRemove);
    }

**src/notespane/notelist/model/state/createNoteListStateSelectors.ts**
    
    import { State } from '@/store/store';
    import { Note } from './initialNoteListState';
    import createFilterStateSelectors from '@/common/filter/model/state/createFilterStateSelectors';
    
    export default <T extends State>() => ({
      shownNotes: (state: T) => {
        const notesFilterText = createFilterStateSelectors<State>().notesFilterText(state);
        return state.noteListState.items.filter((note: Note) => note.text.includes(notesFilterText));
      }
    });

**src/notespane/notelist/model/state/initialNoteListState.ts**

    export interface Note {
      id: number;
      text: string;
    }
    
    export default {
      items: [
        { id: 1, text: 'First note' },
        { id: 2, text: 'Second note' }
      ] as Note[]
    };

**src/notespane/notelist/view/NoteListView.tsx**

    import * as React from 'react';
    import store from '@/store/store';
    import { Note } from '@/notespane/notelist/model/state/initialNoteListState';
    import removeNote from '@/notespane/notelist/model/actions/removeNote';
    
    export default () => {
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
    
### TodosPane
**src/todospane/view/TodosPaneView.tsx**

    import * as React from 'react';
    import FilterView from '@/common/filter/view/FilterView';
    import TodoListView from '@/todospane/todolist/view/TodoListView';
    import AddItemView from '@/common/additem/view/AddItemView';
    
    export default () => (
      <div>
        <h2>Todos</h2>
        <FilterView stateNamespace="todos" />
        <TodoListView />
        <AddItemView stateNamespace="todos" />
      </div>
    );

### TodoList
**src/todospane/todolist/model/actions/removeTodo.ts**

    import store from '@/store/store';
    import { Todo } from '@/todospane/todolist/model/state/initialTodoListState';
    
    export default function removeTodo(todoToRemove: Todo): void {
      const { todoListState } = store.getState();
      todoListState.items = todoListState.items.filter((todo: Todo) => todo !== todoToRemove);
    }

**src/todospane/todolist/model/actions/toggleIsDoneTodo.ts**

    import { Todo } from '@/todospane/todolist/model/state/initialTodoListState';
    
    export default function toggleIsDoneTodo(todo: Todo): void {
      todo.isDone = !todo.isDone;
    }

**src/todospane/todolist/model/state/createTodoListStateSelectors.ts**

    import { State } from '@/store/store';
    import { Todo } from '@/todospane/todolist/model/state/initialTodoListState';
    import createFilterStateSelectors from '@/common/filter/model/state/createFilterStateSelectors';
    
    export default <T extends State>() => ({
      shownTodos: (state: T) => {
        const todosFilterText = createFilterStateSelectors<State>().todosFilterText(state);
        return state.todoListState.items.filter((todo: Todo) => todo.text.includes(todosFilterText));
      }
    });

**src/todospane/todolist/model/state/initialTodoListState.ts**

    export interface Todo {
      id: number;
      text: string;
      isDone: boolean;
    }
    
    export default {
      items: [
        { id: 1, text: 'First todo', isDone: false },
        { id: 2, text: 'Second todo', isDone: false }
      ] as Todo[]
    };

**src/todospane/todolist/view/TodoListView.tsx**

    import * as React from 'react';
    import store from '@/store/store';
    import { Todo } from '@/todospane/todolist/model/state/initialTodoListState';
    import toggleIsDoneTodo from '@/todospane/todolist/model/actions/toggleIsDoneTodo';
    import removeTodo from '@/todospane/todolist/model/actions/removeTodo';
    
    export default () => {
      const { shownTodos } = store.getSelectors();
      store.useSelectors([shownTodos]);
    
      const todoListItems = shownTodos.value.map((todo: Todo) => (
        <li key={todo.id}>
          <input
            id={todo.text}
            type="checkbox"
            defaultChecked={todo.isDone}
            onChange={() => toggleIsDoneTodo(todo)}
          />
          <label>{todo.text}</label>
          <button onClick={() => removeTodo(todo)}>Remove</button>
        </li>
      ));
    
      return <ul>{todoListItems}</ul>;
    };

