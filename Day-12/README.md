# Day 12 — React Project 2: Pantry Ledger

## Objective

Build a full-featured, practical pantry inventory and freshness management web application using React 19 and Vite. The goal was to master advanced React state orchestration, complex multi-criteria list filtering/sorting, local storage persistence with `useEffect`, component decomposition, and responsive UI design distinct from basic to-do applications.

## Technologies

- **Frontend Library:** React 19 (`useState`, `useEffect`, `useMemo`)
- **Build Tool & Dev Server:** Vite v7.3.6
- **Language:** JavaScript (ES2022+ / JSX)
- **Styling:** Vanilla CSS with Custom Properties, CSS Grid & Flexbox
- **Persistence:** Browser `localStorage` API
- **Tooling:** Node.js & npm

## Features

- **Inventory Tracking:** Add pantry items with item name, category (Produce, Dairy, Pantry, Meat, Frozen, Snacks), quantity, and optional best-before expiry date.
- **Dynamic Multi-Filter & Search:** Real-time search query matching by title/category combined with category dropdown filters and stock status toggles (All, Low Stock, Use Soon, Expired, Out of Stock).
- **Date Sorting & Expiry Warnings:** Automatic chronological sorting by best-before date with visual badges for expired items and goods nearing expiry within 3 days.
- **Stock Quantity Steppers:** Increment and decrement stock counts directly on item cards with automatic low-stock and out-of-stock badge transitions.
- **At-a-Glance Summary Bar:** Responsive metrics header showing total tracked items, low-stock alerts, use-soon counts, and expired item counts.
- **Browser Persistence:** Seamless synchronization with `localStorage` so inventory survives page reloads, pre-populated with realistic starter data on first visit.
- **Responsive Layout:** Adaptive layout transitioning seamlessly between mobile handhelds, tablets, and desktop displays.

## Project Structure

```text
Day-12/
├── README.md
└── react-project-2/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── PantryForm.jsx
    │   │   ├── PantryItem.jsx
    │   │   ├── PantryList.jsx
    │   │   ├── PantryToolbar.jsx
    │   │   └── SummaryBar.jsx
    │   └── styles/
    │       └── main.css
    └── dist/
```

## How to Run

1. Open your terminal and navigate to the project directory:
   ```bash
   cd Day-12/react-project-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open the displayed URL (typically `http://localhost:5173/`) in your browser.

4. Build for production:
   ```bash
   npm run build
   npm run preview
   ```

## What I Learned

- How to structure unidirectional data flow in React applications with centralized state ownership in `App.jsx` and pure presentational children.
- Using `useEffect` hooks for robust local storage synchronization without race conditions or hydration mismatches.
- Applying immutable array operations (`toSorted`, `filter`, `map`) to derive complex filtered views from base inventory state without mutating original data.
- Creating clean reusable controlled form components with custom input validation and accessible labeling.
- Designing responsive CSS Grid systems with dark-mode aesthetic styling without relying on heavy external CSS frameworks.

## Challenges

- **Managing Computed Expiry States:** Calculating whether an item is "expired", "expiring soon" (within 72 hours), or "fresh" required parsing dates safely across varying timezone offsets without causing unnecessary re-renders. Solved by standardizing on ISO date string normalization.
- **Safe State Updates on Nested Quantities:** Avoiding race conditions when rapidly clicking increment/decrement buttons was solved by using functional state updater callbacks `setItems(prev => prev.map(...))`.
- **Handling Empty Filter States:** Ensuring clear feedback when a user searches for an item that exists in inventory but is filtered out by the active status filter.

## Future Improvements

- Add barcode scanning capabilities via mobile camera using the Web Barcode Detection API.
- Implement automated export to shopping lists (PDF / copy-to-clipboard) for all items marked out-of-stock or low-stock.
- Add customizable category creation and unit selection (kg, grams, liters, packs).
