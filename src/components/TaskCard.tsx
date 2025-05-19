import React from 'react';
import { Task } from '../features/tasks/taskTypes';
import { useAppDispatch } from '../hooks';
import { toggleTask, deleteTask } from '../features/tasks/taskSlice'; // Redux actions to complete & delete
import './TaskCard.css';
import { useNavigate } from 'react-router-dom'; // For dynamic routing
import { useRef } from 'react';

interface TaskCardProps {
  task: Task; // Props passed to this component
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();  // Get Redux dispatch
  const navigate = useNavigate(); // Hook for navigating programmatically

  const checkboxRef = useRef<HTMLInputElement>(null);  // Ref for the checkbox

  // Navigate to detailed task page on card click
  const handleCardClick = () => {
    // Prevent navigation if checkbox is being interacted with
    if (checkboxRef.current && checkboxRef.current !== document.activeElement) {  //checkbox exists & not focused
      navigate(`/task/${task.id}`); // open detailed page
    }
  };

  // Delete task handler
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents bubbling up to parent element
    dispatch(deleteTask({ id: task.id }));  // Dispatch delete action
  };

  // Toggle complete/incomplete
  const handleCheckboxToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent card click when checking the box
    dispatch(toggleTask({ id: task.id, completed: !task.completed }));  // Toggle task completion
  };

  return (
    <div
      className={`task-card ${task.completed ? 'completed' : ''}`}  //for style
      onClick={handleCardClick}
    >
      {/* Checkbox to mark complete/incomplete */}
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxToggle} // Toggle task completion
        className="task-checkbox"
      />

      {/* Delete button */}
      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>

      {/* Task Content */}
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p className={`priority ${task.priority.toLowerCase()}`}>Priority: {task.priority}</p>
      </div>
    </div>
  );
};

export default TaskCard;
