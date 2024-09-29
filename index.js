const express = require('express');
const app = express();
const port = 8000;
const db = require('../strada_roadmap/db')
// const service = require('../strada_roadmap/service');
const { ObjectId } = require('mongodb');
const Task = require('./taskModel.js')
// const Task = require('./addTask.js');
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '<http://localhost:3000>');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', (req, res) => {
  res.send('server is running')
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await db.getDB().collection('tasks').find({}).toArray();
    res.status(200).json(tasks)
  } catch (e) {
    console.error(e);
    res.status(500).send('Error retrieving tasks');
  }
})

app.post('/tasks', async (req, res) => {
  try {
    const nameTask = req.body.name;
    const statusTask = req.body.status;
    const priorityTask = req.body.priority;
    const task = await Task.create({
      name: nameTask,
      status: statusTask,
      priority: priorityTask,
    })
    // const task = new Task(nameTask, priorityTask);
    // await db.getDB().collection('tasks').insertOne(task)
    res.status(201).json({message: `Task added ${nameTask}`, task});
  } catch (e) {
    console.error(e);
  }
})

app.delete('/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    await db.getDB().collection('tasks').deleteOne({
      _id: new ObjectId(taskId)
    })
    await res.send(`задача ${taskId} удалена`)
  } catch (e) {
    console.error(e);
  }
})

app.put('/tasks/:taskId/status/:statusTask', async (req, res) => {
  try {
      const taskId = req.params.taskId;
      // const nameTask = req.params.name;
      const statusTask = req.params.statusTask;
      await db.getDB().collection("tasks").updateOne(
          {_id: new ObjectId(taskId)},
          {$set: {status: statusTask}}
      )
      await res.send(`Задача ${taskId} изменена! Статус изменен на ${statusTask}!`)
  } catch (e) {
      console.error(e);
  }
})

app.put('/tasks/:taskId/priority/:priorityTask', async (req, res) => {
  try {
      const taskId = req.params.taskId;
      // const nameTask = req.params.name;
      const priorityTask = req.params.priorityTask;
      await db.getDB().collection("tasks").updateOne(
          {_id: new ObjectId(taskId)},
          {$set: {priority: priorityTask}}
      )
      await res.send(`Задача ${taskId} изменена! Приоритет изменен на ${priorityTask}!`)
  } catch (e) {
      console.error(e);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


