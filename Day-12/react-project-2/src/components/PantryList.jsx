import React from "react";
import PantryItem from "./PantryItem.jsx";

function PantryList({ items, getItemStatus, onAdjust, onRemove }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-mark" aria-hidden="true">∅</span>
        <h3>No matching pantry items</h3>
        <p>Try another search or filter, or add an item to your pantry.</p>
      </div>
    );
  }

  return (
    <ul className="inventory-list" aria-label="Pantry items">
      {items.map((item) => (
        <PantryItem
          key={item.id}
          item={item}
          status={getItemStatus(item)}
          onAdjust={onAdjust}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}

export default PantryList;