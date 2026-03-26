// DOM Document Object Model Referenzen

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearCompletedBtn = document.getElementById("clearCompletedBtn")

// State
let tasks = []; // Single Source of Truth
let currentFilter = "all";

// renderTasks()
// Die Liste wird geleert, weil sie jedes Mal komplett neu renderst.
function renderTasks() {
  taskList.innerHTML = "";

  tasks
    .map((task, index) => ({ task, index }))
    .filter(({ task }) => {
      if (currentFilter === "open") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true;
    })
    .forEach(({ task, index }) => {
      const li = document.createElement("li");
      li.classList.add("task-item");

      if (task.completed) {
        li.classList.add("completed");
      }

      const span = document.createElement("span");
      span.classList.add("task-text");
      span.textContent = task.text;

      span.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "Löschen";

      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });

  updateTaskCounter();
}

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Bitte eine Aufgabe eingeben.");
    return;
  }

  tasks.push({
    text: text,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

function updateTaskCounter() {
  const openTasks = tasks.filter((task) => !task.completed).length;

  if (openTasks === 1) {
    taskCounter.textContent = "1 Aufgabe offen";
  } else {
    taskCounter.textContent = `${openTasks} Aufgaben offen`;
  }
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
})

loadTasks();
renderTasks();

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    renderTasks();
  });
});


