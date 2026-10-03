# Exercise 5: Study Planner

## Objective

Combine JavaScript objects, arrays, functions, form handling, DOM events, filtering, and browser storage in a small study-planning application.

## Problem Statement

Create study tasks with a topic and due date. Allow a learner to complete, reopen, filter, and remove tasks, and preserve the list between page visits in the same browser.

## Requirements

- Store each task as an object in an array.
- Add tasks from a validated form.
- Render task rows safely and respond to complete/remove events.
- Filter all, active, and completed tasks.
- Save and load tasks with local storage, handling invalid saved JSON.

## Complete Solution

Run [`index.html`](index.html); [`script.js`](script.js) contains the application. Task data uses the `web-training-day9-study-tasks` local-storage key in the current browser.

## Explanation

`loadTasks()` parses and validates saved data. A submit listener creates a task object and saves the array. `renderTasks()` filters tasks, creates rows, and calculates the completion count. One delegated click listener handles buttons added to the list; every change is then saved.

## Expected Output

Adding a task displays its title, topic, and due date. Complete changes the status and count. Filters show all, unfinished, or completed tasks. Refreshing the page keeps the current task list in that browser.

## How to Run

Open `index.html` in a browser, or serve the repository root with `py -m http.server 5500` and visit `http://localhost:5500/Day-9/exercise-5/`.

## Practice Variation

Add a priority field and sort high-priority tasks before the others.