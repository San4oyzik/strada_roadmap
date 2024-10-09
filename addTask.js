const {STATUS, PRIORITY} = require('../strada_roadmap/all_const.js');

function Task(nameTask, priorityTask = PRIORITY.LOW){
  this.name = nameTask
  this.status = STATUS.TO_DO
  this.priority = priorityTask

    this.changeStatus = function(statusTask) {
      this.status = statusTask
    }

    this.changePriority = function(priorityTask) {
      this.priority = priorityTask;
    }
}

module.exports = Task;