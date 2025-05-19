import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import TweetsPage from './pages/TweetsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />   {/* mapping path to components */}
        <Route path="/task/:id" element={<TaskPage />} />   {/* captures id from the URL. */}
        <Route path="/tweets" element={<TweetsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
