import * as React from 'react';
import FilterView from '@/common/filter/view/FilterView';
import NoteListView from '@/notespane/notelist/view/NoteListView';
import AddItemView from '@/common/additem/view/AddItemView';

export default () => (
  <div>
    <h2>Notes</h2>
    <FilterView stateNamespace="notes" />
    <NoteListView />
    <AddItemView stateNamespace="notes" />
  </div>
);
