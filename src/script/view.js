import "./timer";
import "./renderTomato";

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
    }

    handleAddTask(event) {
        event.preventDefault();
        this.taskInput = document.querySelector(".input-primary");
        this.taskText = this.taskInput.value;
        if (this.taskText) {
            console.log(`Задача: ${this.taskText}`);
            this.tasks.push(`Задача: ${this.taskText}, Приоритетность: ${statusTask}`);
            console.log(this.tasks);
            this.controller.addTask(this.taskText, statusTask);
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
        localStorage.setItem("tasks", JSON.stringify(this.tasks)); 
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