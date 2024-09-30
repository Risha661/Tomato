import "./timer";
import "./renderTomato";
import { RenderTomato } from "./renderTomato";

export const imp = ["default", "important", "so-so"];
export let count = 0;
let statusTask = "default";
export class View {
    constructor(root, controller) {
        this.root = root;
        this.controller = controller;
        this.renderTomato = new RenderTomato();
        this.renderTomato.renderTask();

        this.addButton = document.querySelector(".task-form__add-button");
        this.addButton.addEventListener("click", this.handleAddTask.bind(this));

        this.priorityBtn = document.querySelector(".button-importance");
        this.priorityBtn.addEventListener("click", this.priorityHandleBtn.bind(this));

        this.popupBtns = document.querySelectorAll(".tasks__button");
        console.log(this.popupBtns);
        this.popupBtns.forEach(btn => {
            console.log(btn);
            btn.addEventListener("click", this.activeMenuTask.bind(this));
        });

        this.deleteBtn = document.querySelector(".popup__delete-button");
        console.log(this.deleteBtn);

        this.editBtn = document.querySelector(".popup__edit-button");
        console.log(this.editBtn);

        this.data = [];
        this.tasks = [];
        this.popup = null; 

        this.body = document.querySelector("body");
        this.body.addEventListener("click", this.handleDocumentClick.bind(this));
    }

    handleAddTask(event) {
        event.preventDefault();
        this.taskInput = document.querySelector(".input-primary");
        this.taskText = this.taskInput.value;
        if (this.taskText) {
            console.log(`Задача: ${this.taskText}`);
            this.tasks.push(`Задача: ${this.taskText}, Приоритетность: ${statusTask}`);
            this.controller.addTask(this.taskText, statusTask);
            this.taskInput.value = "";
        } else {
            console.warn("Введите текст задачи.");
        }
    }

    priorityHandleBtn(event) {
        event.preventDefault();
        this.curStatus = statusTask;
        this.buttonElement = event.currentTarget;
    }

    activeMenuTask(event) {
        this.event = event;
        this.renderTomato.popupTaskMenu();
        this.popup = document.querySelector(".popup_active");
        console.log(this.popup);
    }

    handleDocumentClick(event) {
        if (this.popup && !this.popup.contains(event.target)) {
            this.closePopup(); // прописать метод закрытия closePopup в controllerTomato;
        }
    }

    closePopup() {
        if (this.popup) {
            this.popup.classList.toggle(".popup_active"); 
            this.popup.style.display = "none";
        }
    }

    deleteBtnTask() {
        this.controller.deleteTask();
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
    deleteTask(countNumber) {
        const index = this.tasks.findIndex(task => task.id === countNumber);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            this.saveTasks();
        } else {
            console.error("Задача с таким номером не найдена.");
        }
    }
}

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

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.querySelector("#root");
    const body = document.body;
    console.log(body);
    const controller = new Controller();
    controller.loadTask();
    const view = new View(rootElement, controller);
});
