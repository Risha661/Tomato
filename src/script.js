import "./script/main";

import "./scss/index.scss";

class Realize {
    constructor(name, counter = 0) {
        this.name = name;
        this.counter = counter;
        this.id = this.generateRandomId();
    }

    generateRandomId() {
        return new Date().getTime().toString(16);
    }

    changeName(newName) {
        this.name = newName;
        return this.name;
    }

    changeCounter() {
        this.counter += 1;
        return this.counter;
    }
}

const timer = new Realize("New timer");

console.log(timer.generateRandomId());
console.log(timer.id);
console.log(timer.changeName("Новый таймер"));
console.log(timer.changeCounter());
