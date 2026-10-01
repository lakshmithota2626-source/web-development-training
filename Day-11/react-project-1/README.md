# React Project 1: Focus Board

## Objective

Build a practical task manager that helps a learner capture, organize, filter, and complete study, work, and personal tasks.

This project fits a beginner-to-intermediate React learner because it turns familiar task-list behavior into small components and gives practice with forms, props, state, lists, filtering, conditional UI, and browser persistence without needing a backend.

## Features

- Add tasks with a category, priority, and optional due date.
- Mark tasks complete or reopen them; remove individual tasks.
- Filter by task status and category, and search title/category text.
- See total, open, and completed counts with a progress bar.
- Clear all completed tasks.
- Show overdue and due-today labels.
- Persist tasks in the current browser's local storage.
- Responsive layout for desktop and mobile.

## Technologies

- React 19 and JSX
- JavaScript ES modules
- Vite
- CSS Grid, Flexbox, and responsive media queries
- Browser local storage

## Folder Structure

```text
react-project-1/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── ProgressSummary.jsx
    │   ├── TaskFilters.jsx
    │   ├── TaskForm.jsx
    │   ├── TaskItem.jsx
    │   └── TaskList.jsx
    └── styles/
        └── main.css
```

## Installation

Install Node.js, open a terminal in this project folder, and install the dependencies:

```bash
npm install
```

## How to Run

Start the development server:

```bash
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173/`. Create a production build with:

```bash
npm run build
```

## How It Works

- `App` owns task data, filters, search text, storage, and task update handlers.
- `TaskForm` keeps controlled input values in state and calls `onAdd` when submitted.
- `TaskFilters` receives filter values and setter callbacks through props.
- `TaskList` maps visible tasks into rows or conditionally shows an empty state.
- `TaskItem` receives one task and its event handlers through props.
- `ProgressSummary` calculates and displays task totals and completion percentage.
- `useEffect` saves task state to local storage when tasks change.

## What I Learned

- How to split a React app into components with clear responsibilities.
- How props pass data and event callbacks between components.
- How controlled forms and event handlers update state.
- How `filter`, `map`, and `sort` create a visible task list from application state.
- How conditional rendering handles empty lists and completed tasks.
- How `useEffect` can persist state in the browser.

## Future Improvements

- Add editing for existing tasks.
- Add drag-and-drop ordering.
- Add labels and recurring tasks.
- Add automated tests for form validation and task filters.