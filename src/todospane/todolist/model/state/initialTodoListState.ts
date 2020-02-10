export interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

export default {
  items: [
    { id: 1, text: 'First todo', isDone: false },
    { id: 2, text: 'Second todo', isDone: false }
  ] as Todo[]
};
