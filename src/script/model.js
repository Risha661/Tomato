// import "./timer";
import "./renderTomato";
import "./controller";
import { View } from "./view";
let flagTimer = "false";
export class ModelTomato {
    static instance = null;
    constructor({ workTime = 25, shortBreakTime = 5, longBreakTime = 15, tasks = [] } = {}, view) {
        if (ModelTomato.instance) {
            return ModelTomato.instance;
        }
        this.breakTime = 0;
        this.view = view;
        this.workTime = workTime * 60 * 1000;
        this.shortBreakTime = shortBreakTime * 60 * 1000;
        this.longBreakTime = longBreakTime * 60 * 1000;
        this.tasks = tasks;
        this.activeTask = null;
        this.counter = 1;
        this.startBtn = document.querySelector(".button-primary");
        

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

    startTask() {
        if (!this.activeTask) {
            console.error("Нет активной задачи для запуска");
            return;
        }
        console.log(`Запуск задачи: ${this.activeTask.text}`);

        setTimeout(() => {
            console.log(`Задача "${this.activeTask.text}" завершена!`);
            this.increaseCounter(this.activeTask.id);
            this.startBreak();
        }, this.workTime);
    }

    increaseCounter(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            console.log(`Счётчик для задачи "${task.text}": ${this.counter}`);
            this.counter++;
        }
    }

    shortBreakPause() {
        const timerTitle = document.createElement("h1");
        timerTitle.style.fontSize = "28px";
        timerTitle.style.textAlign = "center";
        timerTitle.textContent = "Короткий перерыв:";

        const timerDuration = this.shortBreakTime;

        const timerDisplay = document.querySelector(".window__timer-text");
        timerDisplay.style.fontSize = "150px";
        timerDisplay.style.textAlign = "center";

        timerDisplay.parentNode.insertBefore(timerTitle, timerDisplay);
        let remainingTime = timerDuration;
        // timerDisplay.textContent = remainingTime / 60000;
    
        const intervalId = setInterval(() => {
            remainingTime -= 1000;
    
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
            if (remainingTime <= 0) {
                timerTitle.style.display = "none";
                clearInterval(intervalId);
            }
        }, 5);
    }
    // timerActivate(miliSeconds, title) {
    //     console.log(title + " начат.");
    //     const timerTitle = document.createElement("h1");
    //     timerTitle.style.fontSize = "28px";
    //     timerTitle.style.textAlign = "center";
    //     timerTitle.textContent = title + ":";
    //     const timerDuration = miliSeconds;
    //     const timerDisplay = document.querySelector(".window__timer-text");
    //     timerDisplay.style.fontSize = "150px";
    //     timerDisplay.style.textAlign = "center";
    //     timerDisplay.parentNode.insertBefore(timerTitle, timerDisplay);
    //     let remainingTime = timerDuration;
    //     const intervalId = setInterval(() => {
    //         remainingTime -= 1000;
    //         const minutes = Math.floor(remainingTime / 60000);
    //         const seconds = Math.floor((remainingTime % 60000) / 1000);
    //         timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    //         if (remainingTime <= 0) {
    //             timerTitle.style.display = "none";
    //             clearInterval(intervalId);
    //         }
    //     }, 5);
    // }  
    // подумать как объединить все таймеры
    longBreakPause() {
        console.log("Долгий перерыв начат.");
        const timerTitle = document.createElement("h1");
        timerTitle.style.fontSize = "28px";
        timerTitle.style.textAlign = "center";
        timerTitle.textContent = "Долгий перерыв:";

        const timerDuration = this.longBreakTime;

        const timerDisplay = document.querySelector(".window__timer-text");
        timerDisplay.style.fontSize = "150px";
        timerDisplay.style.textAlign = "center";

        timerDisplay.parentNode.insertBefore(timerTitle, timerDisplay);
        let remainingTime = timerDuration;
        // timerDisplay.textContent = remainingTime / 60000;
    
        const intervalId = setInterval(() => {
            remainingTime -= 1000;
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
            if (remainingTime <= 0) {
                timerTitle.style.display = "none";
                clearInterval(intervalId);
            }
        }, 5);
    }

    startBreak() {
        const timerDisplay = document.querySelector(".window__timer-text");
        const breakTime = (this.counter % 4 === 0) ? this.longBreakTime : this.shortBreakTime;
    
        timerDisplay.textContent = `Запуск перерыва на ${breakTime / 60000} минут`;


    
        if (this.counter % 4 === 0) {
            flagTimer = "false";
            this.longBreakPause();
        } else if (this.counter % 4 !== 0){
            flagTimer = "true";
            this.shortBreakPause();
        }

        // setTimeout(() => {
            this.restartTask();
        // }, breakTime);
    }

    restartTask() {
        if (!this.activeTask) {
            console.error("Нет активной задачи для перезапуска");
            return;
        }
        console.log(`Перезапуск задачи: ${this.activeTask.text}`);
        this.startTask();
    }
}