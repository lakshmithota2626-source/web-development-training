import React from "react";

const STATUS_FILTERS = ["All items", "Use soon", "Low stock", "Expired"];

function PantryToolbar({ categories, search, category, statusFilter, onSearch, onCategory, onStatusFilter }) {
  return (
    <div className="toolbar">
      <div className="filter-row">
        <label className="search-field">
          <span className="visually-hidden">Search pantry</span>
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search items" />
        </label>
        <label className="category-filter">
          <span className="visually-hidden">Filter by category</span>
          <select value={category} onChange={(event) => onCategory(event.target.value)}>
            <option>All categories</option>
            {categories.map((itemCategory) => <option key={itemCategory}>{itemCategory}</option>)}
          </select>
        </label>
      </div>
      <div className="status-filters" role="group" aria-label="Filter by stock status">
        {STATUS_FILTERS.map((filter) => (
          <button
            className={statusFilter === filter ? "selected" : ""}
            type="button"
            key={filter}
            aria-pressed={statusFilter === filter}
            onClick={() => onStatusFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PantryToolbar;