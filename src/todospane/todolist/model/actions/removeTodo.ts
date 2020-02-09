import store from '@/store/store';
import { Todo } from '@/todospane/todolist/model/state/initialTodoListState';

export default function removeTodo(todoToRemove: Todo): void {
  const { todoListState } = store.getState();
  todoListState.items = todoListState.items.filter((todo: Todo) => todo !== todoToRemove);
}
