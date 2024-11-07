const express = require('express');
const app = express();
const port = 8000;
const db = require('../strada_roadmap/db')
const { ObjectId } = require('mongodb');
const Task = require('./taskModel.js');
const User = require('./userModel.js');
const Project = require('./projectModel.js');
const { createTask, deleteTask, getAllTask, createSubtask, deleteSubtask } = require('./taskService.js');
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
  const userId = req.headers.authorization;
  try {
    if (!userId) {
      res.status(404).send('Error authorization')
    }
    const tasks = await getAllTask(userId);
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
    res.status(500).send('Error retrieving users');
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

app.get('/projects/:userId', async (req, res) => {
  const userId = req.params.userId;
  const authId = req.headers.authorization;
  try {
    if (userId !== authId) {
      res.status(404).send('Error authorization')
    }
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error retrieving projects');
  }
})

app.post('/tasks/:userId', async (req, res) => {
  const userId = req.params.userId;
  const authId = req.headers.authorization;
  const nameTask = req.body.name;
  const statusTask = req.body.status;
  const priorityTask = req.body.priority;
  try {
    if (userId !== authId) {
      res.status(404).send('Error authorization')
    }
    const task = await createTask({
      nameTask,
      statusTask,
      priorityTask,
      userId
    })
    res.status(201).json({message: `Task added ${nameTask}`, task});
  } catch (e) {
    console.error(e);
  }
})


app.post('/tasks/:taskId/subtasks', async (req, res) => {
  const taskId = req.params.taskId;
  const nameSubtask = req.body.name;
  try {
    if (userId !== authId) {
      res.status(404).send('Error authorization')
    }
    const task = await createSubtask(taskId, {nameSubtask});
    res.status(201).json({message: `Task added ${nameTask}`, task});
  } catch (e) {
    console.error(e);
  }
})

app.post('/users', async (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  try {
    const user = await User.create({
      name: userName,
      email: userEmail,
    })
    res.status(201).json({message: `User added ${userName}`, user});
  } catch (e) {
    console.error(e);
  }
})

app.post('/projects/:userId', async (req, res) => {
  const userId = req.params.userId;
  const authId = req.headers.authorization;
  const projectName = req.body.name;
  const descProject = req.body.description;
  try {
    if (userId !== authId) {
      res.status(404).send('Error authorization')
    }
    const project = await Project.create({
      name: projectName,
      description: descProject,
      userId: userId,
    })
    res.status(201).json({message: `Project added ${project.name}`, project})
  } catch (e) {
    console.error(e);
  }
})


app.delete('/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.headers.authorization;
  try {
    if (!userId) {
      res.status(404).send('Error authorization')
    }
    await deleteTask(taskId);
    await res.send(`Задача ${taskId} удалена`)
  } catch (e) {
    console.error(e);
  }
})

app.delete('/tasks/:taskId/subtasks/:subtasksid', async (req, res) => {
  const taskId = req.params.taskId;
  const subtaskId = req.params.subtasksid;
  try {
    await deleteSubtask(taskId, subtaskId);
    await res.send(`Задача ${taskId} удалена`)
  } catch (e) {
    console.error(e);
  }
})

app.delete('/users/', async (req, res) => {
  const userId = req.headers.authorization;
  try {
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

app.delete('/projects/:projectId/:userId', async (req, res) => {
  const userId = req.params.userId;
  const authId = req.headers.authorization;
  const projectId = req.params.projectId;
  try {
    if (userId !== authId) {
      res.status(404).send('Error authorization')
    }
    await Project.deleteOne({
      _id: new ObjectId(projectId)
    })
    await res.send(`Проект ${projectId} удален`)
  } catch (e) {
    console.error(e);
  }
})


app.put('/:taskId/edit', async (req, res) => {
  const taskId = req.params.taskId;
  const {name, status, priority, deadline} = req.body;
  const taskChanges = {name, status, priority, deadline};
  try {
      await updateTask(taskId, taskChanges);
      await res.send('Задача изменена')
  } catch (e) {
      console.error(e);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


