// import "./timer";
import "./renderTomato";
import { RenderTomato } from "./renderTomato";
import { ModelTomato } from "./model";
import { Controller } from "./controller";

export const imp = ["default", "important", "so-so"];
export let count = 0;
let statusTask = "default";
let isTaskEdit = false;
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
    }

    activeTimerBtn(index) {
        this.tasks = this.controller.loadTask();
        const task = this.tasks[index];
        const taskText = task.text;
        const id = task.id;
        this.renderTomato.renderWindow(taskText, index);
        this.startBtn.onclick = () => {
            this.startTimerGo(id, task);
        };
    }

    startTimerGo(id, task) {
        this.modelTomato.addTask(task);
        this.modelTomato.activateTask(id);
        this.startTimerDisplay();
    }

    startTimerDisplay() {
        const timerDisplay = document.querySelector(".window__timer-text");
        let remainingTime = this.modelTomato.workTime;
        const timerTitle = document.createElement("h1");
        timerTitle.style.fontSize = "28px";
        timerTitle.style.textAlign = "center";
        timerTitle.textContent = "Рабочая сессия";
        timerTitle.style.color = "#333333";
        timerDisplay.parentNode.insertBefore(timerTitle, timerDisplay);

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60000);
            const seconds = Math.floor((time % 60000) / 1000);
            return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        };

        const updateTimer = () => {
            timerDisplay.textContent = formatTime(remainingTime);
            if (remainingTime <= 0) {
                clearInterval(this.timerInterval);
                timerDisplay.style.fontSize = "28px";
                timerDisplay.style.textAlign = "center";
                this.isRunning = false;
                this.modelTomato.startBreak();
                console.log(`Задача "${this.modelTomato.activeTask.text}" завершена!`);
                if (timerTitle) {
                    timerTitle.remove();
                }
                this.modelTomato.increaseCounter(this.modelTomato.activeTask.id);
            } else {
                remainingTime -= 1000;
            }
        };
    
        updateTimer();
    
        if (!this.isRunning) {
            this.isRunning = true;
            this.stopBtn.style.display = "block";
    
            this.timerInterval = setInterval(updateTimer, 1000);
    
            this.stopBtn.onclick = () => {
                clearInterval(this.timerInterval);
                this.isRunning = false;
                this.stopBtn.style.display = "none";
                this.modelTomato.remainingTime = remainingTime; 
            };
    
            this.startBtn.onclick = () => {
                if (!this.isRunning) {
                    remainingTime = this.modelTomato.remainingTime;
                    this.startTimerDisplay();
                    if (timerTitle) {
                        timerTitle.remove();
                    }
                }
            };
        }
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
            if (!isTaskEdit) {
                this.tasks.push({ text: this.taskText, priority: statusTask });
                this.controller.addTask(this.taskText, statusTask);
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

document.addEventListener("DOMContentLoaded", () => {
    const modelTomato = new ModelTomato();
    const rootElement = document.querySelector("#root");
    const body = document.body;
    const controller = new Controller();
    controller.loadTask();
    const view = new View(rootElement, controller, modelTomato);
});
