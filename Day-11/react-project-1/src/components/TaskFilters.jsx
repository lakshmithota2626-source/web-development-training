import React from "react";

const STATUS_OPTIONS = ["All tasks", "To do", "Completed"];

function TaskFilters({ categories, search, category, status, onSearch, onCategory, onStatus }) {
  return (
    <div className="filters">
      <div className="filter-row">
        <label className="search-field">
          <span className="visually-hidden">Search tasks</span>
          <span aria-hidden="true" className="search-mark">⌕</span>
          <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search your tasks" />
        </label>
        <label className="category-filter">
          <span className="visually-hidden">Filter by area</span>
          <select value={category} onChange={(event) => onCategory(event.target.value)}>
            <option>All categories</option>
            {categories.map((itemCategory) => <option key={itemCategory}>{itemCategory}</option>)}
          </select>
        </label>
      </div>
      <div className="status-tabs" role="group" aria-label="Filter by task status">
        {STATUS_OPTIONS.map((option) => (
          <button key={option} type="button" className={status === option ? "selected" : ""} aria-pressed={status === option} onClick={() => onStatus(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilters;