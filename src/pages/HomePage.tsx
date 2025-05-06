import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import TaskCard from '../components/TaskCard';
import {
  addTask,
  markAllCompleted,
  markAllIncomplete,
  deleteCompleted,
  clearAllTasks,
} from '../features/tasks/taskSlice';
import './HomePage.css';

const HomePage: React.FC = () => {
  // Controlled input states for the new task form
  const [newTaskTitle, setNewTaskTitle] = useState(''); 
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);  //drawer toggle

  const tasks = useAppSelector((state) => state.tasks); // Get all tasks from Redux
  const dispatch = useAppDispatch();  // Dispatch actions

  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'Low' | 'Medium' | 'High'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Create a new task and dispatch it
  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({
          id: Date.now().toString(),  // Unique ID from timestamp
          title: newTaskTitle,
          description: newTaskDescription,
          completed: false,
          priority: newTaskPriority,
        })
      );
      // Reset form fields
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskPriority('Medium');
    }
  };

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

        <div className="add-task">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New Task Title"
          />
          <input
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="New Task Description"
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value as 'Low' | 'Medium' | 'High')}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleAddTask}>Add</button>
        </div>

        <div className="action-drawer-button">
          <button onClick={() => setIsDrawerOpen(true)}>Actions</button>
        </div>
      </div>

      <div className="search-bar-centered">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Tasks..."
        />
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks to show</p>
        ) : (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />) //if not empty, render taskcard for each value in filteredTasks array 
        )}
      </div>

      {isDrawerOpen && (
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
      )}
    </div>
  );
};

export default HomePage;
