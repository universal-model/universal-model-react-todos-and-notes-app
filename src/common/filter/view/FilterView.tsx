import * as React from 'react';
import store from '@/store/store';
import getFilterStateForNamespace, { FilterStateNamespace } from '@/common/filter/model/state/filterStateNamespace';
import changeFilterText from '@/common/filter/model/actions/changeFilterText';

interface Props {
  stateNamespace: FilterStateNamespace;
}

const FilterView = ({ stateNamespace }: Props) => {
  const filterState = getFilterStateForNamespace(stateNamespace);
  store.useState([filterState]);

  return (
    <div>
      <input placeholder="Filter todos..." onChange={({ target: { value } }) => changeFilterText(stateNamespace, value)} />
    </div>
  );
};

export default FilterView;
