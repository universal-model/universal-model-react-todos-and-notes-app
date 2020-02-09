import getFilterStateForNamespace, { FilterStateNamespace } from '../state/filterStateNamespace';

export default function changeFilterText(
  filterStateNamespace: FilterStateNamespace,
  newText: string
): void {
  getFilterStateForNamespace(filterStateNamespace).text = newText;
}
