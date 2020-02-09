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
