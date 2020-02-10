import { FiltersState } from '@/common/filter/model/store/filterSubStore';

export default <T extends FiltersState>() => ({
  notesFilterText: (state: T) => state.notesFilterState.text,
  todosFilterText: (state: T) => state.todosFilterState.text
});
