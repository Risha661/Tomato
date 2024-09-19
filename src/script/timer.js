import "./render";

export class Task {
    constructor(text) {
        this.id = this.generateId();
        this.text = text;
        this.counter = 0;
    }

    incrementCounter() {
        return this.counter += 1;
    }

    generateId() {
        return Math.floor(Math.random() * 9000) + 1000;
    }

    toString() {
        return Task(`ID: ${this.id}, text: ${this.text}, counter: ${this.incrementCounter()}`);
    }
}

export class ImportantTask extends Task {
    constructor(text, importance) {
        super(text);
        this.importance = importance;
    }

    toString() {
        return ImportantTask(`ID: ${this.id}, ImportantTask: ${this.text}, count: ${this.counter}`);
    }
}

export class StandartTask extends Task {
    constructor(text) {
        super(text);
    }

    toString() {
        return StandartTask(`ID: ${this.id}, text: ${this.text}, count: ${this.counter}`);
    }
}

export class UnimportantTask extends Task {
    constructor(text) {
        super(text);
    }

    toString() {
        return UnimportantTask(`ID: ${this.id}, text: ${this.text}, count: ${this.counter}`);
    }
}
export class Tomato {
    constructor({ workTime = 25, shortBreakTime = 5, longBreakTime = 15, tasks = [] } = {}) {
        if (Tomato.instance) {
            return Tomato.instance;
        }

        this.workTime = workTime * 60 * 1000;
        this.shortBreakTime = shortBreakTime * 60 * 1000;
        this.longBreakTime = longBreakTime * 60 * 1000;
        this.tasks = tasks;
        this.activeTask = null;
        this.counter = 0;

        Tomato.instance = this;
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

// const task1 = new Task("Задача 1");
// const task2 = new Task("Задача 2");
// const task3 = new Task("Задача 3");
// console.log(task1, task2, task3);

// const importantTask = new ImportantTask("Важная задача", "Высокая");
// console.log(importantTask);
// const standartTask = new StandartTask("Обычная задача");
// console.log(standartTask);
// const unimportantTask = new UnimportantTask("Неважная задача");
// console.log(unimportantTask);

// const tomato1 = new Tomato();
// const tomato2 = new Tomato();

// console.log(tomato1, tomato2);
// console.log(tomato1 === tomato2);

// tomato1.addTask(task1);
// tomato1.addTask(task2);
// tomato1.addTask(task3);

// tomato1.activateTask(task1.id);
// tomato1.startTask();