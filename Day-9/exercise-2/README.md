# Exercise 2: Monthly Budget Summary

## Objective

Practise JavaScript variables, numbers, arithmetic, functions, and conditionals by summarizing a monthly budget.

## Problem Statement

Given monthly income and four expense categories, calculate total expenses, remaining money, and the savings percentage. Classify the result as over budget, on track (at least 20% remaining), or review spending.

## Requirements

- Accept a positive income and non-negative expense amounts.
- Calculate totals and a percentage using a named function.
- Use conditionals to choose a useful status.
- Display a readable result without reloading the page.

## Complete Solution

The runnable solution is [`index.html`](index.html) and [`script.js`](script.js). `summarizeBudget(income, expenses)` returns the expense total, remaining balance, savings rate, and status. The form handler validates input and writes a formatted summary to the page.

## Explanation

The expense values are grouped in an object. `Object.values()` turns them into an array, and `reduce()` adds them. The remaining amount is income minus expenses; dividing it by income gives the savings rate. An `if / else if / else` chooses the status.

## Expected Output

With the prefilled values: income `$3,000.00`, expenses `$1,950.00`, remaining `$1,050.00`, savings rate `35.0%`, status `On track`.

## How to Run

Open `index.html` in a browser, or serve the repository root with `py -m http.server 5500` and visit `http://localhost:5500/Day-9/exercise-2/`.

## Practice Variation

Add a savings-goal input and show whether the remaining amount meets that goal.