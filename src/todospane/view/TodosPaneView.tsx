import * as React from 'react';
import FilterView from '@/common/filter/view/FilterView';
import TodoListView from '@/todospane/todolist/view/TodoListView';
import AddItemView from '@/common/additem/view/AddItemView';

export default () => (
  <div>
    <FilterView stateNamespace="todos" />
    <TodoListView />
    <AddItemView stateNamespace="todos" />
  </div>
);
