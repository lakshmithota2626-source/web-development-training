# Day 4: JavaScript OOP, jQuery, AJAX & Tic-Tac-Toe Game

Welcome to **Day 4** of Web Development Training! Today covers Object-Oriented Programming (OOP) in JavaScript, jQuery & jQuery UI suites, asynchronous AJAX data communication, and a complete browser-playable capstone project: **Tic-Tac-Toe Championship**.

---

## 📂 File Structure

```text
Day-4/
├── index.html               # Playable Tic-Tac-Toe Game & Interactive Practice Hub
├── style.css                # Modern dark-mode styling with game animations
├── script.js                # Game Engine (OOP architecture) & component controller
├── 01-javascript-oop.js     # Dedicated OOP Practice (Classes, Inheritance, Private fields)
├── 02-jquery-and-events.js  # Dedicated jQuery & jQuery UI Practice
├── 03-ajax-examples.js      # Dedicated AJAX & Fetch API Practice
└── README.md                # Documentation & Concept Reference
```

---

## 📚 Topics Covered

### 1. JavaScript Object-Oriented Programming (OOP)
- **Classes & Constructor**: Blueprint definition for objects with state initialization.
- **Instance Methods**: Functions bound to instantiated objects (`getProfile()`).
- **Inheritance (`extends`, `super`)**: Subclassing base classes to inherit properties and methods.
- **Encapsulation (`#`)**: Private fields protected from outside mutation.
- **Getters & Setters**: Computed properties with validation.
- **Static Methods**: Utility methods called directly on class blueprints (`Player.compareScores()`).
- **Polymorphism**: Method overriding in derived classes (`AIPlayer` overriding `getProfile()`).

```javascript
class Player {
    #secretKey;
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.#secretKey = 12345;
    }
    get info() { return `${this.name} plays ${this.symbol}`; }
}
```

---

### 2. jQuery Basics & Selectors
- Fast DOM traversal using CSS selectors: `$('#id')`, `$('.class')`, `$('input[type="text"]')`.
- Methods: `.text()`, `.html()`, `.val()`, `.addClass()`, `.removeClass()`, `.append()`, `.prepend()`.

---

### 3. jQuery Events & Animations
- Event handling: `.on('click', handler)`, `.hover()`, `.change()`, `.keyup()`.
- Event Delegation: `$('#list').on('click', '.item', handler)` for dynamic items.
- Built-in Effects: `.fadeIn()`, `.fadeOut()`, `.fadeToggle()`, `.slideUp()`, `.slideDown()`, `.slideToggle()`.

---

### 4. jQuery UI Interactions & Widgets
- **Accordion**: Collapsible content sections.
- **Datepicker**: Native popover date selection.
- **Draggable & Droppable**: Interactive drag-and-drop element management.

---

### 5. AJAX & Fetch API Communication
- **Modern Fetch API (Async/Await)**:
  ```javascript
  async function getData() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await res.json();
      return json;
  }
  ```
- **Fetch POST Payload**: Submitting JSON bodies with customized `Content-Type` headers.
- **Traditional `XMLHttpRequest` (XHR)**: Legacy AJAX handling.
- **jQuery `$.ajax()`**: Streamlined cross-browser network requests.

---

### 6. Capstone Project: Tic-Tac-Toe Game
- **2-Player (Pass & Play)** & **Single Player vs. AI** modes.
- **Smart AI Algorithm**: Automatically checks for winning moves, blocks human threats, and prioritizes center/corner positions.
- **Dynamic Turn Indicator**: Real-time turn badge (`PLAYER X` vs `PLAYER O` / `NEXUS AI`).
- **Winning Line Highlight & Victory Banner**: Animated glowing winning combo detection.
- **Scoreboard**: Tracks Player X wins, Player O wins, and Ties.
- **Match Controls**: Restart match, clear board, and reset scoreboard.
