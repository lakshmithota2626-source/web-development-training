import React from "react";

function TaskItem({ task, dueLabel, onToggle, onRemove }) {
  const priorityClass = task.priority.toLowerCase();
  const dueClass = dueLabel.startsWith("Overdue") ? "overdue" : "";

  return (
    <li className={`task-row${task.completed ? " completed" : ""}`}>
      <button className="check-button" type="button" aria-label={`${task.completed ? "Reopen" : "Complete"} ${task.title}`} aria-pressed={task.completed} onClick={() => onToggle(task.id)}>
        <span aria-hidden="true">{task.completed ? "✓" : ""}</span>
      </button>
      <div className="task-details">
        <strong>{task.title}</strong>
        <span>{task.category} <i aria-hidden="true">/</i> <span className={dueClass}>{dueLabel}</span></span>
      </div>
      <span className={`priority-tag ${priorityClass}`}>{task.priority}</span>
      <button className="remove-button" type="button" aria-label={`Remove ${task.title}`} onClick={() => onRemove(task.id)}>Remove</button>
    </li>
  );
}

export default TaskItem;