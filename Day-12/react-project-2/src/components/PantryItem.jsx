import React from "react";

function PantryItem({ item, status, onAdjust, onRemove }) {
  const statusClass = status.toLowerCase().replaceAll(" ", "-");

  return (
    <li className="inventory-row">
      <div className="item-identity">
        <span className={`item-symbol ${item.category.toLowerCase().replaceAll(" ", "-")}`} aria-hidden="true">{item.category.slice(0, 1)}</span>
        <div className="item-description">
          <strong>{item.name}</strong>
          <span>{item.category}{item.expiresOn ? ` · Best before ${item.expiresOn}` : " · No expiry date"}</span>
        </div>
      </div>
      <span className={`status-tag ${statusClass}`} aria-label={`Status: ${status}`}>{status}</span>
      <div className="quantity-control" aria-label={`${item.name} quantity controls`}>
        <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => onAdjust(item.id, -1)}>−</button>
        <output aria-label={`${item.name} quantity`}>{item.quantity}</output>
        <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => onAdjust(item.id, 1)}>+</button>
      </div>
      <button className="remove-button" type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>
    </li>
  );
}

export default PantryItem;