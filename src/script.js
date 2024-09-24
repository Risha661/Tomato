import "./script/main";
import "./script/timer";
import "./script/renderTomato";
import "./script/controller";
import "./script/render";
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

