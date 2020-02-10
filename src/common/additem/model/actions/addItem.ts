import {
  AddItemStateNamespace,
  getItemListStateForNamespace
} from '@/common/additem/model/state/AddItemStateNamespace';

let id = 3;

export default function addItem(addItemStateNamespace: AddItemStateNamespace, text: string): void {
  getItemListStateForNamespace(addItemStateNamespace).items.push({ id, text });
  id++;
}
