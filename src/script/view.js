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
        this.activeBtnTask.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                console.log(btn + index);
                this.activeTimerBtn(index);
            });
            
        });

        //перекинуть в textContent в шапку название задачи
        this.startBtn = document.querySelector(".button-primary");
        console.log(this.startBtn);
        this.startBtn.addEventListener("click", this.activeTimerBtn.bind(this));
        this.popupBtns = document.querySelectorAll(".tasks__button");

        this.popupBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                this.activeMenuTask(index); // Передаем индекс, строки, где сработала кнопка
            });
        });        

        this.body = document.querySelector("body");
        this.body.addEventListener("click", this.handleClickOutsidePopup.bind(this));

        this.data = [];
        this.tasks = [];
        this.deleteBtn = null;
        this.editBtn = null;
        
    }

    editTaskTimer() {}

    activeTimerBtn(index) {
        this.tasks = this.controller.loadTask();
        const task = this.tasks[index];
        const taskText = task.text;
        console.log("текст задачи" + taskText);
        this.renderTomato.renderWindow(taskText, index);
       

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
        if (this.popupMenu && this.popupMenu.classList.contains("popup_active")) {
            this.popupMenu.classList.remove("popup_active");
            this.body.removeEventListener("click", this.handleClickOutsidePopupBound);
            this.popupMenu = null;
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

    activeMenuTask(index) {
        this.renderTomato.popupTaskMenu();
        this.popup = document.querySelector(".popup_active");
        
        this.popupBtn = event.currentTarget;
        this.deleteBtn = document.querySelector(".popup__delete-button");
    
        const countNumberRow = document.querySelectorAll(".count-number")[index]; // Получаем строку по индексу, чтобы понимать, с чем мы работаем
        
        if (countNumberRow) {
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
                    this.renderTomato.renderTask();
                });
            }
        }
    }
}
export class Controller {
    constructor(view) {
        this.view = view;
        this.tasks = this.loadTask();
        this.editPlacehoderInput = document.querySelector(".input-primary");
        this.editStatusBtn = document.querySelector(".button-importance");
        console.log(this.editPlacehoderInput);
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
            const task = this.tasks[index];
            this.taskStatus = task.status;
            const taskText = task.text;
            this.editPlacehoderInput.value = taskText;
    
            this.editStatusBtn.textContent = this.updateStatusButton();
            this.currentEditIndex = index;
            this.saveTask();
        } else {
            console.error("Задача с данным индексом не найдена.");
        }
    }
    
    updateStatusButton() {
        if (!this.editStatusBtn) {
            console.error("editStatusBtn is not initialized");
            return;
        }
    
        this.editStatusBtn.classList.remove('important', 'so-so', 'default');
        if (this.taskStatus === "important") {
            this.editStatusBtn.classList.add("important");
        } else if (this.taskStatus === "so-so") {
            this.editStatusBtn.classList.add("so-so");
        } else {
            this.editStatusBtn.classList.add("default");
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
});

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.querySelector("#root");
    const body = document.body;
    const controller = new Controller();
    controller.loadTask();
    const view = new View(rootElement, controller);
});
