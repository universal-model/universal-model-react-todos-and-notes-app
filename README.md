# Universal Model React Todos and Notes App

## App
![alt text](https://github.com/universal-model/universal-model-react-todos-and-notes-app/raw/master/images/TodosAndNotesAppWireframe.png 'App')

Todos and Notes app consist of following UI components:
 * Header (top)
 * TodosPane (left)
   * Filter
   * TodoList
   * AddTodo
 * NotesPane (right)
   * Fi
   * NoteList
   * AddNote

### App directory layout

    - src
      |- common
      |  |- filter
      |  |  |- model
      |  |  |- view
      |- header
      |  | - model
      |  | - view
      |- notespane
      |  |- model
      |  |- notelist
      |  |  |- model
      |  |  |- view
      |  |- addnote
      |  |  |- model
      |  |  |- view
      |  |- view
      |- todospane
      |- |- model
      |  |- todolist
      |  |  |- model
      |  |  |- view
      |  |- addtodo
      |  |  |- model
      |  |  |- view
      |  |- view
      |- store

### Store
**src/store/store.ts**
    
       const initialState = {
           headerState: createSubState(initialHeaderState),
           ...initialNotesPaneState,
           ...initialTodosPaneState
       };
       
       export type State = typeof initialState;
       
       const selectors = combineSelectors<State, typeof todosPaneStateSelectors, typeof notesPaneStateSelectors>(
           todosPaneStateSelectors,
           notesPaneStateSelectors
       );
       
       export default createStore<State, typeof selectors>(initialState, selectors);
    
### Sub-stores
**src/notespane/model/store/notesPaneSubStore.ts**

    export const initialNotesPaneState = {
        notesFilterState: createSubState(initialFilterState),
        noteListState: createSubState(initialNoteListState),
        addNoteState: createSubState(initialAddNoteState)
    };
    
    export const noteListStateSelectors = createNoteListStateSelectors<typeof initialNotesPaneState>();
    
**src/notespane/model/store/todosPaneSubStore.ts**

    export const initialTodosPaneState = {
        todoFilterState: createSubState(initialFilterState),
        todoListState: createSubState(initialTodoListState),
        addTodoState: createSubState(initialAddTodoState)
    };
    
    export const todosPaneStateSelectors = createTodoListStateSelectors<typeof initialTodosPaneState>();

