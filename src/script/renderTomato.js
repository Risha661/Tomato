import "./view";
import "./main";
import { el, mount, setChildren } from 'redom';
import { Controller } from './controller';

export class RenderTomato {
    constructor() {
        this.controller = new Controller();
        this.taskList = document.querySelector(".tasks__list");

        if (!this.taskList) {
            console.error("Task list not found!");
            return;
        }
    }

    clearTask() {
        setChildren(this.taskList, []);
    }

    renderTask() {
        this.tasks = this.controller.loadTask();
        console.log(this.tasks);
        this.clearTask();

        this.tasks.forEach((task, index) => {
            const taskItem = el("li.tasks__item", 
                el("span.count-number", index + 1), 
                el("button.tasks__text", task.text),
                el("button.tasks__button")
            );
    
            if (task.status === "important") {
                taskItem.classList.add("important");
            } else if (task.status === "so-so") {
                taskItem.classList.add("so-so");
            } else {
                taskItem.classList.add("default");
            }
    
            this.tasksList.appendChild(taskItem); 
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const renderTomato = new RenderTomato();
    renderTomato.renderTask(); 
});


//найти и заменить класс контейнера на адекватный
//проверить почему не удаляется старый список ul