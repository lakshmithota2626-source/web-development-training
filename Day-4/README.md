# Day 4 — JavaScript OOP, jQuery, AJAX & Tic-Tac-Toe Game

## Objective

Master Object-Oriented Programming (OOP) in JavaScript (ES6+ classes, encapsulation, inheritance, polymorphism), explore DOM manipulation with jQuery and jQuery UI, implement asynchronous data fetching via AJAX (`fetch` / `XMLHttpRequest`), and construct a complete browser-based capstone game: Tic-Tac-Toe Championship with an intelligent AI opponent.

## Technologies

- **JavaScript (ES6+):** Classes, `#privateFields`, getters/setters, static methods, inheritance (`extends`, `super`), `async/await`, Fetch API
- **jQuery & jQuery UI:** DOM selection, event delegation, `.fadeIn()`/`.slideToggle()` animation effects, draggable/sortable widgets
- **HTML5 & CSS3:** Semantic structure, CSS Grid game board, glowing neon victory highlights, responsive layouts
- **Tooling:** Node.js, npm, npx

## Features

- **Object-Oriented Game Engine:** Built using a modular `TicTacToeGame` class cleanly separating board state, player management, and win-condition algorithms.
- **Smart AI Opponent:** Heuristic single-player AI mode that detects immediate winning strikes, blocks human player victories, and prioritizes strategic center and corner squares.
- **2-Player Local Pass-and-Play:** Turn-by-turn multiplayer on the same device with interactive turn indicators.
- **Interactive Practice Modules:** Dedicated runnable scripts demonstrating OOP (`01-javascript-oop.js`), jQuery event handling (`02-jquery-and-events.js`), and AJAX data communication (`03-ajax-examples.js`).
- **Scoreboard & Game Controls:** Session win counters for Player X, Player O, and Ties with board reset and scoreboard wipe buttons.

## Project Structure

```text
Day-4/
├── index.html               # Playable Tic-Tac-Toe Game & Interactive Practice Hub
├── style.css                # Modern dark-mode styling with game animations
├── script.js                # Game Engine (OOP architecture) & component controller
├── 01-javascript-oop.js     # Dedicated OOP Practice (Classes, Inheritance, Private fields)
├── 02-jquery-and-events.js  # Dedicated jQuery & jQuery UI Practice
├── 03-ajax-examples.js      # Dedicated AJAX & Fetch API Practice
├── linkedin-post.md         # Day 4 LinkedIn post draft
└── README.md                # Standardized Day 4 documentation
```

## How to Run

1. **Playable Game & Hub:**
   Open `Day-4/index.html` directly in any web browser, or serve via:
   ```bash
   python -m http.server 5500
   ```
   Navigate to `http://localhost:5500/Day-4/`.

2. **Run Node.js Practice Scripts:**
   ```bash
   node Day-4/01-javascript-oop.js
   node Day-4/03-ajax-examples.js
   ```

3. **Verify Node.js & npm Environment:**
   ```bash
   node --version
   npm --version
   npx --version
   ```

## What I Learned

- How ES6 classes provide syntactic sugar over JavaScript prototype-based inheritance.
- Encapsulation techniques using true private class fields (`#secretKey`) vs conventional underscore notation (`_prop`).
- The transition from legacy `XMLHttpRequest` and jQuery `$.ajax()` to the modern `fetch()` API and `async/await` syntax.
- Managing turn-based game state immutably and calculating winning combinations (rows, columns, diagonals) via matrix coordinate checks.

## Challenges

- **AI Decision Logic:** Ensuring the single-player AI prioritized blocking human wins before making random moves without introducing perceptible lag.
- **jQuery vs. Vanilla DOM Performance:** Managing DOM updates efficiently when using jQuery animations alongside native ES6 DOM listeners.

## Future Improvements

- Implement the Minimax algorithm for an unbeatable "Grandmaster" AI difficulty tier.
- Add Web Audio sound effects for moves, win celebrations, and game draws.
- Implement online multiplayer over WebSockets or WebRTC peer-to-peer connections.
