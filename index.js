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
    const userId = req.headers.authorization;
    if (!userId) {
      res.status(404).send('Error authorization')
    }
    const tasks = await Task.find({userId});
    res.status(200).json(tasks)
  } catch (e) {
    console.error(e);
    res.status(500).send('Error retrieving tasks');
  }
})

app.get('/users', async (req, res) => {
  try {
    const tasks = await User.find({});
    res.status(200).json(tasks)
  } catch (e) {
    console.error(e);
    res.status(500).send('Error retrieving tasks');
  }
})

app.get('/tasks/:taskId', async (req, res) => {
  try {
    const userId = req.headers.authorization;
    if (!userId) {
      res.status(404).send('Error authorization')
    }
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
  const userId = req.params.userId;
  const authId = req.headers.authorization;
  try {
    if (userId !== authId) {
      res.status(404).send('Error authorization')
    }
    const nameTask = req.body.name;
    const statusTask = req.body.status;
    const priorityTask = req.body.priority;
    const task = await Task.create({
      name: nameTask,
      status: statusTask,
      priority: priorityTask,
      userId: new ObjectId(userId)
    })
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
    const userId = req.headers.authorization;
    if (!userId) {
      res.status(404).send('Error authorization')
    }
    const taskId = req.params.taskId;
    await Task.deleteOne({
      _id: new ObjectId(taskId)
    })
    await res.send(`Задача ${taskId} удалена`)
  } catch (e) {
    console.error(e);
  }
})

app.delete('/users/', async (req, res) => {
  try {
    const userId = req.headers.authorization;
    if (!userId) {
      res.status(404).send('Error authorization')
    }
    await User.deleteOne({
      _id: new ObjectId(userId)
    })
    await res.send(`Пользователь ${userId} удалена`)
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


