import React, { useState } from "react";

function PantryForm({ categories, onAdd }) {
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name")).trim();
    const quantity = Number(formData.get("quantity"));
    const expiresOn = String(formData.get("expiresOn"));

    if (!name || !Number.isInteger(quantity) || quantity < 0) {
      setMessage("Enter an item name and a whole-number quantity of zero or more.");
      setHasError(true);
      return;
    }

    const result = onAdd({
      name,
      category: String(formData.get("category")),
      quantity,
      expiresOn
    });

    if (!result.ok) {
      setMessage(result.message);
      setHasError(true);
      return;
    }

    form.reset();
    setMessage("Item added.");
    setHasError(false);
  }

  return (
    <section className="form-panel" aria-labelledby="form-title">
      <div className="panel-heading">
        <span className="panel-index">01</span>
        <div><p className="eyebrow">Keep it current</p><h2 id="form-title">Add an item</h2></div>
      </div>
      <form className="pantry-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Item name</span>
          <input name="name" autoComplete="off" maxLength="60" placeholder="e.g. Brown rice" required />
        </label>
        <label className="field">
          <span>Category</span>
          <select name="category" defaultValue={categories[0]}>
            {categories.map((itemCategory) => <option key={itemCategory}>{itemCategory}</option>)}
          </select>
        </label>
        <div className="form-row">
          <label className="field">
            <span>Quantity</span>
            <input name="quantity" type="number" min="0" step="1" defaultValue="1" required />
          </label>
          <label className="field">
            <span>Best before <small>optional</small></span>
            <input name="expiresOn" type="date" />
          </label>
        </div>
        <button className="submit-button" type="submit"><span aria-hidden="true">+</span> Add to pantry</button>
        <p className={`form-message${hasError ? " error" : ""}`} role="status" aria-live="polite">{message}</p>
      </form>
    </section>
  );
}

export default PantryForm;