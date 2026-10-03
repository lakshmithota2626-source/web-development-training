# Day 9 — Redux Foundations & JavaScript Exercises 2–5

## Objective

Master predictable global state management using Redux, Redux Toolkit, and React-Redux. Deepen practical JavaScript algorithmic problem solving by building four standalone, runnable applications (Exercises 2 through 5) covering financial calculations, collection tracking, dynamic DOM delegation, and persistent study planning.

## Technologies

- **Global State Management:** Redux architecture, Redux Toolkit (`configureStore`, `createSlice`), React-Redux (`Provider`, `useSelector`, `useDispatch`)
- **JavaScript (Vanilla ES6+):** Objects, arrays, closures, Higher-Order Functions (`filter`, `reduce`), event delegation, local storage API
- **HTML5 & CSS3:** Semantic markup, responsive forms, modern dark-mode interfaces
- **Runtime:** Node.js and web browser execution

## Features

- **Redux Learning Suite (`redux.html`):** In-depth conceptual guide breaking down the single source of truth, one-way data flow, actions, reducers, store configuration, and slice architecture with visual flow diagrams.
- **Exercise 2 — Monthly Budget Summary (`exercise-2/`):** Real-time income and expense calculation engine with percentage breakdowns, threshold alerts, and formatted currency outputs.
- **Exercise 3 — Reading Tracker (`exercise-3/`):** Interactive book collection manager with status filtering (Want to Read, Currently Reading, Completed), rating assigners, and summary statistics.
- **Exercise 4 — Workshop RSVP Board (`exercise-4/`):** Event registration system demonstrating robust form validation, dynamic DOM list creation, seat capacity limits, and event-delegated attendee removal.
- **Exercise 5 — Study Planner (`exercise-5/`):** Productivity application combining task creation, category tags, completion toggles, status filters, and persistent `localStorage` synchronization.

## Project Structure

```text
Day-9/
├── redux.html        # Comprehensive Redux foundations lesson and reference
├── style.css         # Redux lesson page styling
├── linkedin-post.md  # Day 9 LinkedIn post draft
├── README.md         # Standardized Day 9 documentation
├── exercise-2/       # Monthly Budget Summary
│   ├── index.html
│   ├── script.js
│   └── README.md
├── exercise-3/       # Reading Tracker
│   ├── index.html
│   ├── script.js
│   └── README.md
├── exercise-4/       # Workshop RSVP Board
│   ├── index.html
│   ├── script.js
│   └── README.md
└── exercise-5/       # Study Planner
    ├── index.html
    ├── script.js
    └── README.md
```

## How to Run

1. Start a local static server from the repository root:
   ```bash
   python -m http.server 5500
   ```

2. Open the individual modules in your web browser:
   - Redux Foundations: `http://localhost:5500/Day-9/redux.html`
   - Exercise 2 (Budget): `http://localhost:5500/Day-9/exercise-2/`
   - Exercise 3 (Reading): `http://localhost:5500/Day-9/exercise-3/`
   - Exercise 4 (RSVP Board): `http://localhost:5500/Day-9/exercise-4/`
   - Exercise 5 (Study Planner): `http://localhost:5500/Day-9/exercise-5/`

3. Or open any `index.html` file directly from File Explorer.

## What I Learned

- Why centralized global state prevents "prop drilling" across deeply nested component hierarchies.
- Redux's core rules: state is read-only, changes are made only via pure reducer functions, and actions describe state transitions.
- How Redux Toolkit simplifies boilerplate using `createSlice` which leverages Immer for safe "mutating" syntax.
- Effective use of DOM event delegation (`element.addEventListener` on container) to efficiently manage dynamic lists without attaching dozens of individual listeners.
- Using `JSON.stringify` and `JSON.parse` with browser `localStorage` for lightweight data persistence.

## Challenges

- **Understanding Redux Immutability:** Internalizing why returning a new state object instead of mutating the current state is necessary for shallow equality checking and UI re-renders.
- **Form Input Sanitization in Dynamic DOM:** Ensuring that dynamically appended attendee cards and study tasks do not introduce script injection vulnerabilities.

## Future Improvements

- Convert Exercise 5 (Study Planner) into a full React-Redux single-page application.
- Add Redux DevTools extension integration to demonstrate time-travel debugging.
- Add drag-and-drop task reordering in the Study Planner using the HTML Drag and Drop API.