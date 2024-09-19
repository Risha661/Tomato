// import "./timer";

// export class Model {
//     constructor(view) {
//         this.value = 0;
//         this.view = view;
//     }

//     increment() {
//         this.value += 1;
//         return this.value;
//     }

//     decrement() {
//         this.value -= 1;
//         return this.value;
//     }
// }

// export class Controller {
//     constructor(model) {
//         this.model = model;
//     }

//     handleIncrement() {
//         return this.model.increment();
//     }

//     handleDecrement() {
//         return this.model.decrement();
//     }
// }

// export class View {
//     constructor(root, controller) {
//         this.root = root;
//         this.controller = controller;
//         this.text = document.createElement('p');
//         this.text.textContent = 0;
//         this.incrementButton = document.createElement('button');
//         this.incrementButton.textContent = '+';
//         this.decrementButton = document.createElement('button');
//         this.decrementButton.textContent = '-';
//         this.bindListeners();
//     }

//     increment = () => {
//         const n = this.controller.handleIncrement();
//         this.updateNumber(n);
//     };

//     decrement = () => {
//         const n = this.controller.handleDecrement();
//         this.updateNumber(n);
//     };

//     bindListeners() {
//         this.incrementButton.addEventListener('click', this.increment);
//         this.decrementButton.addEventListener('click', this.decrement);
//     }

//     updateNumber(n) {
//         this.text.textContent = n;
//     }

//     render() {
//         this.root.append(this.text);
//         this.root.append(this.incrementButton);
//         this.root.append(this.decrementButton);
//     }
// }

// const model = new Model();
// const controller = new Controller(model);
// const view = new View(document.getElementById('app'), controller);
// view.render();
