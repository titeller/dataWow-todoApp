import React, { useState, useRef, ChangeEvent, MutableRefObject, KeyboardEvent } from 'react';

import { ITodo } from '../@types/todo';
import Dropdown from './Dropdown';
import Loader from './Loader';

type Props = {
  todo: ITodo;
  updateTodo: (id: string, title: string, completed: boolean) => void;
  removeTodo: (id: string) => void;
  setTodoEditable: (id: string, editable: boolean) => void;
};

const Todo:React.FC<Props> = ({
  todo: {
    id,
    title,
    completed,
    isEditable,
    isUpdateTodoLoading
  },
  updateTodo,
  removeTodo,
  setTodoEditable
}) => {
  const [titleInput, setTitleInput] = useState(title);
  const titleInputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleEditMenuClick = () => {
    setTodoEditable(id, true);
    setTimeout(() => {
      titleInputRef.current.focus();
    }, 50)
  };

  
  const handleCompletUpdate = () => {
    updateTodo(id, title, !completed);
    setTitleInput(titleInput);
  };

  const handleTitleUpdate = () => {
    if (titleInput) {
      updateTodo(id, titleInput, completed);
      setTodoEditable(id, false);
      setTitleInput(titleInput);
    }
  };

  const handleTitleUpdateKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleTitleUpdate();
    }
  };

  const handleTitleChange = (event: ChangeEvent) => {
    setTitleInput((event.target as HTMLInputElement).value)
  };

  const handleTodoRemove = () => {
    removeTodo(id);
  }

  return (
    <div className="Todos">
      {!isEditable && (
        <div className="Todos-checkbox">
          <label className="Checkbox" htmlFor={`checkbox-${id}`}>
            <input
              id={`checkbox-${id}`}
              type="checkbox"
              defaultChecked={completed}
              onClick={handleCompletUpdate}
            />
            <span className="Checkbox-checkmark" />
          </label>
        </div>)
      }
      <div className="Todos-title">
        {isEditable ? (
          <input
            className="Toodo-title-text"
            ref={titleInputRef}
            value={titleInput}
            onKeyDown={handleTitleUpdateKeyDown}
            onChange={handleTitleChange}
          />
        ) : (
          <div className={`Toodo-title-text ${completed ? 'completed' : ''}`}>{title}</div>
        )}
      </div>
      <div>
        {isEditable ? (
          <button
            className="Button-primary"
            onClick={handleTitleUpdate}
            type="button"
          >
            Save
          </button>
        ) : (
          <div style={{ marginRight: 16 }}>
            <Dropdown>
              {!completed && <li onClick={handleEditMenuClick}>Edit</li>}
              <li
                className="Text-danger"
                onClick={handleTodoRemove}
              >
                Remove
              </li>
            </Dropdown>
          </div>
        )}
      </div>
      {isUpdateTodoLoading && (
        <div className="Todo-loader">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Todo
