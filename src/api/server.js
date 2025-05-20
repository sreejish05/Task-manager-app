const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

let tasks = [
	{
		id: nanoid(),
		title: 'task 1',
		description: 'This is task 1',
		priority: 'Low',
		completed: true,
	},
	{
		id: nanoid(),
		title: 'task 2',
		description: 'This is task 2',
		priority: 'Medium',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'task 3',
		description: 'This is task 3',
		priority: 'High',
		completed: false,
	},
];

app.get('/tasks', (req, res) => res.send(tasks));   //get all tasks

app.post('/tasks', (req, res) => {
	const { title, description, priority } = req.body;
	const task = {
		id: nanoid(),
		title,
		description,
		priority,
		completed: false,
	};
	tasks.push(task);
	return res.send(task);
});

app.patch('/tasks/:id', (req, res) => {
	const id = req.params.id;
	const index = tasks.findIndex((task) => task.id === id);
	if (index > -1) {
		if (typeof req.body.completed === 'boolean') {
			tasks[index].completed = req.body.completed;
		}
	}
	return res.send(tasks[index]);
});

app.delete('/tasks/:id', (req, res) => {
	const id = req.params.id;
	const index = tasks.findIndex((task) => task.id === id);
	if (index > -1) {
		tasks.splice(index, 1);
	}
	res.send({ success: true });
});
const PORT = 7002;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
