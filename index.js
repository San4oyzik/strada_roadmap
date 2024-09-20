const express = require('express');
const app = express();
const port = 8000;
const db = require('../strada_roadmap/db')
const service = require('../strada_roadmap/service')
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/tasks', (req, res) => {
  // res.send(showList());
  res.send(service.showList())
})

app.post('/tasks', async (req, res) => {
  try {
    const {name, status = 'to do', priority = 'low' } = req.body;
    const task = {name, status, priority}
    await db.getDB().collection('tasks').insertOne(task)
    res.send(`Task added ${name}`);
  } catch (e) {
    console.error(e);
  }
})

app.delete('/tasks', (req, res) => {
  const {name} = req.body;
  if (name) {
    const isDeleted = service.deleteTask(name);
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
    const isChanged = service.changeStatus(name, status);
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


