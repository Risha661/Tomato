// import "./timer";

import "./controller";


let isWork = false;
export class ModelTomato {
    static instance = null;
    constructor({ workTime = 25, shortBreakTime = 5, longBreakTime = 15, tasks = [] } = {}, view, renderTomato) {
        if (ModelTomato.instance) {
            return ModelTomato.instance;
        }
        this.breakTime = 0;
        this.view = view;
        this.renderTomato = renderTomato;
        this.workTime = workTime * 60 * 1000;
        this.shortBreakTime = shortBreakTime * 60 * 1000;
        this.longBreakTime = longBreakTime * 60 * 1000;
        this.tasks = tasks;
        this.activeTask = null;
        this.counter = 1;
        this.isRunning = false;
        this.startBtn = document.querySelector(".button-primary");
        this.stopBtnTimer = document.querySelector(".button-secondary");
        
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
    
        const intervalId = setInterval(() => {
            remainingTime -= 1000;
            this.stopBtnTimer.style.display = "none";
    
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    
            if (isWork === true) {
                console.log("МЫ ЗДЕСЬ")
                if (remainingTime <= 0) {
                    clearInterval(intervalId);
                    timerDisplay.style.fontSize = "28px";
                    timerDisplay.style.textAlign = "center";
                    this.isRunning = false;
                    this.startBreak();
                    console.log(`Задача "${this.activeTask.text}" завершена!`);
                    if (timerTitle) {
                        timerTitle.remove();
                    }
                    this.increaseCounter(this.activeTask.id);
                }
            } else {
                if (remainingTime <= 0) {
                    console.log("ПАУЗА")
                    timerTitle.style.display = "none";
                    clearInterval(intervalId);
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
        const breakTime = (this.counter % 4 === 0) ? this.longBreakTime : this.shortBreakTime;
        if (this.counter % 4 === 0) {
            this.longBreakPause();
        } else if (this.counter % 4 !== 0){
            this.shortBreakPause();
        }
    }

        // startTask() {
    //     if (!this.activeTask) {
    //         console.error("Нет активной задачи для запуска");
    //         return;
    //     }
    //     console.log(`Запуск задачи: ${this.activeTask.text}`);

    //     setTimeout(() => {
    //         this.increaseCounter(this.activeTask.id);
    //         this.startBreak();
    //     }, this.workTime);
    // }
}