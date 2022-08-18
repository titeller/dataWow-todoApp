import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
