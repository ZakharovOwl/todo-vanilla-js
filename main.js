document.addEventListener("DOMContentLoaded", function () {
  const todoApp = new TodoApp();
  todoApp.init();
});

class TodoApp {
  constructor() {
    this.taskList = document.getElementById("tasks");
    this.taskInput = document.getElementById("taskInput");
    this.addTaskBtn = document.getElementById("addTaskBtn");
    this.showAllTasksBtn = document.getElementById("showAllTasksBtn");
    this.tasks = [];
  }

  init() {
    this.showAllTasksBtn.addEventListener("click", () => this.showAllTasks());
    this.addTaskBtn.addEventListener("click", () => this.addTask());
    this.taskList.addEventListener("click", (event) =>
      this.handleTaskClick(event),
    );
    this.loadHighQualityImage();
  }

  addTask() {
    const inputValue = this.taskInput.value.trim();
    if (inputValue !== "") {
      const task = { value: inputValue, state: false };
      this.tasks.push(task);
      this.renderTasks();
      this.taskInput.value = "";
    }
  }

  renderTasks() {
    this.taskList.innerHTML = "";
    this.tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = "taskItem";

      const spanElement = document.createElement("span");
      spanElement.textContent = task.value;
      spanElement.setAttribute("data-index", index);
      taskItem.appendChild(spanElement);

      taskItem.appendChild(
        this.createButton("Edit", () => this.editTask(index)),
      );

      taskItem.appendChild(
        this.createButton("Remove", () => this.removeTask(index)),
      );

      if (task.done) {
        spanElement.style.textDecoration = "line-through";
        spanElement.style.color = "gray";
      }

      this.taskList.appendChild(taskItem);
    });
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.renderTasks();
  }

  editTask(index) {
    const newTaskText = prompt("Edit task:", this.tasks[index].text);

    if (
      typeof newTaskText === "string" &&
      newTaskText !== "" &&
      newTaskText !== null
    ) {
      this.tasks[index].value = newTaskText;
      this.renderTasks();
    }
  }

  handleTaskClick(event) {
    const target = event.target;

    if (target.tagName === "SPAN") {
      const index = parseInt(target.getAttribute("data-index"), 10);
      if (!isNaN(index) && index >= 0 && index < this.tasks.length) {
        this.toggleTaskState(index);
      }
    }
  }

  toggleTaskState(index) {
    this.tasks[index].done = !this.tasks[index].done;
    this.renderTasks();
  }

  showAllTasks() {
    console.log("all", this.tasks);
  }

  createButton(label, clickHandler) {
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", clickHandler);
    return button;
  }

  loadHighQualityImage() {
    const highQualityImage = new Image();
    highQualityImage.src =
      "https://images.unsplash.com/photo-1628334025599-52f9ae51f782?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    highQualityImage.onload = () => {
      document.body.style.backgroundImage = `url('${highQualityImage.src}')`;
    };
  }
}
