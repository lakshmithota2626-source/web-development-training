# Exercise 4: Workshop RSVP Board

## Objective

Practise DOM selection and creation, form submission, input validation, event listeners, and event delegation.

## Problem Statement

Build a workshop registration form. Each valid submission adds an attendee to the page; an attendee can be removed without reloading the document.

## Requirements

- Collect a name, valid email, and session choice.
- Handle the form's `submit` event and prevent page navigation.
- Reject duplicate email addresses regardless of letter case.
- Create and remove attendee rows through DOM APIs.
- Use one click listener on the list to handle remove buttons added later.

## Complete Solution

Open [`index.html`](index.html); [`script.js`](script.js) contains the complete solution. The attendee array is the source data. Rendering builds new rows using `createElement()` and `textContent`, while event delegation removes the selected attendee.

## Explanation

The form listener reads values with `FormData`, checks required content, and compares normalized email addresses with `some()`. It adds a valid attendee and calls `renderAttendees()`. A single listener on the list finds the clicked remove button with `closest()`, removes that attendee from the array, and renders again.

## Expected Output

After a valid submission, the attendee count increases and the attendee row displays the name, email, and session. Reusing the email displays a duplicate warning. Clicking Remove deletes the corresponding row and decreases the count.

## How to Run

Open `index.html` in a browser, or serve the repository root with `py -m http.server 5500` and visit `http://localhost:5500/Day-9/exercise-4/`.

## Practice Variation

Add a capacity limit and reject new registrations when that limit is reached.