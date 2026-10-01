import React, { useState } from "react";

const INITIAL_FORM = { title: "", category: "Study", priority: "Medium", dueDate: "" };

function TaskForm({ categories, onAdd }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();

    if (!title) {
      setMessage("Add a short task title first.");
      return;
    }

    onAdd({ ...form, title });
    setForm(INITIAL_FORM);
    setMessage("Task added to your list.");
  }

  return (
    <section className="form-panel" aria-labelledby="form-heading">
      <div className="panel-heading">
        <span className="panel-index">01</span>
        <div><p className="eyebrow">Get it out of your head</p><h2 id="form-heading">New task</h2></div>
      </div>
      <form className="task-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Task title</span>
          <input name="title" value={form.title} onChange={handleChange} maxLength="100" placeholder="e.g. Practise array methods" required />
        </label>
        <div className="form-row">
          <label className="field">
            <span>Area</span>
            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Priority</span>
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option>Low</option><option>Medium</option><option>High</option>
            </select>
          </label>
        </div>
        <label className="field">
          <span>Due date <small>optional</small></span>
          <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
        </label>
        <button className="submit-button" type="submit"><span aria-hidden="true">+</span> Add task</button>
        <p className="form-message" role="status" aria-live="polite">{message}</p>
      </form>
    </section>
  );
}

export default TaskForm;