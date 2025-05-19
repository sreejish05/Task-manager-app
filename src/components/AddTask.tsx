import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import '../pages/HomePage.css';


const AddTask = () => {

const dispatch = useDispatch();  // Dispatch actions
  // Controlled input states for the new task form
  const [newTaskTitle, setNewTaskTitle] = useState(''); 
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

    // Create a new task and dispatch it
  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({
          id: Date.now(),  // Unique ID from timestamp
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
	return (

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

	);
};

export default AddTask;
