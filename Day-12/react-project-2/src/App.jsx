import React, { useEffect, useState } from "react";
import PantryForm from "./components/PantryForm.jsx";
import PantryList from "./components/PantryList.jsx";
import PantryToolbar from "./components/PantryToolbar.jsx";
import SummaryBar from "./components/SummaryBar.jsx";

const STORAGE_KEY = "day12-pantry-ledger-items";
const CATEGORIES = ["Produce", "Dairy", "Dry goods", "Canned", "Frozen", "Other"];

function dateAfterDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

function createSampleItems() {
  return [
    { id: "sample-oats", name: "Rolled oats", category: "Dry goods", quantity: 1, expiresOn: "" },
    { id: "sample-tomatoes", name: "Cherry tomatoes", category: "Produce", quantity: 2, expiresOn: dateAfterDays(2) },
    { id: "sample-beans", name: "Cannellini beans", category: "Canned", quantity: 4, expiresOn: dateAfterDays(240) },
    { id: "sample-yogurt", name: "Plain yogurt", category: "Dairy", quantity: 3, expiresOn: dateAfterDays(6) }
  ];
}

function isValidItem(item) {
  return item && typeof item.id === "string" && typeof item.name === "string" &&
    typeof item.category === "string" && Number.isInteger(item.quantity) &&
    item.quantity >= 0 && typeof item.expiresOn === "string";
}

function loadItems() {
  try {
    const storedItems = localStorage.getItem(STORAGE_KEY);
    if (storedItems === null) return createSampleItems();

    const parsedItems = JSON.parse(storedItems);
    return Array.isArray(parsedItems) ? parsedItems.filter(isValidItem) : createSampleItems();
  } catch {
    return createSampleItems();
  }
}

function getItemStatus(item) {
  if (item.quantity === 0) return "Out of stock";

  if (item.expiresOn) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(`${item.expiresOn}T00:00:00`);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / 86_400_000);

    if (daysUntilExpiry < 0) return "Expired";
    if (daysUntilExpiry <= 3) return "Use soon";
  }

  if (item.quantity <= 2) return "Low stock";
  return "In stock";
}

function App() {
  const [items, setItems] = useState(loadItems);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All items");
  const [notice, setNotice] = useState("");
  const [storageWarning, setStorageWarning] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setStorageWarning(false);
    } catch {
      setStorageWarning(true);
    }
  }, [items]);

  const lowStockCount = items.filter((item) => getItemStatus(item) === "Low stock").length;
  const useSoonCount = items.filter((item) => getItemStatus(item) === "Use soon").length;
  const expiredCount = items.filter((item) => getItemStatus(item) === "Expired").length;

  const visibleItems = items
    .filter((item) => {
      const matchesSearch = `${item.name} ${item.category}`.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = category === "All categories" || item.category === category;
      const itemStatus = getItemStatus(item);
      const matchesStatus = statusFilter === "All items" || itemStatus === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .toSorted((first, second) => {
      if (!first.expiresOn) return 1;
      if (!second.expiresOn) return -1;
      return first.expiresOn.localeCompare(second.expiresOn);
    });

  function addItem(newItem) {
    const duplicate = items.some((item) => item.name.toLowerCase() === newItem.name.toLowerCase());
    if (duplicate) return { ok: false, message: "That item is already on your pantry list." };

    const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    setItems((currentItems) => [{ ...newItem, id }, ...currentItems]);
    setNotice(`${newItem.name} added to your pantry.`);
    setStatusFilter("All items");
    setCategory("All categories");
    setSearch("");
    return { ok: true };
  }

  function adjustQuantity(itemId, change) {
    setItems((currentItems) => currentItems.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ));
    setNotice("Pantry quantity updated.");
  }

  function removeItem(itemId) {
    const itemToRemove = items.find((item) => item.id === itemId);
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
    setNotice(itemToRemove ? `${itemToRemove.name} removed from your pantry.` : "Pantry item removed.");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Pantry Ledger home">
          <span className="brand-mark" aria-hidden="true">PL</span>
          <span>Pantry Ledger</span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a className="active" href="#inventory">Inventory</a>
          <a href="#add-item">Add item</a>
        </nav>
        <span className="save-state"><span className="save-dot" aria-hidden="true"></span> Saved on this device</span>
      </header>

      <main id="top">
        <section className="page-heading">
          <div>
            <p className="eyebrow">Home inventory / Day 12</p>
            <h1>Know what’s on your shelf.</h1>
            <p className="intro-copy">A simple, useful view of what you have, what’s running low, and what to use next.</p>
          </div>
          <a className="add-jump" href="#add-item"><span aria-hidden="true">+</span> Add pantry item</a>
        </section>

        <SummaryBar total={items.length} lowStock={lowStockCount} useSoon={useSoonCount} expired={expiredCount} />

        <section className="workspace" aria-label="Pantry workspace">
          <aside className="entry-column" id="add-item">
            <PantryForm categories={CATEGORIES} onAdd={addItem} />
            {notice && <p className="notice" role="status" aria-live="polite">{notice}</p>}
            {storageWarning && <p className="notice warning" role="alert">Browser storage is unavailable. Changes may not be saved after you leave.</p>}
            <p className="privacy-note">Your pantry data stays in this browser. No account or server is used.</p>
          </aside>

          <section className="inventory-section" id="inventory" aria-labelledby="inventory-title">
            <div className="inventory-heading">
              <div>
                <p className="eyebrow">Your kitchen</p>
                <h2 id="inventory-title">Pantry inventory <span className="item-count">{items.length}</span></h2>
              </div>
              <span className="sort-note">Sorted by expiry date</span>
            </div>
            <PantryToolbar
              categories={CATEGORIES}
              search={search}
              category={category}
              statusFilter={statusFilter}
              onSearch={setSearch}
              onCategory={setCategory}
              onStatusFilter={setStatusFilter}
            />
            <PantryList items={visibleItems} getItemStatus={getItemStatus} onAdjust={adjustQuantity} onRemove={removeItem} />
          </section>
        </section>
      </main>

      <footer className="footer">
        <span>Pantry Ledger / React Project 2</span>
        <span>Small steps toward less food waste.</span>
      </footer>
    </div>
  );
}

export default App;