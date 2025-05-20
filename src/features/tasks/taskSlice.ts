import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export interface Task {
	id: string;
	title: string;
	description: string;
	priority: 'Low' | 'Medium' | 'High';
	completed: boolean;
}

const initialState: Task[] = [];

export const getTodosAsync = createAsyncThunk('tasks/getTodosAsync', async () => {
	const resp = await fetch('http://localhost:7002/tasks');
	if (resp.ok) {
		const tasks: Task[] = await resp.json();
		return { tasks };
	}
	throw new Error('Failed to fetch tasks');
});

export const addTodoAsync = createAsyncThunk(
	'tasks/addTodoAsync',
	async (payload: { title: string; description: string; priority: 'Low' | 'Medium' | 'High' }) => {
		const resp = await fetch('http://localhost:7002/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});

		if (resp.ok) {
			const task: Task = await resp.json();
			return { task };
		}
		throw new Error('Failed to add tasks');
	}
);

export const toggleCompleteAsync = createAsyncThunk(
	'tasks/completeTodoAsync',
	async (payload: { id: string; completed: boolean }) => {
		const resp = await fetch(`http://localhost:7002/tasks/${payload.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ completed: payload.completed }),
		});

		if (resp.ok) {
			const task: Task = await resp.json();
			return { task };
		}
		throw new Error('Failed to update task');
	}
);

export const deleteTodoAsync = createAsyncThunk('tasks/deleteTodoAsync', async (payload: { id: string }) => {
	const resp = await fetch(`http://localhost:7002/tasks/${payload.id}`, {
		method: 'DELETE',
	});

	if (resp.ok) {
		return { id: payload.id };
	}
	throw new Error('Failed to delete task');
});

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTaskAsync',
  async (payload: {
    id: string;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
  }) => {
    const resp = await fetch(`http://localhost:7002/tasks/${payload.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: payload.title,
        description: payload.description,
        priority: payload.priority,
      }),
    });

    if (resp.ok) {
      const task: Task = await resp.json();
      return { task };
    }
    throw new Error('Failed to update task');
  }
);

export const markAllCompletedAsync = createAsyncThunk(
  'tasks/markAllCompletedAsync',
  async (_, { getState }) => {
    const state = getState() as { tasks: Task[] };
    const updatedTasks = await Promise.all(
      state.tasks
        .filter((task) => !task.completed)
        .map(async (task) => {
          const resp = await fetch(`http://localhost:7002/tasks/${task.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true }),
          });
          return resp.ok ? await resp.json() : task;
        })
    );
    return { updatedTasks };
  }
);

export const markAllIncompleteAsync = createAsyncThunk(
  'tasks/markAllIncompleteAsync',
  async (_, { getState }) => {
    const state = getState() as { tasks: Task[] };
    const updatedTasks = await Promise.all(
      state.tasks
        .filter((task) => task.completed)
        .map(async (task) => {
          const resp = await fetch(`http://localhost:7002/tasks/${task.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: false }),
          });
          return resp.ok ? await resp.json() : task;
        })
    );
    return { updatedTasks };
  }
);

export const deleteCompletedAsync = createAsyncThunk(
  'tasks/deleteCompletedAsync',
  async (_, { getState }) => {
    const state = getState() as { tasks: Task[] };
    const remainingTasks = await Promise.all(
      state.tasks.map(async (task) => {
        if (task.completed) {
          await fetch(`http://localhost:7002/tasks/${task.id}`, {
            method: 'DELETE',
          });
          return null;
        }
        return task;
      })
    );
    return {
      tasks: remainingTasks.filter((task): task is Task => task !== null),
    };
  }
);

export const clearAllTasksAsync = createAsyncThunk(
  'tasks/clearAllTasksAsync',
  async (_, { getState }) => {
    const state = getState() as { tasks: Task[] };
    await Promise.all(
      state.tasks.map(async (task) => {
        await fetch(`http://localhost:7002/tasks/${task.id}`, {
          method: 'DELETE',
        });
      })
    );
    return [];
  }
);


const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (
			state,
			action: PayloadAction<{
				title: string;
				description: string;
				priority: 'Low' | 'Medium' | 'High';
			}>
		) => {
			const newTask: Task = {
				id: nanoid(),
				title: action.payload.title,
				description: action.payload.description,
				priority: action.payload.priority,
				completed: false,
			};
			state.push(newTask);
		},
		deleteTask: (state, action: PayloadAction<{ id: string }>) => {
			return state.filter((task) => task.id !== action.payload.id);
		},
		toggleTask: (state, action: PayloadAction<{ id: string; completed: boolean }>) => {
			const index = state.findIndex((task) => task.id === action.payload.id);
				state[index].completed = action.payload.completed;
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
      },
		markAllCompleted: (state) => {
		state.forEach(task => {
			task.completed = true;
		});
		},

		markAllIncomplete: (state) => {
		state.forEach(task => {
			task.completed = false;
		});
		},

		deleteCompleted: (state) => {
		return state.filter(task => !task.completed);
		},

      clearAllTasks: () => {
        return [];  // Clear all tasks
      },
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTodosAsync.fulfilled, (state, action) => {
				return action.payload.tasks;
			})
			.addCase(addTodoAsync.fulfilled, (state, action) => {
				state.push(action.payload.task);
			})
			.addCase(toggleCompleteAsync.fulfilled, (state, action) => {
				const index = state.findIndex((task) => task.id === action.payload.task.id);
				if (index > -1) {
					state[index].completed = action.payload.task.completed;
				}
			})
			.addCase(updateTaskAsync.fulfilled, (state, action) => {
				const updatedTask = action.payload.task;
				const index = state.findIndex((task) => task.id === updatedTask.id);
				if (index !== -1) {
					state[index] = updatedTask;
				}
			})
			.addCase(markAllCompletedAsync.fulfilled, (state, action) => {
				return action.payload.updatedTasks;
			})
			.addCase(markAllIncompleteAsync.fulfilled, (state, action) => {
				return action.payload.updatedTasks;
			})
			.addCase(deleteCompletedAsync.fulfilled, (state, action) => {
				return action.payload.tasks;
			})
			.addCase(clearAllTasksAsync.fulfilled, () => {
				return [];
			})
			.addCase(deleteTodoAsync.fulfilled, (state, action) => {
				return state.filter((task) => task.id !== action.payload.id);
			});
	},
});

export const { 
	addTask, 
	deleteTask, 
	toggleTask,
	updateTask,
	markAllCompleted,
	markAllIncomplete,
	deleteCompleted,
	clearAllTasks
} = taskSlice.actions;
export default taskSlice.reducer;
