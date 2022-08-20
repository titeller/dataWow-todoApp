import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { get, post, put, del } from '../utils/xhr';

import { TodoContextType, ITodo } from '../@types/todo';
import { todosApiPath } from '../constants/api';
import { todoInitAddOn } from '../constants/todos';

import { handleError } from '../utils/error'

export const TodoContext = createContext<TodoContextType | null>(null);

type TodoProviderType = {
  children: ReactNode;
};

const TodoProvider = ({ children }: TodoProviderType) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState<boolean>(true);
  const [isAddTodoLoading, setIsAddTodoLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${todosApiPath}/todos`;
      const response = await get(url);

      setIsTodosLoading(false);

      if (response?.data) {
        const { data } = response;
        const newTodos = data.map((todo: ITodo) => ({
          ...todo,
          ...todoInitAddOn
        }))
        setTodos(newTodos);
      } else {
        handleError();
      }
    }
    
    fetchData();
  }, []);

  const getTodos = async (filter: any) => {
    let filters = [];
    if (filter.completed) {
      filters.push(`completed=${filter.completed}`);
    }

    setIsTodosLoading(true);

    const filterRequest = filters.length > 0 ? `?${filters.join('&')}` : '';
    const url = `${todosApiPath}/todos${filterRequest}`;
    const response = await get(url);

    setIsTodosLoading(false);

    if (response?.data) {
      const { data } = response;
      const newTodos = data.map((todo: ITodo) => ({
        ...todo,
        ...todoInitAddOn
      }))
      setTodos(newTodos);
    } else {
      handleError();
    }
  };

  const addTodo = async (title: string) => {
    setIsAddTodoLoading(true);

    const url = `${todosApiPath}/todos`;
    const response = await post(url, {
      title,
      completed: false
    });

    setIsAddTodoLoading(false);
    
    if (response?.data) {
      const { data } = response;
      const newTodo = {
        ...data,
        ...todoInitAddOn
      };
      setTodos([...todos, newTodo]);
    } else {
      handleError();
    }
  };

  const updateTodo = async (id: string, title: string, completed: boolean) => {
    updateTodosStateById(id, {
      isUpdateTodoLoading: true
    });

    const dataRequest = {
      title,
      completed
    };
    const url = `${todosApiPath}/todos/${id}`;
    const response = await put(url, dataRequest);

    updateTodosStateById(id, {
      isUpdateTodoLoading: false
    });

    if (response?.data) {
      const { data } = response;
      updateTodosStateById(id, data);
    } else {
      handleError();
    }
  };

  const removeTodo = async (id: string) => {
    updateTodosStateById(id, {
      isUpdateTodoLoading: true
    });

    const url = `${todosApiPath}/todos/${id}`;
    const response = await del(url);

    updateTodosStateById(id, {
      isUpdateTodoLoading: false
    });
    
    if (response?.data) {
      const newTodosRemoved = todos.filter((todo: ITodo) => todo.id !== id);
      setTodos(newTodosRemoved);
    } else {
      handleError();
    }
  };

  const setTodoEditable = (id: string, isEditable: boolean) => {
    const newTodos = todos.map((todo: ITodo) => {
      if (todo.id === id) {
        todo.isEditable = isEditable;
      }
      return todo;
    });
    setTodos(newTodos);
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
