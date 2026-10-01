import React, { useEffect, useState } from "react";
import ProgressSummary from "./components/ProgressSummary.jsx";
import TaskFilters from "./components/TaskFilters.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

const STORAGE_KEY = "day11-react-project1-tasks";
const CATEGORIES = ["Study", "Work", "Personal"];

function dateAfterDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

function createStarterTasks() {
  return [
    { id: "starter-1", title: "Review Java array problems", category: "Study", priority: "High", dueDate: dateAfterDays(1), completed: false },
    { id: "starter-2", title: "Sketch the task manager layout", category: "Work", priority: "Medium", dueDate: dateAfterDays(2), completed: false },
    { id: "starter-3", title: "Organize project notes", category: "Personal", priority: "Low", dueDate: "", completed: true }
  ];
}

function isTask(task) {
  return task && typeof task.id === "string" && typeof task.title === "string" &&
    typeof task.category === "string" && typeof task.priority === "string" &&
    typeof task.dueDate === "string" && typeof task.completed === "boolean";
}

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks === null) return createStarterTasks();
    const parsedTasks = JSON.parse(savedTasks);
    return Array.isArray(parsedTasks) ? parsedTasks.filter(isTask) : createStarterTasks();
  } catch {
    return createStarterTasks();
  }
}

function getDueLabel(dueDate, completed) {
  if (!dueDate) return "No due date";
  if (completed) return `Due ${dueDate}`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${dueDate}T00:00:00`);
  if (due.getTime() < today.getTime()) return `Overdue · ${dueDate}`;
  if (due.getTime() === today.getTime()) return "Due today";
  return `Due ${dueDate}`;
}

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All tasks");
  const [storageWarning, setStorageWarning] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setStorageWarning(false);
    } catch {
      setStorageWarning(true);
    }
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const openCount = tasks.length - completedCount;
  const visibleTasks = tasks
    .filter((task) => {
      const matchesSearch = `${task.title} ${task.category}`.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = categoryFilter === "All categories" || task.category === categoryFilter;
      const matchesStatus = statusFilter === "All tasks" ||
        (statusFilter === "To do" && !task.completed) ||
        (statusFilter === "Completed" && task.completed);
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((first, second) => {
      if (first.completed !== second.completed) return Number(first.completed) - Number(second.completed);
      if (!first.dueDate) return 1;
      if (!second.dueDate) return -1;
      return first.dueDate.localeCompare(second.dueDate);
    });

  function addTask(taskDetails) {
    const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    setTasks((currentTasks) => [{ ...taskDetails, id, completed: false }, ...currentTasks]);
    setNotice(`Added "${taskDetails.title}" to your list.`);
    setStatusFilter("All tasks");
    setCategoryFilter("All categories");
    setSearch("");
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) => currentTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    setNotice("Task status updated.");
  }

  function removeTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    setNotice("Task removed.");
  }

  function clearCompleted() {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed));
    setNotice("Completed tasks cleared.");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Focus Board home">
          <span className="brand-mark" aria-hidden="true">FB</span>
          <span>Focus Board</span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a className="active" href="#tasks">My tasks</a>
          <a href="#new-task">Add a task</a>
        </nav>
        <span className="save-state"><span className="save-dot" aria-hidden="true"></span> Saved on this device</span>
      </header>

      <main id="top">
        <section className="page-heading">
          <div>
            <p className="eyebrow">React Project 1 / Task manager</p>
            <h1>Make room for the next thing.</h1>
            <p className="intro-copy">A simple board for keeping study, work, and personal tasks moving.</p>
          </div>
          <a className="add-jump" href="#new-task"><span aria-hidden="true">+</span> Create task</a>
        </section>

        <ProgressSummary total={tasks.length} open={openCount} completed={completedCount} />

        <section className="workspace" aria-label="Task manager">
          <aside className="entry-column" id="new-task">
            <TaskForm categories={CATEGORIES} onAdd={addTask} />
            {notice && <p className="notice" role="status" aria-live="polite">{notice}</p>}
            {storageWarning && <p className="notice warning" role="alert">Browser storage is unavailable. Changes may not persist after you leave.</p>}
            <p className="privacy-note">Tasks are stored in this browser only. No account or server is used.</p>
          </aside>

          <section className="task-section" id="tasks" aria-labelledby="tasks-heading">
            <div className="task-heading">
              <div><p className="eyebrow">Your plan</p><h2 id="tasks-heading">Task list <span className="task-count">{visibleTasks.length}</span></h2></div>
              <button className="text-button" type="button" disabled={completedCount === 0} onClick={clearCompleted}>Clear completed</button>
            </div>
            <TaskFilters
              categories={CATEGORIES}
              search={search}
              category={categoryFilter}
              status={statusFilter}
              onSearch={setSearch}
              onCategory={setCategoryFilter}
              onStatus={setStatusFilter}
            />
            <TaskList tasks={visibleTasks} getDueLabel={getDueLabel} onToggle={toggleTask} onRemove={removeTask} />
          </section>
        </section>
      </main>

      <footer className="footer"><span>Focus Board / React Project 1</span><span>Plan a little. Finish a little.</span></footer>
    </div>
  );
}

export default App;