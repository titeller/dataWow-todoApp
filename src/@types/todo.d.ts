export interface ITodo {
  id: string;
  title: string;
  completed: boolean;

  // init add on state
  isEditable: boolean;
  isUpdateTodoLoading: boolean;
};

export type TodoContextType = {
  todos: ITodo[];
  isTodosLoading: boolean;
  isAddTodoLoading: boolean;
  getTodos: (filter: any) => void;
  addTodo: (title: string) => void;
  updateTodo: (id: string, title: string, completed: boolean) => void;
  removeTodo: (id: string) => void;
  setTodoEditable: (id: string, isEditable: boolean) => void;
};
