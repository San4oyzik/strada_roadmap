const toDoList = ['first task', 'second task', 'eat kasha']

const addTask = (nameTask) => {
  toDoList.push(nameTask);
}

const deleteTask = () => {
  toDoList.pop()
}

const showList = () => {
  for (const task of toDoList) {
    console.log(task);
  }
}


addTask('new task');
showList();
deleteTask();
showList();