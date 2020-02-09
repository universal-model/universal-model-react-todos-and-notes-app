import * as React from 'react';
import FilterView from '@/common/filter/view/FilterView';
import NoteListView from "@/notespane/notelist/view/NoteListView";
import AddItemView from "@/common/additem/view/AddItemView";

const NotesPaneView = () => (
  <div>
    <FilterView stateNamespace="notes" />
    <NoteListView />
    <AddItemView stateNamespace="notes" />
  </div>
);

export default NotesPaneView;
