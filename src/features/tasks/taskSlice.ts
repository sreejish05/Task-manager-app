import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './taskTypes'; 

// Load initial state from localStorage
const loadState = (): Task[] => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) return [];  // No tasks found, return empty array
    return JSON.parse(serializedState) as Task[]; // Parse and return stored tasks
  } catch (e) {
    console.error('Could not load tasks from localStorage', e);
    return [];  // On error, return empty list
  }
};

// Save updated tasks to localStorage
const saveState = (state: Task[]) => {  //state is array of task obj, having curr data in redux store
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState); // Store the current state
  } catch (e) {
    console.error('Could not save tasks to localStorage', e);
  }
};

const initialState: Task[] = loadState(); // Initial Redux state from localStorage

// Main task slice using Redux Toolkit
const taskSlice = createSlice({
    name: 'tasks',  // Slice name
    initialState,
    reducers: {
      addTask: (state, action: PayloadAction<Task>) => {
        state.push(action.payload); // Add new task
        saveState(state);
      },
      deleteTask: (state, action: PayloadAction<string>) => {
        const newState = state.filter(task => task.id !== action.payload);
        saveState(newState);
        return newState;  // Return new state without the deleted task
      },
      toggleTask: (state, action: PayloadAction<string>) => {
        const task = state.find(t => t.id === action.payload);
        if (task) task.completed = !task.completed; // Toggle task status
        saveState(state);
      },
      updateTask: (
        state,
        action: PayloadAction<{
          id: string;
          title: string;
          description: string;
          priority: 'Low' | 'Medium' | 'High';
        }>
      ) => {
        const task = state.find(t => t.id === action.payload.id);
        if (task) {
          task.title = action.payload.title;
          task.description = action.payload.description;
          task.priority = action.payload.priority;
        }
        saveState(state);
      },
      markAllCompleted: (state) => {
        const newState = state.map(task => ({ ...task, completed: true }));
        saveState(newState);
        return newState;
      },
      markAllIncomplete: (state) => {
        const newState = state.map(task => ({ ...task, completed: false }));
        saveState(newState);
        return newState;
      },
      deleteCompleted: (state) => {
        const newState = state.filter(task => !task.completed);
        saveState(newState);
        return newState;
      },
      clearAllTasks: () => {
        saveState([]);
        return [];  // Clear all tasks
      },
    },
  });
  
  // Exporting individual actions
  export const {
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    markAllCompleted,
    markAllIncomplete,
    deleteCompleted,
    clearAllTasks,
  } = taskSlice.actions;
  
  export default taskSlice.reducer; // Export the reducer for Redux store
