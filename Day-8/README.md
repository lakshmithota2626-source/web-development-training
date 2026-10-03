# Day 8: React Foundations

## Objective

Learn how React components describe a user interface and how props, state, events, and hooks make it interactive.

## Technologies

- HTML5 and CSS3
- React 18
- JavaScript and JSX
- React DOM

The React lesson loads React and Babel Standalone from the unpkg CDN. A network connection is needed for the interactive demo; no local package installation or build step is required.

## Features

- Beginner-friendly explanations of JSX, components, props, state, events, and hooks.
- A React-rendered profile preview that updates from a controlled input.
- An interactive counter demonstrating `useState` and click events.
- A `useEffect` example that persists the count and updates the browser tab title.
- Responsive layout with keyboard-visible focus states.

## Project Structure

```text
Day-8/
├── react.html   # Day 8 React foundations lesson and live demo
├── index.html   # Existing Redux learning dashboard, preserved
├── style.css    # Existing Redux dashboard styles, preserved
├── script.js    # Existing Redux dashboard behavior, preserved
├── linkedin-post.md # Day 8 React learning draft
└── README.md
```

The Redux dashboard is retained unchanged. It is not counted as the Day 8 React deliverable in the 13-day schedule.

## How to Run

From the repository root, start a local static server:

```bash
py -m http.server 5500
```

Open `http://localhost:5500/Day-8/react.html` in a browser. Keep the server running while using the page. The React/Babel CDN scripts require internet access.

## What I Learned

- JSX is transformed into JavaScript before it runs in the browser.
- Components can be reused and receive read-only inputs through props.
- State updates cause React to render the component again.
- Event handlers connect user actions to state changes.
- Effects are useful for synchronizing React with browser features such as the document title and local storage.

## Challenges

- Distinguishing props, which are passed in, from state, which a component owns and updates.
- Loading the React demo from a static page while keeping the lesson simple to run.

## Future Improvements

- Revisit the existing Redux dashboard when organizing the Day 9 Redux module.
- Add a locally installed React development setup in a later project that uses npm tooling.

## GitHub

This lesson is part of the current Web Development Training repository. No external repository URL is listed here.

## LinkedIn Draft

See [`linkedin-post.md`](linkedin-post.md). It is a draft and has not been posted externally.