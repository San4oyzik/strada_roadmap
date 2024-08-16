const list = {
  tasks: {
    'new task' : 'In progress',
    'second task': 'To Do',
    'eat kasha': 'Done',
  },
  addTask: (nameTask, statusTask) => {
    list.tasks[nameTask] = statusTask
  },
  deleteTask: (nameTask) => {
    delete list.tasks[nameTask]
  },
  changeStatus: (nameTask, statusTask) => {
    if (nameTask in list.tasks) {
      list.tasks[nameTask] = statusTask;
    }
  },
  showList: () => {
    for (const name in list.tasks) {
      console.log(name + ': ' + list.tasks[name]);
    }    
  }
};

list.showList();
list.addTask('new open task', 'To do');
list.addTask('drink water', 'Done');
console.log('add----------');
list.showList();
list.deleteTask('new task');
console.log('del----------');
list.showList();
list.changeStatus('second task', 'Done');
list.changeStatus('new task', 'Todo');
console.log('change----------');
list.showList();