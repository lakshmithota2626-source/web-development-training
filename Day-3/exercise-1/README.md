# Exercise 1 A-E: JavaScript Practice Pack

> These five prompts are mentor-authored practice aligned to the Day 3 topics because the original Exercise 1 A-E worksheet was not included in the repository or supplied. Replace these prompts if you have the official questions.

## A. Tip Calculator

- **Question:** Given a bill and tip percentage, compute the tip and total.
- **Objective:** Practise variables, numbers, arithmetic, and a function.
- **Code:** `calculateTip(bill, percent)` is in [`script.js`](script.js). It returns `{ tip, total }`.
- **Expected output:** `calculateTip(40, 15)` returns `{ tip: 6, total: 46 }`; the page displays `Tip: $6.00 | Total: $46.00`.
- **Explanation:** Convert the percentage to a decimal, multiply by the bill, then add the tip to get the total.
- **Practice variation:** Add a people count and calculate each person's share.

## B. Score Band

- **Question:** Convert a whole-number score from 0 to 100 into a letter grade.
- **Objective:** Practise comparisons and an if/else chain.
- **Code:** `gradeForScore(score)` is in [`script.js`](script.js).
- **Expected output:** `gradeForScore(84)` returns `"B"`; invalid values return `null`.
- **Explanation:** Test the highest threshold first. The first true condition determines the grade.
- **Practice variation:** Add a separate message for scores under 50.

## C. Loop and Multiples

- **Question:** List the multiples of 3 from 1 through a given limit.
- **Objective:** Practise a `for` loop, modulo, and arrays.
- **Code:** `multiplesOfThree(limit)` is in [`script.js`](script.js).
- **Expected output:** `multiplesOfThree(12)` returns `[3, 6, 9, 12]`.
- **Explanation:** Visit each integer in the range and keep it when `number % 3 === 0`.
- **Practice variation:** List multiples of 3 and 5 and identify common multiples.

## D. Analyze Quiz Scores

- **Question:** Parse comma-separated scores, show passing scores, and calculate their average.
- **Objective:** Practise strings, arrays, `map`, `filter`, and `reduce`.
- **Code:** `analyzeScores(input)` is in [`script.js`](script.js).
- **Expected output:** `"67, 82, 55, 91"` gives passing scores `[67, 82, 91]` and average `80.0`.
- **Explanation:** Split the string, convert values to numbers, filter scores at least 60, then reduce their sum and divide by the passing count.
- **Practice variation:** Also return the highest score and count of failing scores.

## E. Reading List DOM

- **Question:** Add a book object to a list, render it, and remove it through a button.
- **Objective:** Practise objects, arrays, forms, DOM creation, event handling, and event delegation.
- **Code:** The complete add/render/remove flow is in [`script.js`](script.js).
- **Expected output:** Adding `{ title: "DOM Notes", pages: 84 }` creates a list row; its Remove button removes that object and row.
- **Explanation:** The form adds an object to the `books` array. `renderBooks()` creates safe DOM nodes using `textContent`. One listener on the list handles remove buttons, including dynamically created ones.
- **Practice variation:** Add a read/unread status and a toggle button.

## How to Run

Open [`index.html`](index.html) in a browser, or from the repository root start `py -m http.server 5500` and visit `http://localhost:5500/Day-3/exercise-1/`.