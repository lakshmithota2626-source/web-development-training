import React from "react";
import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, getDueLabel, onToggle, onRemove }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-mark" aria-hidden="true">0</span>
        <h3>No tasks in this view</h3>
        <p>Add a task or choose a different filter to see more of your plan.</p>
      </div>
    );
  }

  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} dueLabel={getDueLabel(task.dueDate, task.completed)} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  );
}

export default TaskList;