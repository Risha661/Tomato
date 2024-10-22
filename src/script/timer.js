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