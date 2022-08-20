import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios'

import { TodoContextType, ITodo } from '../@types/todo';
import { todosApiPath } from '../constants/api';
import { todoInitAddOn } from '../constants/todos';

export const TodoContext = createContext<TodoContextType | null>(null);

type TodoProviderType = {
  children: React.ReactNode;
}

const TodoProvider = ({ children }: TodoProviderType) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState<boolean>(true);
  const [isAddTodoLoading, setIsAddTodoLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${todosApiPath}/todos`)
      const newTodos = data.map((todo: ITodo) => ({
        ...todo,
        ...todoInitAddOn
      }))
      setIsTodosLoading(false);
      setTodos(newTodos);
    }
    
    fetchData();
  }, []);

  const setTodoEditable = (id: string, isEditable: boolean) => {
    const newTodos = todos.map((todo: ITodo) => {
      if (todo.id === id) {
        todo.isEditable = isEditable;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo = async (title: string) => {
    setIsAddTodoLoading(true);

    const { data } = await axios.post(`${todosApiPath}/todos`, {
      title,
      completed: false
    })

    setIsAddTodoLoading(false);
    
    const newTodo = {
      ...data,
      ...todoInitAddOn
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodosStateById = (id: string, data: any) => {
    const newTodos = todos.map((todo: ITodo) => {
      if (todo.id === id) {
        todo = {
          ...todo,
          ...data
        }
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const updateTodo = async (id: string, title: string, completed: boolean) => {
    updateTodosStateById(id, {
      isUpdateTodoLoading: true
    });

    const dataRequest = {
      title,
      completed
    };
    const { data } = await axios.put(`${todosApiPath}/todos/${id}`, dataRequest);

    updateTodosStateById(id, {
      isUpdateTodoLoading: false
    });

    if (data) {
      updateTodosStateById(id, dataRequest);
    }
  };

  const removeTodo = async (id: string) => {
    updateTodosStateById(id, {
      isUpdateTodoLoading: true
    });
    const { data } = await axios.delete(`${todosApiPath}/todos/${id}`);

    updateTodosStateById(id, {
      isUpdateTodoLoading: false
    });
    
    if (data) {
      const newTodosRemoved = todos.filter((todo: ITodo) => todo.id !== id);
      setTodos(newTodosRemoved);
    }
  };

  const getTodos = async (filter: any) => {
    let filters = [];
    if (filter.completed) {
      filters.push(`completed=${filter.completed}`);
    }

    setIsTodosLoading(true);
    const filterRequest = filters.length > 0 ? `?${filters.join('&')}` : '';
    const { data } = await axios.get(`${todosApiPath}/todos${filterRequest}`);
    const newTodos = data.map((todo: ITodo) => ({
      ...todo,
      ...todoInitAddOn
    }))
    setIsTodosLoading(false);
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider 
      value={{
        todos,
        getTodos,
        addTodo, 
        updateTodo,
        removeTodo,
        setTodoEditable,
        isTodosLoading,
        isAddTodoLoading
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
