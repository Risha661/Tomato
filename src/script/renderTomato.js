import "./view";
import "./main";
import { el, mount, setChildren } from 'redom';
import { Controller } from './controller';

export class RenderTomato {
    constructor(container, controller) {
        this.container = container;
        this.controller = controller;
        this.taskList = el("ul.tasks__list");
        console.log(this.taskList);
        mount(this.container, this.taskList);
    }

    clearTask() {
        setChildren(this.taskList, []);
    }

    renderTask() {
        const tasks = this.controller.loadTask();
        console.log(tasks);
        this.clearTask();

        tasks.forEach((task, index) => {
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
    // const controller = new Controller();
    const container = document.querySelector(".tasks-container");
  
    if (!container) {
        console.error("Container not found!");
        return;
    }

    const renderTomato = new RenderTomato(container, controller);
    renderTomato.renderTask(); 
});


//найти и заменить класс контейнера на адекватный
//проверить почему не удаляется старый список ul