import createFilterStateSelectors from '../state/createFilterStateSelectors';
import { createSubState } from 'universal-model-react';
import initialFilterState from "@/common/filter/model/state/initialFilterState";

export const initialFiltersState = {
  notesFilterState: createSubState(initialFilterState),
  todosFilterState: createSubState(initialFilterState)
};

export type FiltersState = typeof initialFiltersState;

export const filterStateSelectors = createFilterStateSelectors<FiltersState>();
