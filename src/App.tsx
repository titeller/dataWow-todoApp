import React from 'react';

import TodoProvider from './contexts/todoContext';
import './App.css';
import Todos from './containers/Todos';

const App = () => {
  return (
    <TodoProvider>
      <div className="App">
        <Todos />
      </div>
    </TodoProvider>
  );
}

export default App;
