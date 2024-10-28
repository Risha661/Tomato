// import "./timer";
import "./renderTomato";
import { RenderTomato } from "./renderTomato";
import { ModelTomato } from "./modeltomato";
import { Controller } from "./controller";

export const imp = ["default", "important", "so-so"];
export let count = 0;
let statusTask = "default";
let isTaskEdit = false;

// let isStart = false;
export class View {
    constructor(root, controller, modelTomato) {
        this.root = root;
        this.modelTomato = modelTomato;
        this.controller = controller;
        this.renderTomato = new RenderTomato();
        this.renderTomato.renderTask();

        this.addButton = document.querySelector(".task-form__add-button");
        this.addButton.addEventListener("click", this.handleAddTask.bind(this));

        this.priorityBtn = document.querySelector(".button-importance");
        this.priorityBtn.addEventListener("click", this.priorityHandleBtn.bind(this));

        this.panelTitle = document.querySelector(".window__panel-title");
        this.panelTitle.textContent = "Выберите задачу";
        this.indexPanel = document.querySelector(".window__panel-task-text");
        this.indexPanel.textContent = "№ задачи";

        this.activeBtnTask = document.querySelectorAll(".tasks__text");
        this.activeBtnTask.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                this.activeTimerBtn(index);
            });
        });

        this.startBtn = document.querySelector(".button-primary");
        this.stopBtn = document.querySelector(".button-secondary");
        this.stopBtn.style.display = "none";

        this.stopBtn.onclick = () => {
            this.getViewStop();
            clearInterval(this.modelTomato.intervalId);
            this.isRunning = false;
            this.stopBtn.style.display = "none";
            this.remainingTime = this.modelTomato.getCounter();
            this.isActiveTask = false;
            if(this.startBtn) {
                this.startBtn.onclick = () => {
                    this.isActiveTask = false;
                    const time = this.getLocalTime();
                    this.modelTomato.startTimer(time, true, "Рабочая сессия:");
                };
            }
        };

        this.popupBtns = document.querySelectorAll(".tasks__button");
        this.popupBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                this.activeMenuTask(index);
            });
        });        

        this.body = document.querySelector("body");
        this.body.addEventListener("click", this.handleClickOutsidePopup.bind(this));

        this.data = [];
        this.tasks = [];
        this.deleteBtn = null;
        this.editBtn = null;
        this.timerInterval = null;
        this.isRunning = false;
        this.isActiveTask = false; 
    }

    activeTimerBtn(index) {
        this.isActiveTask = true; 
        this.tasks = this.controller.loadTask();
        const task = this.tasks[index];
        const taskText = task.text;
        const id = task.id;
        this.renderTomato.renderWindow(taskText, index);
        this.startBtn.onclick = () => {
            this.startTimerGo(id, task);
        };
        this.isActiveTask = false; 
    }

    startTimerGo(id, task) {
        this.modelTomato.addTask(task);
        this.modelTomato.activateTask(id);
        this.startTimerTask();
    }

    startTimerTask() {
        this.modelTomato.startTimer(this.modelTomato.workTime, true, "Рабочая сессия:");
    }

    stopByTask() {
        this.stopBtn.onclick = () => {
            this.id = this.modelTomato.activeTask.id;
            this.tasks = this.controller.loadTask(this.id);
            for(this.i = 0; this.i < this.tasks.length; this.i++){
                if (this.tasks[this.i].id === this.id){
                    this.tasks[this.i].time = this.modelTomato.getTime();
                    console.log(this.tasks[this.i].time);
                    this.tasks[this.i].counter = this.modelTomato.getCounter();
                    this.tasks[this.i].flag = this.isRunning;
                    break;
                } 
            }
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
    
            clearInterval(this.timerInterval);
            this.isRunning = false;
            this.stopBtn.style.display = "none";
            this.modelTomato.remainingTime = this.modelTomato.getCounter(); 
        };
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
        this.taskTime = this.modelTomato.workTime;
        this.runningFlag = this.isRunning;
        this.counter = this.modelTomato.getCounter();
    
        if (this.taskText) {
            if (!isTaskEdit) {
                this.tasks.push({ 
                    text: this.taskText, 
                    priority: statusTask,
                    time: this.taskTime,
                    counter: this.counter,
                    flag: this.runningFlag,
                });
                this.controller.addTask(this.taskText, statusTask, this.taskTime, this.counter, this.runningFlag);
                this.renderTomato.renderTask();
            } else {
                this.indexOld = this.controller.currentEditIndex;
                this.tasks = this.controller.loadTask();
                
                if (this.indexOld >= 0 && this.indexOld < this.tasks.length) {
                    this.tasks[this.indexOld] = {
                        text: this.taskText,
                        status: statusTask,
                    };
                    localStorage.setItem("tasks", JSON.stringify(this.tasks));
                    this.renderTomato.renderTask();
                    this.renderTomato.redAddBtn();
                } else {
                    console.error("Индекс редактирования вне диапазона");
                    return; 
                }
            }
            this.taskInput.value = "";
        } else {
            console.warn("Введите текст задачи.");
        }
    }

    getLocalTime() {
        this.id = this.modelTomato.activeTask.id;
        this.tasks = this.controller.loadTask(this.id);
        return this.nowTime = this.tasks[this.i].time;
    }

    getViewStop() {
        this.id = this.modelTomato.activeTask.id;
        this.tasks = this.controller.loadTask(this.id);
        for(this.i = 0; this.i < this.tasks.length; this.i++){
            if (this.tasks[this.i].id === this.id){
                this.tasks[this.i].time = this.modelTomato.getTime();
                this.tasks[this.i].counter = this.modelTomato.getCounter();
                this.tasks[this.i].flag = this.modelTomato.isRunning;
                break;
            } 
        }
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
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
    
        const countNumberRow = document.querySelectorAll(".count-number")[index];
        
        if (countNumberRow) {
            const tabIndex = parseInt(countNumberRow.textContent) - 1;
    
            if (this.deleteBtn) {
                this.deleteBtn.addEventListener("click", () => {
                    this.controller.deleteTask(tabIndex);
                    this.closePopup();
                    this.renderTomato.renderTask();
                });
            }
    
            this.editBtn = document.querySelector(".popup__edit-button");
    
            if (this.editBtn) {
                this.editBtn.addEventListener("click", () => {
                    isTaskEdit = true;
                    this.controller.editTask(tabIndex);
                    this.closePopup();
                    this.renderTomato.greenEditBtn();
                    this.renderTomato.renderTask();
                });
            }
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

export const start = document.addEventListener("DOMContentLoaded", () => {
    const controller = new Controller();
    controller.loadTask();
    const modelTomato = new ModelTomato({}, view, controller);
    const view = new View(rootElement, controller, modelTomato);

    const rootElement = document.querySelector("#root");
    const body = document.body;
});
