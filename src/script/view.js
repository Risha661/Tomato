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
        // this.popup = null; 

        this.addButton = document.querySelector(".task-form__add-button");
        this.addButton.addEventListener("click", this.handleAddTask.bind(this));

        this.priorityBtn = document.querySelector(".button-importance");
        this.priorityBtn.addEventListener("click", this.priorityHandleBtn.bind(this));

        this.activeBtnTask = document.querySelectorAll(".tasks__text");
        console.log(this.activeBtnTask);
        this.activeBtnTask.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                console.log('Кнопка с индексом:', index);
                // Здесь вы можете вызвать вашу функцию и передать индекс
                this.activeMenuTask.bind(this);
            });
        });

        //перекинуть в textContent в шапку название задачи

        this.startBtn = document.querySelector(".button-primary");
        console.log(this.startBtn);
        this.startBtn.addEventListener("click", this.activeTimerBtn.bind(this));

        this.popupBtns = document.querySelectorAll(".tasks__button");
        console.log(this.popupBtns);
        this.popupBtns.forEach(btn => {
            console.log(btn);
            btn.addEventListener("click", this.activeMenuTask.bind(this));
        });

        this.body = document.querySelector("body");
        this.body.addEventListener("click", this.handleClickOutsidePopup.bind(this));

        this.data = [];
        this.tasks = [];
        this.deleteBtn = null;
        this.editBtn = null;
        
    }

    activeTimerBtn() {
        //запуск счетчика каким-то образом, ага
    }

    handleClickOutsidePopup(event) {
        const isClickInside = (this.popupMenu && this.popupMenu.contains(event.target)) || 
            (this.popupBtn && this.popupBtn.contains(event.target));
        
        if (!isClickInside) {
            this.closePopup();
        }
    }
    
    closePopup() {
        if (this.popupMenu) {
            this.popupMenu.remove();
            this.popupMenu = null;
            this.body.removeEventListener("click", this.handleClickOutsidePopup.bind(this));
        }
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
        this.popupMenu = this.popup;
        this.popupBtn = event.currentTarget;
        this.deleteBtn = document.querySelector(".popup__delete-button");

        const countNumberRow = document.querySelector(".count-number"); // как получить строку по которой был клик? почему все время попал на первую задачу?
        console.log(countNumberRow);
        const tabIndex = parseInt(countNumberRow.textContent) - 1;
        console.log(tabIndex + " tabindex localstorage");
        
        if (this.deleteBtn) {
            this.deleteBtn.addEventListener("click", () => {
                this.controller.deleteTask(tabIndex);
                this.closePopup();
                this.renderTomato.renderTask();
            });
        }

        this.editBtn = document.querySelector(".popup__edit-button");
        console.log(this.editBtn);

        if (this.editBtn) {
            this.editBtn.addEventListener("click", () => {
                this.controller.editTask(tabIndex);
                this.closePopup();
                // this.renderTomato.renderTask();
            });
        }
    }
}
export class Controller {
    constructor(view) {
        this.view = view;
        this.tasks = this.loadTask();
    }

    generateId() {
        return Math.floor(Math.random() * 9000) + 1000;
    }
    loadTask() {
        const taskJson = localStorage.getItem("tasks");
        return taskJson ? JSON.parse(taskJson) : [];
    }
    saveTask() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks)); 
    }
    addTask(taskText, statusTask) {
        const newTask = {text: taskText, status: statusTask, id: this.generateId()};
        if (!this.tasks) {
            this.tasks = [];
        }
        this.tasks.push(newTask);
        this.saveTask();
    }
    deleteTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
            this.saveTask();
        } else {
            console.error("Задача с данным индексом не найдена.");
        }
    }

    editTask(index) {
        if (index >= 0 && index < this.tasks.length) {

        // this.saveTask();
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
