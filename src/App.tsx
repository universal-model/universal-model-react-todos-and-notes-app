import * as React from 'react';
import HeaderView from "@/header/view/HeaderView";
import TodosPaneView from "@/todospane/view/TodosPaneView";
import NotesPaneView from "@/notespane/view/NotesPaneView";

const App = () => (
  <div>
    <HeaderView />
    <TodosPaneView />
    <NotesPaneView />
  </div>
);

export default App;
