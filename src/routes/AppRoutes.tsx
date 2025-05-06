import React from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = () => <div>Home Page Loaded</div>;
const TaskPage = () => <div>Task Page Loaded</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tasks/:id" element={<TaskPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
