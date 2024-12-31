const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

function addTask(tasks, taskId, text, priority) {
  tasks.push({ taskId, text, priority });
  return tasks;
}

function UpdatePriority(tasks, taskId, priority) {
  for(let i=0; i<tasks.length; i++) {
    if(tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

function UpdateText(tasks, taskId, text) {
  for(let i=0; i<tasks.length; i++) {
    if(tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get('/', (req, res) => {
  res.send("This is Assignment 3");
});

app.get('/tasks/add', (req,res) => {
  let taskId = parseFloat(req.query.taskId);
  let text = req.query.text;
  let priority = parseFloat(req.query.priority);
  let result = addTask(tasks, taskId, text, priority);
  res.json(result);
})

app.get('/tasks', (req,res) => {
  res.json(tasks);
})

app.get('/tasks/sort-by-priority', (req,res) => {
  let result = tasks.sort((a,b) => a.priority-b.priority);
  res.json(result);
})

app.get('/tasks/edit-priority', (req,res) => {
  let taskId = parseFloat(req.query.taskId);
  let priority = parseFloat(req.query.priority);
  let result = UpdatePriority(tasks, taskId, priority);
  res.json(result);
})

app.get('/tasks/edit-text', (req,res) => {
  let taskId = parseFloat(req.query.taskId);
  let text = (req.query.text);
  let result = UpdateText(tasks,taskId,text);
  res.json(result);
})

app.get('/tasks/delete', (req,res) => {
  let taskId = parseFloat(req.query.taskId);
  let result = tasks.filter((elem) => elem.taskId != taskId);
  res.json(result);
})

app.get('/tasks/filter-by-priority', (req,res) => {
  let priority = parseFloat(req.query.priority);
  let result = tasks.filter((elem) => elem.priority === priority);
  res.json(result);
})

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
