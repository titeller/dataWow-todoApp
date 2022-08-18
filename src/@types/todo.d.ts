export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  editable: boolean;
};

export type TodoContextType = {
  todos: ITodo[];
  getTodos: (filter: any) => void;
  addTodo: (title: string) => void;
  updateTodo: (id: string, title: strng, completed: boolean) => void;
  removeTodo: (id: string) => void;
  setTodoEditable: (id: string, editable: boolean) => void;
};
