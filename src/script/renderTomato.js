import "./view";
import "./main";
import { el, setChildren } from "redom";
import { Controller } from "./controller";

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
        this.clearTask();

        this.tasks.forEach((task, index) => {
            this.taskItem = el("li.tasks__item", 
                el("span.count-number", index + 1), 
                el("button.tasks__text", task.text),
                el("button.tasks__button")
            );
    
            if (task.status === "important") {
                this.taskItem.classList.add("important");
            } else if (task.status === "so-so") {
                this.taskItem.classList.add("so-so");
            } else {
                this.taskItem.classList.add("default");
            }
            this.taskList.appendChild(this.taskItem); 
        });
    }

    renderWindow(taskText, index) {
        this.windowTask = document.querySelector(".window__panel-title");
        this.windowTask.textContent = taskText;
        this.numberTask = document.querySelector(".window__panel-task-text");
        this.numberTask.textContent = `Задача №${index + 1}`;
    }
    popupTaskMenu() {
        this.popupBtn = document.querySelector(".tasks__button");
        this.popupMenu = el("div.popup.popup_active", 
            el("button.popup__button.popup__edit-button", "Редактировать"), 
            el("button.popup__button.popup__delete-button", "Удалить")
        );
        this.popupBtn.append(this.popupMenu);    
    }
}
