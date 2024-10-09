const Task = require('./taskModel.js');
const {STATUS, PRIORITY, DEADLINE_DATE} = require('./all_const.js');


const createTask = async ({nameTask, status = STATUS.TO_DO, priority = PRIORITY.LOW, userId, deadline = DEADLINE_DATE, subtasks}) => {
  return await Task.create({
    name: nameTask,
    status,
    priority,
    deadline,
    userId: new ObjectId(userId),
    subtasks,
  })
}

const deleteTask = async ({taskId}) => {
  return await Task.deleteOne({
    _id: new ObjectId(taskId)
  })
}

const updateTask = async (taskId, {name, status, priority, deadline}) => {
  return await Task.findByIdAndUpdate(
    taskId,
    {
      name,
      status, 
      priority,
      deadline
    },
    {new: true}
)
}

const getAllTask = async (userId) => {
  return await Task.find({userId});
}

const createSubtask = async (taskId, {nameSubtask, statusSubtask = STATUS.TO_DO}) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('Task not found')
  }
  task.subtasks.push({nameSubtask, statusSubtask});
  return await task.save();
}

const deleteSubtask = async (taskId, subtaskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('Task not found')
  }
  const subtaskDelete = task.subtasks.find((subtask) => subtask._id.toString() === subtaskId);
  if (!subtaskDelete) {
    throw new Error('Subtask not found')
  }
  task.subtasks.pull({ _id: subtaskId });
  task.save();
}

module.exports = {createTask, deleteTask, getAllTask, updateTask, createSubtask, deleteSubtask}