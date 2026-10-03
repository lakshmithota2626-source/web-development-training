# Day 11 — Java Array Problems & React Project 1: Focus Board

## Objective

Tackle classical algorithmic array manipulation problems in Java using optimal time and space complexity, and build a full-featured, responsive productivity web application (Focus Board) in React 19 with Vite to master component-driven state architecture.

## Technologies

- **Java (JDK 17+):** Two-pointer techniques, in-place array transformations, frequency counting algorithms
- **Frontend Framework:** React 19 (`useState`, `useEffect`, controlled components)
- **Build Tool:** Vite v7.3.6
- **Languages:** JavaScript (ES6+ / JSX), Java
- **Styling:** Vanilla CSS, CSS Grid, Flexbox, custom design tokens

## Features

- **3 Algorithmic Java Array Problems:**
  1. `Problem1RotateArray.java`: Right-rotate an array by `k` steps in $O(n)$ time and $O(1)$ space using the 3-step reversal algorithm.
  2. `Problem2FrequencyCount.java`: Count occurrences of each element while preserving first-seen insertion order.
  3. `Problem3MergeSortedArrays.java`: Merge two pre-sorted integer arrays into one unified sorted array in linear $O(n + m)$ time using the two-pointer strategy.
- **Focus Board (React Project 1):**
  - **Category-Based Task Management:** Organize study, work, and personal tasks with priority badges.
  - **Status Filtering:** View All, Active, or Completed tasks dynamically.
  - **Task Lifecycle:** Add tasks, toggle completion states, and delete items with instant UI updates.
  - **Local Storage Persistence:** Preserves board state across browser refreshes via `useEffect`.
  - **Production Ready:** Verified production Vite build passing with zero errors.

## Project Structure

```text
Day-11/
├── linkedin-post.md         # Day 11 LinkedIn post draft
├── README.md                # Standardized Day 11 documentation
├── java-array-problems/     # Java Algorithm Suite
│   ├── Problem1RotateArray.java
│   ├── Problem2FrequencyCount.java
│   ├── Problem3MergeSortedArrays.java
│   └── README.md
└── react-project-1/         # Focus Board React Application
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── README.md
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/
        │   ├── Header.jsx
        │   ├── TaskForm.jsx
        │   ├── TaskList.jsx
        │   ├── TaskItem.jsx
        │   └── FilterTabs.jsx
        └── styles/
            └── main.css
```

## How to Run

### 1. Compile & Run Java Array Problems
*(Requires JDK with `javac` and `java`)*
```bash
cd Day-11/
javac -d out java-array-problems/Problem1RotateArray.java java-array-problems/Problem2FrequencyCount.java java-array-problems/Problem3MergeSortedArrays.java

java -cp out Problem1RotateArray
java -cp out Problem2FrequencyCount
java -cp out Problem3MergeSortedArrays
```

### 2. Run React Project 1 (Focus Board)
```bash
cd Day-11/react-project-1
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

To create and preview the production build:
```bash
npm run build
npm run preview
```

## What I Learned

- Designing optimal $O(1)$ auxiliary space solutions for array rotation using reversal pointers rather than allocating new temporary arrays.
- Merging pre-sorted data streams efficiently with two pointers without invoking an expensive $O((n+m) \log(n+m))$ sorting algorithm.
- Managing unidirectional data flow and state lifting in React: parent components manage state while children receive data and action callbacks via props.
- Persisting state changes smoothly to browser `localStorage` using synchronization effects.

## Challenges

- **Array Index Bounds & In-Place Swapping:** Edge cases in array reversal where rotation count $k$ exceeds array length $n$ required modular reduction ($k = k \pmod n$).
- **Vite React Component Key Warning:** Ensuring dynamic task lists generate unique IDs rather than using array indices as keys to avoid rendering artifacts during task deletion.

## Future Improvements

- Add drag-and-drop Kanban column reordering to Focus Board.
- Implement due dates and reminder notifications using the Web Notifications API.
- Add unit tests for Java array problems using JUnit 5.