import {
  AddItemStateNamespace,
  getItemListStateForNamespace
} from '@/common/additem/model/state/AddItemStateNamespace';

let id = 3;

export default function addItem(addItemNamespace: AddItemStateNamespace, text: string): void {
  getItemListStateForNamespace(addItemNamespace).items.push({ id, text, isDone: false });
  id++;
}
