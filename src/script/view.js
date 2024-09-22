import "./timer";
<<<<<<< HEAD
// import { Controller } from "./controller";
=======
import {Controller} from "./controller";
>>>>>>> 96a54809b0e287e74996646893781a2b4a7bfff1

export const imp = ["default", "important", "so-so"];
export let count = 0;
let statusTask = "default";
export class View {
    constructor(root, controller) {
        this.root = root;
        this.controller = controller;

        this.addButton = document.querySelector(".task-form__add-button");
        console.log(this.addButton);
        this.addButton.addEventListener("click", this.handleAddTask.bind(this));

        this.priorityBtn = document.querySelector(".button-importance");
        console.log(this.priorityBtn);
        this.priorityBtn.addEventListener("click", this.priorityHandleBtn.bind(this));

        this.data = [];
        this.tasks = [];
        console.log(this.tasks);


    }

    handleAddTask(event) {
        event.preventDefault();
        this.taskInput = document.querySelector(".input-primary");
        this.taskText = this.taskInput.value;
        if (this.taskText) {
            console.log(`Задача: ${this.taskText}`);
            this.tasks.push(`Задача: ${this.taskText}, Приоритетность: ${statusTask}`);
            console.log(this.tasks);
<<<<<<< HEAD
            this.controller.addTask(this.taskText, statusTask);// внедряем в хранение localStorage данные
=======
            this.controller.addTask(this.taskText, this.statusTask);// внедряем в хранение localStorage данные
>>>>>>> 96a54809b0e287e74996646893781a2b4a7bfff1
            this.taskInput.value = "";
        } else {
            ("Введите текст задачи.");
        }
    }

    priorityHandleBtn(event) {
        event.preventDefault();
        this.curStatus = statusTask;
        this.buttonElement = event.currentTarget;
    }
}

<<<<<<< HEAD
export class Controller {
    constructor(view) {
        this.view = view;
        this.tasks = this.loadTask();
    }
    loadTask() {
        const taskJson = localStorage.getItem("tasks");
        return taskJson ? JSON.parse(taskJson) : [];
    }
    saveTask() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks)); // запись новых задач в локал
    }
    addTask(taskText, statusTask) {
        const newTask = {text: taskText, status: statusTask};
        if (!this.tasks) {
            this.tasks = [];
        }
        this.tasks.push(newTask);
        this.saveTask();
    }
}

const controller = new Controller();
controller.loadTask();
console.log(controller.loadTask());
=======
>>>>>>> 96a54809b0e287e74996646893781a2b4a7bfff1
const view = new View(document.getElementById("app"), controller);

document.querySelector(".button-importance").addEventListener("click", ({target}) => {
    count += 1;
    if (count >= imp.length) {
        count = 0;
    }

    for (let i = 0; i < imp.length; i++) {
        if (count === i) {
            target.classList.add(imp[i]);
            statusTask = imp[i];
            
        } else {
            target.classList.remove(imp[i]);
        }
    }
    console.log(`Статус важности: ${statusTask}`);
});


