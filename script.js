// DOM Document Object Model Referenzen

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// State
let tasks = []; // Single Source of Truth

// renderTasks()
// Die Liste wird geleert, weil sie jedes Mal komplett neu renderst.
function renderTasks() {
  taskList.innerHTML = "";

// task -> aktuelles Objekt
// index -> Position im Array
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    // Wenn die Task erledigt ist, bekommt das li eine CSS KLasse (Das ist State -> UI Mapping)
    if (task.completed) {
      li.classList.add("completed")
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
      task.splice(index, 1); // splice entfernt 1 Element an Position index
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
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

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

loadTasks();
renderTasks();

