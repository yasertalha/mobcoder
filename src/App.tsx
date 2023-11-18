import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes >
          <Route path="/" Component={TaskForm} />
          <Route path="/task/:id" Component={TaskDetails} />
        </Routes >
      </div>
    </Router>
  );
};

export default App;
