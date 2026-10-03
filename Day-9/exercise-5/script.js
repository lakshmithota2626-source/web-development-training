const storageKey = "web-training-day9-study-tasks";
const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const taskFilter = document.querySelector("#task-filter");
const taskSummary = document.querySelector("#task-summary");
const taskStatus = document.querySelector("#task-status");
const emptyTasks = document.querySelector("#empty-tasks");
let nextTaskId = 1;

function loadTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(savedTasks)) return [];

    return savedTasks.filter((task) =>
      task && typeof task.id === "string" && typeof task.title === "string" &&
      typeof task.topic === "string" && typeof task.dueDate === "string" &&
      typeof task.completed === "boolean"
    );
  } catch {
    return [];
  }
}

let tasks = loadTasks();

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function getVisibleTasks() {
  if (taskFilter.value === "active") return tasks.filter((task) => !task.completed);
  if (taskFilter.value === "completed") return tasks.filter((task) => task.completed);
  return tasks;
}

function createTaskRow(task) {
  const row = document.createElement("li");
  row.className = `list-item${task.completed ? " completed" : ""}`;

  const details = document.createElement("span");
  details.textContent = `${task.title} · ${task.topic} · due ${task.dueDate}`;

  const actions = document.createElement("span");
  actions.className = "list-actions";

  const toggleButton = document.createElement("button");
  toggleButton.className = "button";
  toggleButton.type = "button";
  toggleButton.dataset.taskAction = "toggle";
  toggleButton.dataset.taskId = task.id;
  toggleButton.textContent = task.completed ? "Reopen" : "Complete";

  const removeButton = document.createElement("button");
  removeButton.className = "button";
  removeButton.type = "button";
  removeButton.dataset.taskAction = "remove";
  removeButton.dataset.taskId = task.id;
  removeButton.textContent = "Remove";

  actions.append(toggleButton, removeButton);
  row.append(details, actions);
  return row;
}

function renderTasks() {
  const visibleTasks = getVisibleTasks();
  taskList.replaceChildren(...visibleTasks.map(createTaskRow));
  emptyTasks.hidden = visibleTasks.length > 0;

  const completedCount = tasks.filter((task) => task.completed).length;
  taskSummary.textContent = `${tasks.length} total · ${completedCount} done`;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(taskForm);
  const title = String(formData.get("title")).trim();
  const topic = String(formData.get("topic"));
  const dueDate = String(formData.get("dueDate"));

  if (!title || !dueDate) {
    taskStatus.textContent = "Enter a task and choose a due date.";
    taskStatus.classList.add("error");
    return;
  }

  tasks.push({
    id: `${Date.now()}-${nextTaskId}`,
    title,
    topic,
    dueDate,
    completed: false
  });
  nextTaskId += 1;
  taskFilter.value = "all";
  taskForm.reset();
  taskStatus.textContent = "Task added and saved in this browser.";
  taskStatus.classList.remove("error");
  saveTasks();
  renderTasks();
});

taskFilter.addEventListener("change", renderTasks);

taskList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-task-action]");
  if (!button) return;

  const taskIndex = tasks.findIndex((task) => task.id === button.dataset.taskId);
  if (taskIndex < 0) return;

  if (button.dataset.taskAction === "toggle") {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    taskStatus.textContent = tasks[taskIndex].completed ? "Task marked complete." : "Task reopened.";
  } else if (button.dataset.taskAction === "remove") {
    tasks.splice(taskIndex, 1);
    taskStatus.textContent = "Task removed.";
  }

  taskStatus.classList.remove("error");
  saveTasks();
  renderTasks();
});

renderTasks();