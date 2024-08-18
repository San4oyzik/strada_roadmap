const list = [
  {name: 'first task', status: 'in progress', priority: 'low'},
  {name: 'second task', status: 'to do', priority: 'high'},

]

const addTask = (nameTask, statusTask = 'to do', priorityTask = 'low') => {
  list.push({name : nameTask, status : statusTask, priority : priorityTask});
}

const deleteTask = (nameTask) => {
  const indexDeletedTask = list.findIndex(task => task.name === nameTask);
  list.splice(indexDeletedTask, 1);
}

const changeStatus = (nameTask, statusTask) => {
  const findTask = list.find(task => task.name === nameTask);
  if (findTask) {
    findTask.status = statusTask;
  } else {
    console.log('Задача не найдена!');
  }
}

const showList = () => {
  for (const task of list) {
    console.log(`Задача: ${task.name}, статус: ${task.status}, приоритет: ${task.priority}`);
  }
}

addTask('eat kasha');
addTask('drink water', 'in progress');
deleteTask('second task');
changeStatus('eat kasha', 'done');
changeStatus('second task', 'done');

showList();
