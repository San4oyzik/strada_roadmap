import tasksFromJson from './tasks.json' with { type: "json" };

const list = tasksFromJson.tasks;

const addTask = (nameTask, statusTask = 'to do', priorityTask = 'low') => {
  try {
    if (nameTask.length < 3 || nameTask.length > 30) {
      throw new Error('Ошибка: имя задачи должно быть не менее 3 и не более 30 символов!')
    }
    list.push({name : nameTask, status : statusTask, priority : priorityTask});
  } catch (error) {
      console.log(error.message);
  }

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


addTask('aa')
addTask('eat kasha');
addTask('drink water', 'in progress');
deleteTask('second task');
changeStatus('eat kasha', 'done');
changeStatus('second task', 'done');

showList();