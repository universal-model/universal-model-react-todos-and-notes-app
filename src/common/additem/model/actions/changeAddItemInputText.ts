import {
  AddItemStateNamespace,
  getAddItemStateForNamespace
} from "@/common/additem/model/state/AddItemStateNamespace";


export default function changeAddItemInputText(
  addItemStateNamespace: AddItemStateNamespace,
  newInputText: string
) {
  getAddItemStateForNamespace(addItemStateNamespace).inputText = newInputText;
}
