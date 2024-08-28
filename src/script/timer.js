export class Timer {
  constructor({
    time: 25,
    pause: 5,
    bigPause: 15,
    tasks: [],
  },) {
    this.time = time;
    this.tasks = tasks;
    this.activeTask = null;
  }

  addTask(objTask) {
    this.objTask = objTask;
    this.tasks.push(objTask);
  }

  activeTask(id) {
    this.id = id;
    //? добавляет задачу в активные
  }

  startTask(activeTask) {
    let timerId;
    if (activeTask !== null) {
      setTimeout();
      if (timerId === 0) {
        // Когда таймер закачивается то, запускается таймер отдыха, если счетчик кратен 3-м, то запускается большой перерыв, иначе короткий
      }
    } else if (activeTask === null) {
      console.error('Error: активной задачи сейчас нет!');
    }
  }

  addCounter(id) {
    this.id = id;
    //   Используя метод у задачи меняет её счётчик
  }
}

//вывод организовать в консоль