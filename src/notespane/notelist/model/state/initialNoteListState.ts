export interface Note {
  id: number;
  text: string;
}

export default {
  items: [
    { id: 1, text: 'First note' },
    { id: 2, text: 'Second note' }
  ] as Note[]
};
