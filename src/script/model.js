import "./timer";
import "./renderTomato";
import "./view";
import "./controller";


export class ModelTomato {
    static instance = null;
    constructor({ workTime = 25, shortBreakTime = 5, longBreakTime = 15, tasks = [] } = {}) {
        if (ModelTomato.instance) {
            return ModelTomato.instance;
        }

        this.workTime = workTime * 60 * 1000;
        this.shortBreakTime = shortBreakTime * 60 * 1000;
        this.longBreakTime = longBreakTime * 60 * 1000;
        this.tasks = tasks;
        this.activeTask = null;
        this.counter = 0;

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
            task.incrementCounter();
            console.log(`Счётчик для задачи "${task.text}": ${task.counter}`);
            this.counter++;
        }
    }

    startBreak() {
        const breakTime = (this.counter % 3 === 0) ? this.longBreakTime : this.shortBreakTime;
        console.log(`Запуск перерыва на ${breakTime / 60000} минут`);

        setTimeout(() => {
            console.log("Перерыв завершён!");
        }, breakTime);
    }
}
