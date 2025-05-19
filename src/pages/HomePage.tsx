import React, { useState } from 'react';
import { useAppSelector/*, useAppDispatch*/ } from '../hooks';
import TaskCard from '../components/TaskCard';
// import {
//   addTask,
//   markAllCompleted,
//   markAllIncomplete,
//   deleteCompleted,
//   clearAllTasks,
// } from '../features/tasks/taskSlice';
import './HomePage.css';
import AddTask from '../components/AddTask';
import SearchTask from '../components/SearchTask';
import CompletedTask from '../components/CompletedTask';
import { useNavigate } from 'react-router-dom';


const HomePage: React.FC = () => {
  
//  const [isDrawerOpen, setIsDrawerOpen] = useState(false);  //drawer toggle

const navigate = useNavigate();

  const tasks = useAppSelector((state) => state.tasks); // Get all tasks from Redux
  //const dispatch = useAppDispatch();  // Dispatch actions

  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'Low' | 'Medium' | 'High'>('all');
  const [searchTerm, setSearchTerm] = useState('');



  // Apply filters to tasks before displaying
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && task.completed) ||
      (statusFilter === 'pending' && !task.completed);

    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||      //search on title or desc
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="homepage-wrapper">
      <h1 className="homepage-title">Task Manager</h1>

      <div className="top-bar-header">
        <div className="filters">
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          <label>Priority:</label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as any)}>
            <option value="all">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      {/* add task component*/}
      <AddTask/>

        {/* <div className="action-drawer-button">
          <button onClick={() => setIsDrawerOpen(true)}>Actions</button>
        </div>
      </div> */}

      {/* search task */}
      <SearchTask
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="header-container">
        <CompletedTask />
        <div className="goto-tweets">
          <button onClick={() => navigate('/tweets')}>Tweets</button>
        </div>
      </div>


      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks to show</p>
        ) : (
          filteredTasks.map((task) => <TaskCard
            key={task.id}
            task={{
              ...task,
              priority: (
                task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()
              ) as 'Low' | 'Medium' | 'High',
            }}
          />) //if not empty, render taskcard for each value in filteredTasks array 
        )}
      </div>

      {/* {isDrawerOpen && (
        <div className={`bulk-drawer ${isDrawerOpen ? 'open' : ''}`}>
          <button className="close-button" onClick={() => setIsDrawerOpen(false)}>×</button>
          <h2>Actions</h2>
          <button onClick={() => dispatch(markAllCompleted())}>Mark All as Completed</button>
          <button onClick={() => dispatch(markAllIncomplete())}>Mark All as Incomplete</button>
          <button onClick={() => dispatch(deleteCompleted())}>Delete Completed</button>
          <button className="danger" onClick={() => dispatch(clearAllTasks())}>
            Clear All Tasks
          </button>
        </div>
      )} */}
    </div>
  );
};

export default HomePage;
