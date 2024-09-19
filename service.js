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

module.exports = {addTask, deleteTask, changeStatus, showList, list}