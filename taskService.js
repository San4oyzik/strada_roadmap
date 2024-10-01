const Task = require('./taskModel.js');
const User = require('./userModel.js');
const {STATUS, PRIORITY, DEADLINE, DEADLINE_DATE} = require('./all_const.js');


const createTask = ({nameTask, status = STATUS.TO_DO, priority = PRIORITY.LOW, userId}) => {
  return Task.create({
    name: nameTask,
    status,
    priority,
    deadline: DEADLINE_DATE,
    userId: new ObjectId(userId)
  })
}

const deleteTask = ({taskId}) => {
  return Task.deleteOne({
    _id: new ObjectId(taskId)
  })
}

const updateTask = (taskId, {name, status, priority, deadline}) => {
  return Task.findByIdAndUpdate(
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

const getAllTask = (userId) => {
  return Task.find({userId});
}

module.exports = {createTask, deleteTask, getAllTask, updateTask}