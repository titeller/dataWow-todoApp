import React, { useState, useContext, KeyboardEvent, ChangeEvent } from 'react';

import { TodoContextType, ITodo } from '../@types/todo';
import { TodoContext } from '../contexts/todoContext';

import Todo from '../components/Todo';
import Progress from '../components/Progress';

import { todosFilterOptions } from '../constants/todos';
import { getTodosCompletedCount, getTodosCompletedPercent } from '../utils/todos';
import Loader from '../components/Loader';
import Select from '../components/Select';

const Todos = () => {
  const {
    todos,
    getTodos,
    addTodo,
    updateTodo,
    removeTodo,
    setTodoEditable,
    isTodosLoading,
    isAddTodoLoading
  } = useContext(TodoContext) as TodoContextType;

  const [titleInput, setTitleInput] = useState('')

  const handleTitleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (titleInput) {
        addTodo(titleInput);
        setTitleInput('');
      }
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };

  const handleFilterChange = (value: string) => {
    const filter = {
      completed: value
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
          <Select options={todosFilterOptions} onSelectChange={handleFilterChange} />
        </div>
      </div>
      {
        isTodosLoading ?
          <div className="todos-loader">
            <div className="todos-loader-wrapper">
              <Loader />
              <div className="todos-ref">
                <h4>Copyright © 2022</h4>
                <h2>Kitti Piyapan</h2>
                <h6>All rights reserved.</h6>
              </div>
            </div>
          </div>
          :
          <div className="Todos-list">
            {todos.map((todo: ITodo) => (
              <Todo
                key={todo.id}
                todo={todo}
                updateTodo={updateTodo}
                setTodoEditable={setTodoEditable}
                removeTodo={removeTodo}
              />
          ))
        }
        </div>
      }

      <div className="Todos Todo-add">
        <input
          type="text"
          className="Input-text"
          placeholder="Add your todo..."
          onKeyDown={handleTitleKeyDown}
          onChange={handleTitleChange}
          readOnly={isAddTodoLoading}
          value={titleInput}
        />
        {isAddTodoLoading && (
          <div className="Todo-loader">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
