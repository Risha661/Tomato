export class Controller {
    constructor(view) {
        this.currentEditIndex = null;
        this.view = view;
        this.tasks = this.loadTask();
        this.editPlacehoderInput = document.querySelector(".input-primary");
        this.editStatusBtn = document.querySelector(".button-importance");
    }

    generateId() {
        return Math.floor(Math.random() * 9000) + 1000;
    }
    loadTask() {
        const taskJson = localStorage.getItem("tasks");
        return taskJson ? JSON.parse(taskJson) : [];
    }
    saveTask() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks)); 
    }
    addTask(taskText, statusTask) {
        const newTask = {text: taskText, status: statusTask, id: this.generateId()};
        if (!this.tasks) {
            this.tasks = [];
        }
        this.tasks.push(newTask);
        this.saveTask();
    }
    deleteTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
            this.saveTask();
        } else {
            console.error("Задача с данным индексом не найдена.");
        }
    }

    editTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            const task = this.tasks[index];
            this.taskStatus = task.status;
            const taskText = task.text;
            this.editPlacehoderInput.value = taskText;
            this.editStatusBtn.textContent = this.updateStatusButton();
            this.currentEditIndex = index;
        } else {
            console.error("Задача с данным индексом не найдена.");
        }
    }
    
    updateStatusButton() {
        if (!this.editStatusBtn) {
            console.error("editStatusBtn is not initialized");
            return;
        }
    
        this.editStatusBtn.classList.remove("important", "so-so", "default");
        if (this.taskStatus === "important") {
            this.editStatusBtn.classList.add("important");
        } else if (this.taskStatus === "so-so") {
            this.editStatusBtn.classList.add("so-so");
        } else {
            this.editStatusBtn.classList.add("default");
        }
    }
}