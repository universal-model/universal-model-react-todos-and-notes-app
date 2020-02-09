import {createSubState} from 'universal-model-react';
import initialAddItemState from '../state/initialAddItemState';

export const initialAddItemsState = {
  notesAddItemState: createSubState(initialAddItemState),
  todosAddItemState: createSubState(initialAddItemState)
};
