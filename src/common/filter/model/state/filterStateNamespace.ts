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
