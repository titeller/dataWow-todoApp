import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios'

import { TodoContextType, ITodo } from '../@types/todo';
import { todosApiPath } from '../constants/api';

export const TodoContext = createContext<TodoContextType | null>(null);

type TodoProviderType = {
  children: React.ReactNode;
}

const TodoProvider = ({ children }: TodoProviderType) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${todosApiPath}/todos`)
      const todoDataInit = data.map((todo: ITodo) => ({
        ...todo,
        editable: false
      }))
      setTodos(todoDataInit);
    }
    
    fetchData();
  }, []);

  const setTodoEditable = (id: string, editable: boolean) => {
    const newTodos = todos.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.editable = editable;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo = async (title: string) => {
    const { data } = await axios.post(`${todosApiPath}/todos`, {
      title,
      completed: false
    })

    const newTodo = {
      ...data,
      editable: false
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = async (id: string, title: string, completed: boolean) => {
    const { data } = await axios.put(`${todosApiPath}/todos/${id}`, {
      title,
      completed
    });

    if (data) {
      const newTodos = todos.filter((todo: ITodo) => {
        if (todo.id === id) {
          todo.completed = completed;
        }
        return todo;
      });
      setTodos(newTodos);
    }
  };

  const removeTodo = async (id: string) => {
    const { data } = await axios.delete(`${todosApiPath}/todos/${id}`);

    if (data) {
      const newTodosRemoved = todos.filter((todo: ITodo) => {
        if (todo.id !== id) {
          return todo;
        }
      });
      setTodos(newTodosRemoved);
    }
  };

  const getTodos = async (filter: any) => {
    let filters = []
    if (filter.completed) {
      filters.push(`completed=${filter.completed}`);
    }

    const filterRequest = filters.length > 0 ? `?${filters.join('&')}` : ''
    const { data } = await axios.get(`${todosApiPath}/todos${filterRequest}`)
    const todoDataInit = data.map((todo: ITodo) => ({
      ...todo,
      editable: false
    }))
    setTodos(todoDataInit);
  };

  return (
    <TodoContext.Provider 
      value={{
        todos,
        getTodos,
        addTodo, 
        updateTodo,
        removeTodo,
        setTodoEditable
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
