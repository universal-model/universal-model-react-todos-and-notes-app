import * as React from 'react';
import store from '@/store/store';
import {
  AddItemStateNamespace,
  getAddItemStateForNamespace
} from '@/common/additem/model/state/AddItemStateNamespace';
import changeAddItemInputText from '@/common/additem/model/actions/changeAddItemInputText';
import addItem from '@/common/additem/model/actions/addItem';

interface Props {
  stateNamespace: AddItemStateNamespace;
}

export default ({ stateNamespace }: Props) => {
  const addItemState = getAddItemStateForNamespace(stateNamespace);
  store.useState([addItemState]);

  return (
    <div>
      <input
        value={addItemState.inputText}
        onChange={({ target: { value } }) => changeAddItemInputText(stateNamespace, value)}
      />
      <button onClick={() => addItem(stateNamespace, addItemState.inputText)}>
        Add {stateNamespace === 'todos' ? 'Todo' : 'Note'}
      </button>
    </div>
  );
};
