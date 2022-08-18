import { ITodo } from "../@types/todo";
import { getIsWhatPercentOf } from "./number";

export const getTodosCompletedPercent = (todos: ITodo[]) => {
  const todosCompleted = todos.filter((todo) => todo.completed === true);
  const percent = getIsWhatPercentOf(todosCompleted.length, todos.length);
  return percent;
};

export const getTodosCompletedCount = (todos: ITodo[]) => {
  const todosCompleted = todos.filter((todo) => todo.completed === true);
  return todosCompleted.length;
};