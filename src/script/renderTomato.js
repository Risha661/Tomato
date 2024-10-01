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
        console.log(this.tasks);
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
    popupTaskMenu() {
        this.popupBtn = document.querySelector(".tasks__button");
        this.popupMenu = el("div.popup.popup_active", 
            el("button.popup__button.popup__edit-button", "Редактировать"), 
            el("button.popup__button.popup__delete-button", "Удалить")
        );
        this.popupBtn.append(this.popupMenu);
        console.log(this.popupBtn);
        //вмонтировать в нужный контейнер по клику и исправить чтобы плашка была под каждым li
    }
}
