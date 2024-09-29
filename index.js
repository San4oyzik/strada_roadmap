const express = require('express');
const app = express();
const port = 8000;
const db = require('../strada_roadmap/db')
const { ObjectId } = require('mongodb');
const Task = require('./taskModel.js');
const User = require('./userModel.js');
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
    const tasks = await Task.find({});
    // const tasks = await db.getDB().collection('tasks').find({}).toArray();
    res.status(200).json(tasks)
  } catch (e) {
    console.error(e);
    res.status(500).send('Error retrieving tasks');
  }
})

app.get('/users', async (req, res) => {
  try {
    const tasks = await User.find({});
    // const tasks = await db.getDB().collection('tasks').find({}).toArray();
    res.status(200).json(tasks)
  } catch (e) {
    console.error(e);
    res.status(500).send('Error retrieving tasks');
  }
})

app.get('/tasks/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    const user = await User.findById(task.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const taskWithUser = {
      ...task.toObject(),
      user,
    };
    delete taskWithUser.userId;
    res.status(200).json(taskWithUser);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error retrieving tasks');
  }
})

app.post('/tasks/:userId', async (req, res) => {
  try {
    const nameTask = req.body.name;
    const statusTask = req.body.status;
    const priorityTask = req.body.priority;
    const userId = req.params.userId;
    const task = await Task.create({
      name: nameTask,
      status: statusTask,
      priority: priorityTask,
      userId: new ObjectId(userId)
    })
    // const task = new Task(nameTask, priorityTask);
    // await db.getDB().collection('tasks').insertOne(task)
    res.status(201).json({message: `Task added ${nameTask}`, task});
  } catch (e) {
    console.error(e);
  }
})

app.post('/users', async (req, res) => {
  try {
    const userName = req.body.name;
    const userEmail = req.body.email;
    const user = await User.create({
      name: userName,
      email: userEmail,
    })
    res.status(201).json({message: `User added ${userName}`, user});
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


