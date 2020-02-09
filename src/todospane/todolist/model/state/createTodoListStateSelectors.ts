import { State } from '@/store/store';
import { Todo } from '@/todospane/todolist/model/state/initialTodoListState';
import createFilterStateSelectors from '@/common/filter/model/state/createFilterStateSelectors';

const createTodoListStateSelectors = <T extends State>() => ({
  shownTodos: (state: T) => {
    const todosFilterText = createFilterStateSelectors<State>().todosFilterText(state);
    return state.todoListState.items.filter((todo: Todo) => todo.text.includes(todosFilterText));
  }
});

export default createTodoListStateSelectors;
