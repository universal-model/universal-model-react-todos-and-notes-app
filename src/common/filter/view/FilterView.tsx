import * as React from 'react';
import store from '@/store/store';
import getFilterStateForNamespace, {
  FilterStateNamespace
} from '@/common/filter/model/state/filterStateNamespace';
import changeFilterText from '@/common/filter/model/actions/changeFilterText';

interface Props {
  stateNamespace: FilterStateNamespace;
}

export default ({ stateNamespace }: Props) => {
  const filterState = getFilterStateForNamespace(stateNamespace);
  store.useState([filterState]);

  return (
    <div>
      <input
        value={filterState.text}
        placeholder="Filter todos..."
        onChange={({ target: { value } }) => changeFilterText(stateNamespace, value)}
      />
    </div>
  );
};
