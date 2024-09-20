import {View} from "./render";

export class Controller {
  constructor(model, view) {
    this.task = this.loadTask();
  }

  loadTask() {
    const taskJson = localStorage.getItem("tasks");
    return taskJson ? JSON.parse(tasksJson) : [];
  }

  saveTask() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks)); // запись новых задач в локал
  }

  addTask(taskText, statusTask) {
    const newTask = {text: taskText, status: statusTask}; // добавление новых задач из класса View
    this.tasks.push(newTask);
    this.saveTask();
  }
}

const controller = new Controller();
controller.loadTask();
console.log(controller.loadTask());

//проверить чуть позже так как не установлены зависимости и пакеты npm