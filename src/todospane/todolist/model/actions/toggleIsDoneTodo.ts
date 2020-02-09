import { Todo } from '@/todospane/todolist/model/state/initialTodoListState';

export default function toggleIsDoneTodo(todo: Todo): void {
  todo.isDone = !todo.isDone;
}
