import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { deleteTask, toggleTask, updateTask } from '../features/tasks/taskSlice';
import './TaskPage.css';

const TaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get task ID from URL
  const navigate = useNavigate();   //for redirection
  const dispatch = useAppDispatch();  // For dispatching updates

  const safeId = id ?? '';    // Fallback if id is undefined (null check)
  const task = useAppSelector((state) => state.tasks.find((task) => task.id === safeId)); // Find task by ID

  // Initialize state for form fields with existing task values
  const [editedTitle, setEditedTitle] = useState(task?.title || '');
  const [editedDescription, setEditedDescription] = useState(task?.description || '');
  const [editedPriority, setEditedPriority] = useState<'Low' | 'Medium' | 'High'>(task?.priority || 'Medium');

  // Save updated task and return to dashboard
  const handleSave = () => {
    dispatch(updateTask({ id: safeId, title: editedTitle, description: editedDescription, priority: editedPriority }));
    navigate('/');  //redirect to homepage
  };

  const handleDelete = () => {
    dispatch(deleteTask(safeId));
    navigate('/');
  };

  const handleToggle = () => {
    dispatch(toggleTask(safeId));
  };

  // Error handling
  if (!id) return <p>Invalid Task ID.</p>;
  if (!task) return <p>Task not found!</p>;

  return (
    <div className="task-page-container">
      <h1 className="task-page-title">Task Details</h1>
      <button className="back-button" onClick={() => navigate('/')}>
        Go Back to Dashboard
      </button>

      <div className="edit-task-card">
        <div className="edit-task-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Edit Task Title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Edit Task Description"
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value as 'Low' | 'Medium' | 'High')}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <div className="button-group">
            <button className="save-button" onClick={handleSave}>Save Changes</button>
            <button className="delete-button" onClick={handleDelete}>Delete Task</button>
            <button onClick={handleToggle}>
              {task.completed ? 'Mark as Pending' : 'Mark as Completed'}  {/* conditional redering */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
