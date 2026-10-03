# Exercise 3: Reading Tracker

## Objective

Practise arrays, objects, functions, loops, filtering, and updating data in a small reading-list application.

## Problem Statement

Create a reading tracker that stores books, allows new books to be added, tracks read/unread status, and filters the displayed collection.

## Requirements

- Represent a book as an object with an ID, title, author, page count, and read status.
- Store the collection in an array.
- Add, update, remove, summarize, and filter books with functions.
- Use loops to calculate and render the collection.

## Complete Solution

Run [`index.html`](index.html); the behavior is implemented in [`script.js`](script.js). The starter array contains three example books. The form adds a validated object; the list uses event delegation to toggle read status or remove a book.

## Explanation

`getFilteredBooks()` returns a new filtered array. `renderSummary()` uses a `for...of` loop to count read books. `renderBooks()` loops through the visible collection, creates safe DOM nodes with `textContent`, and updates the page. A single listener on the list handles buttons added later.

## Expected Output

Initially, the summary reads `3 total · 1 read · 2 unread`. Adding a book changes the total. Marking or removing a book updates the rows and counts; the filter shows all, read, or unread books.

## How to Run

Open `index.html` in a browser, or serve the repository root with `py -m http.server 5500` and visit `http://localhost:5500/Day-9/exercise-3/`.

## Practice Variation

Add a rating property to each book and a filter that shows books rated 4 or 5.