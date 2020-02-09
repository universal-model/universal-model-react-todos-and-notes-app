import { FiltersState } from '@/common/filter/model/store/filterSubStore';

const createFilterStateSelectors = <T extends FiltersState>() => ({
  notesFilterText: (state: T) => state.notesFilterState.text,
  todosFilterText: (state: T) => state.todosFilterState.text
});

export default createFilterStateSelectors;
