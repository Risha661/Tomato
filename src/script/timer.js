export class Task {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.counter = 0;
    }

    incrementCounter() {
        this.counter += 1;
    }
}

export class Tomato {
    constructor({ workTime = 25, shortBreakTime = 5, longBreakTime = 15, tasks = [] } = {}) {
        this.workTime = workTime * 60 * 1000;
        this.shortBreakTime = shortBreakTime * 60 * 1000;
        this.longBreakTime = longBreakTime * 60 * 1000;
        this.tasks = tasks;
        this.activeTask = null;
        this.counter = 0;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    activateTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.activeTask = task;
            console.log(`Активирована задача: ${task.name}`);
        } else {
            console.error(`Задача с id ${id} не найдена`);
        }
    }

    startTask() {
        if (!this.activeTask) {
            console.error("Нет активной задачи для запуска");
            return;
        }
        console.log(`Запуск задачи: ${this.activeTask.name}`);
      
        setTimeout(() => {
            console.log(`Задача ${this.activeTask.name} завершена!`);
            this.increaseCounter(this.activeTask.id);
            this.startBreak();
        }, this.workTime);
    }

    increaseCounter(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.incrementCounter();
            console.log(`Счётчик для задачи ${task.name}: ${task.counter}`);
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

const tomatoTimer = new Tomato();

const task1 = new Task(1, "Задача 1");
const task2 = new Task(2, "Задача 2");
const task3 = new Task(3, "Задача 3");
console.log(task1, task2, task3);

tomatoTimer.addTask(task1);
tomatoTimer.addTask(task2);
tomatoTimer.addTask(task3);

tomatoTimer.activateTask(1);
tomatoTimer.startTask();

tomatoTimer.activateTask(2);
tomatoTimer.startTask();

tomatoTimer.activateTask(3);
tomatoTimer.startTask();