const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Bitte eine Aufgabe eingeben.");
    return;
  }

  const li = document.createElement("li");
  li.textContent = text;

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