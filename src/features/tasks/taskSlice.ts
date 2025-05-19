import { createSlice/*, PayloadAction*/ } from '@reduxjs/toolkit';

// Main task slice using Redux Toolkit
const taskSlice = createSlice({
    name: 'tasks',  // Slice name
    initialState: [
        {id: 1, title: "todo1", description: "abc", completed: false, priority: 'Low'},
        {id: 2, title: "todo2", description: "def", completed: false, priority: 'Medium'},
        {id: 3, title: "todo3", description: "ghi", completed: false, priority: 'High'}
    ],
    reducers: {
      addTask: (state, action) => {
        const newTask = {
          id: Date.now(),
          title: action.payload.title,
          description: action.payload.description,
          completed: false,
          priority: action.payload.priority,
        };
        state.push(newTask); // Add new task
      },
      deleteTask: (state, action) => {
        return state.filter((task) => task.id !== action.payload.id);
      },
      toggleTask: (state, action) => {
        const index = state.findIndex((task) => task.id === action.payload.id);
			  state[index].completed = action.payload.completed;
      },
      // updateTask: (
      //   state,
      //   action: PayloadAction<{
      //     id: string;
      //     title: string;
      //     description: string;
      //     priority: 'Low' | 'Medium' | 'High';
      //   }>
      // ) => {
      //   const task = state.find(t => t.id === action.payload.id);
      //   if (task) {
      //     task.title = action.payload.title;
      //     task.description = action.payload.description;
      //     task.priority = action.payload.priority;
      //   }
      //   saveState(state);
      // },
      // markAllCompleted: (state) => {
      //   const newState = state.map(task => ({ ...task, completed: true }));
      //   saveState(newState);
      //   return newState;
      // },
      // markAllIncomplete: (state) => {
      //   const newState = state.map(task => ({ ...task, completed: false }));
      //   saveState(newState);
      //   return newState;
      // },
      // deleteCompleted: (state) => {
      //   const newState = state.filter(task => !task.completed);
      //   saveState(newState);
      //   return newState;
      // },
      // clearAllTasks: () => {
      //   saveState([]);
      //   return [];  // Clear all tasks
      // },
    },
  });
  
  // Exporting individual actions
  export const {
    addTask,
    deleteTask,
    toggleTask,
    // updateTask,
    // markAllCompleted,
    // markAllIncomplete,
    // deleteCompleted,
    // clearAllTasks,
  } = taskSlice.actions;
  
  export default taskSlice.reducer; // Export the reducer for Redux store
