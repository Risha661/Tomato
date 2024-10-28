// import "./timer";
import { Controller } from "./controller";
import "./controller";
import { View } from "./view";
import "./view";


let isWork = false;
let timeExcept = 0;

export class ModelTomato {
    static instance = null;
    constructor({ workTime = 25, shortBreakTime = 5, longBreakTime = 15, tasks = [] } = {}, view, controller) {
        if (ModelTomato.instance) {
            return ModelTomato.instance;
        }
        this.breakTime = 0;
        this.view = view;
        console.log(this.view);
        this.controller = controller;
        this.workTime = workTime * 60 * 1000;
        this.shortBreakTime = shortBreakTime * 60 * 1000;
        this.longBreakTime = longBreakTime * 60 * 1000;
        this.tasks = tasks;
        this.activeTask = null;
        this.counter = 1;
        this.isRunning = false;
        this.startBtn = document.querySelector(".button-primary");
        this.stopBtnTimer = document.querySelector(".button-secondary");
        this.intervalId = 0;
        

        this.startBtn = document.querySelector(".button-primary");
        this.stopBtn = document.querySelector(".button-secondary");
        this.stopBtn.style.display = "none";
        
        ModelTomato.instance = this;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    activateTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.activeTask = task;
            console.log(`Активирована задача: ${task.text}`);
        } else {
            console.error(`Задача с id ${id} не найдена`);
        }
    }

    getCounter() {
        return this.counter;
    }

    setTimeTask() {
        this.id = this.activeTask.id;
        this.tasks = this.controller.loadTask(this.id);
        for(this.i = 0; this.i < this.tasks.length; this.i++){
            if (this.tasks[this.i].id === this.id){
                this.tasks[this.i].time = this.remainingTime;
                this.tasks[this.i].counter = this.getCounter();
                this.tasks[this.i].flag = this.isRunning;
                break;
            } 
        }
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    getTimeTask() {
        this.time = this.activeTask.time;
        console.log(this.time);
        this.tasks = this.controller.loadTask(this.id);
        this.remainingTime = this.time;
    }
    

    increaseCounter(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            console.log(`Счётчик для задачи "${task.text}": ${this.counter}`);
            this.counter++;
        }
        return this.counter;
    }

    getTime() {
        return timeExcept;
    }

    startTimer(time, isWork, titleText) {  
        console.log(isWork);
        const existingTitle = document.querySelector(".timer-title");
        if (existingTitle) {
            existingTitle.remove();
        }
        const timerTitle = document.createElement("h1");
        timerTitle.className = "timer-title";
        timerTitle.style.fontSize = "28px";
        timerTitle.style.textAlign = "center";
        timerTitle.textContent = titleText;
        timerTitle.style.color = "#333333";
    
        const timerDisplay = document.querySelector(".window__timer-text");
        timerDisplay.style.fontSize = "150px";
        timerDisplay.style.textAlign = "center";
        timerDisplay.parentNode.insertBefore(timerTitle, timerDisplay);
        let remainingTime = time;
    
        this.intervalId = setInterval(() => {
            remainingTime -= 1000;
            timeExcept = remainingTime;
            this.stopBtnTimer.style.display = "none";
    
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    
            if (isWork === true) {
                this.stopBtn.style.display = "block";

                if (remainingTime <= 0) {
                    clearInterval( this.intervalId);
                    timerDisplay.style.fontSize = "28px";
                    timerDisplay.style.textAlign = "center";
                    this.isRunning = false;
                    this.startBreak();
                    console.log(`Задача "${this.activeTask.text}" завершена!`);
                    if (timerTitle) {
                        timerTitle.remove();
                    }
                    this.increaseCounter(this.activeTask.id);
                    this.id = this.activeTask.id;
                    this.tasks = this.controller.loadTask(this.id);
                    for(this.i = 0; this.i < this.tasks.length; this.i++){
                        if (this.tasks[this.i].id === this.id){
                            this.tasks[this.i].time = this.workTime;
                            break;
                        } 
                    }
                    localStorage.setItem("tasks", JSON.stringify(this.tasks));
                }
            } else {
                if (remainingTime <= 0) {
                    timerTitle.style.display = "none";
                    clearInterval(this.intervalId);
                    this.stopBtnTimer.style.display = "block";
                }
            }
        }, 2);
    }

    shortBreakPause() {
        this.startTimer(this.shortBreakTime, false,"Короткий перерыв:");
    }

    longBreakPause() {
        this.startTimer(this.longBreakTime, false, "Длинный перерыв:");
    }

    startBreak() {
        this.breakTime = (this.counter % 4 === 0) ? this.longBreakTime : this.shortBreakTime;
        if (this.counter % 4 === 0) {
            this.longBreakPause();
        } else if (this.counter % 4 !== 0){
            this.shortBreakPause();
        }
    }
}