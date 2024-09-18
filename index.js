const express = require('express');
const app = express();
const port = 8000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/tasks', (req, res) => {
  res.send(showList());
})

app.post('/tasks', (req, res) => {
  const {name, status = 'to do', priority = 'low' } = req.body;
  addTask(name, status, priority)
  res.send(`Task added ${name}`);
})

app.delete('/tasks', (req, res) => {
  const {name} = req.body;
  if (name) {
    const isDeleted = deleteTask(name);
    if (isDeleted){
      res.send(`Task deleted ${name}`)
    } else 
      res.status(404).send('Task not found');
  } else {
    res.status(400).send('Task name is required');
  }
})

app.put('/tasks/', (req, res) => {
  const {name, status } = req.body;
  if (name) {
    const isChanged = changeStatus(name, status);
    if (isChanged) {
      res.send(`Task was changed ${name} for status: ${status}`);
    } else {
      res.status(404).send('Task not found');
    }
  } else {
    res.status(400).send('Task name is required');
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

const list = [
  {name: 'first task', status: 'in progress', priority: 'low'},
  {name: 'second task', status: 'to do', priority: 'high'},

]

const addTask = (nameTask, statusTask = 'to do', priorityTask = 'low') => {
  list.push({name : nameTask, status : statusTask, priority : priorityTask});
}

const deleteTask = (nameTask) => {
  const indexDeletedTask = list.findIndex(task => task.name === nameTask);
  if (indexDeletedTask !== 1) {
    list.splice(indexDeletedTask, 1);
    return true
  } else {
    return false
  }
}

const changeStatus = (nameTask, statusTask) => {
  const findTask = list.find(task => task.name === nameTask);
  if (findTask) {
    findTask.status = statusTask;
    return true
  } else {
    return false
  }
}

const showList = () => {
  return list;
}

