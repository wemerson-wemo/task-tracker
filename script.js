const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Bitte eine Aufgabe eingeben.");
    return;
  }

  // <li class="task-item">
  const li = document.createElement("li");
  li.classList.add("task-item");

  // <span class="task-text">...</span>
  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = text;

  span.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // <button class="delete-btn">Löschen</button>
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Löschen";

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  taskInput.focus();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

