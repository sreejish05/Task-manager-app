import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />   {/* mapping path to components */}
        <Route path="/task/:id" element={<TaskPage />} />   {/* captures id from the URL. */}
      </Routes>
    </Router>
  );
};

export default App;
