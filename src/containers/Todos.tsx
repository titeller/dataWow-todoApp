import React, { useState, useContext, KeyboardEvent, ChangeEvent } from 'react';

import { TodoContextType, ITodo } from '../@types/todo';
import { TodoContext } from '../contexts/todoContext';

import Progess from '../components/Progress';
import Todo from '../components/Todo';
import Progress from '../components/Progress';

import { todosFilterOptions } from '../constants/todos';
import { getTodosCompletedCount, getTodosCompletedPercent } from '../utils/todos';

const Todos = () => {
  const { todos, getTodos, addTodo, updateTodo, removeTodo, setTodoEditable } = useContext(TodoContext) as TodoContextType;

  const [titleInput, setTitleInput] = useState('')

  const handleTitleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodo(titleInput);
      setTitleInput('');
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const filter = {
      completed: event.target.value
    };
    getTodos(filter);
  }

  const todosCompletedCount = getTodosCompletedCount(todos);
  const todosCompletedPercent = getTodosCompletedPercent(todos);

  return (
    <div>
      <Progress
        todosCompletedCount={todosCompletedCount}
        todosCompletedPercent={todosCompletedPercent}
      />
      <div className="Todos-header">
        <p className="Todos-label">Tasks</p>
        <div className="Todos-select">
          <select className="Todos-filter" onChange={handleFilterChange}>
            {
              todosFilterOptions.map((option, index) => (
                <option
                  key={index} 
                  value={option.value}>
                    {option.label}
                  </option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="Todos-list">
        {todos.map((todo: ITodo) => (
          <Todo
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            setTodoEditable={setTodoEditable}
            removeTodo={removeTodo}
          />
        ))}
      </div>
      <input
        type="text"
        className="Input-text"
        placeholder="Add your todo..."
        onKeyDown={handleTitleKeyDown}
        onChange={handleTitleChange}
        value={titleInput}
      />
    </div>
  );
};

export default Todos;
