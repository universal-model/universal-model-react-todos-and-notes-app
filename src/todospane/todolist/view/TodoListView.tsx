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
