# Pantry Ledger — React Project 2

## Objective

Build a practical pantry inventory interface that helps a household track quantities, categories, and expiry dates. This project is meaningfully different from a task-list project: its central interaction is managing inventory and food freshness, not completing tasks.

## Features

- Add pantry items with a category, quantity, and optional best-before date.
- Search by item name or category and filter by category or stock status.
- Adjust quantities with increment/decrement controls and remove items.
- Highlight low stock, items to use soon, expired items, and out-of-stock items.
- Sort inventory by best-before date.
- Save inventory in the current browser using local storage.
- Start with sample pantry items on first visit.
- Responsive layout for desktop and mobile.

## Technologies

- React 19
- JSX
- JavaScript ES modules
- Vite
- CSS Grid, Flexbox, and responsive media queries
- Browser local storage

## Installation

Install Node.js, then open a terminal in this project folder and install dependencies:

```bash
npm install
```

## Running the Project

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173/`). To create and preview a production build:

```bash
npm run build
npm run preview
```

## Folder Structure

```text
react-project-2/
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── PantryForm.jsx
    │   ├── PantryItem.jsx
    │   ├── PantryList.jsx
    │   ├── PantryToolbar.jsx
    │   └── SummaryBar.jsx
    └── styles/
        └── main.css
```

## Component Explanation

- `App` owns the pantry data, filters, summary counts, persistence, and add/update/remove handlers.
- `PantryForm` collects and validates item details, then calls the parent callback.
- `PantryToolbar` receives the current search and filter values through props and reports changes to `App`.
- `PantryList` conditionally renders an empty state or a mapped list of items.
- `PantryItem` displays one item and calls its quantity and remove handlers.
- `SummaryBar` maps summary definitions into the four at-a-glance counts.
- `main.jsx` mounts the React component tree and imports the stylesheet.

## What I Learned

- How state and props divide responsibilities between a parent and reusable components.
- How controlled forms and event handlers update React state.
- How `filter`, `map`, and `toSorted` derive and display a list without changing the original state array.
- How conditional rendering can handle empty, loading-like, and status-specific UI.
- How `useEffect` synchronizes React state with local storage.
- How to organize a React app into components and style it responsively.

## Future Improvements

- Add pantry item editing and user-defined categories.
- Add a printable shopping list for low-stock items.
- Add unit selection and a more detailed expiry notification view.
- Add automated component and interaction tests.

## Related Project

React Project 1, [Focus Board](../../Day-11/react-project-1/README.md), is a task manager for study, work, and personal tasks. Pantry Ledger is Project 2 and focuses instead on pantry stock, categories, and expiry dates.