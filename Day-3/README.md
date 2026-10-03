# Day 3 — Modern JavaScript Practice Lab, Arrays, Functions & DOM

## Objective

Master modern ECMAScript fundamentals, array manipulation algorithms, functional programming paradigms, higher-order functions, dynamic DOM element creation/mutation, and interactive event handling through executable practice scripts and an interactive browser-based lab.

## Technologies

- **JavaScript (Modern ES6+):** Arrow functions, callbacks, higher-order functions (`map`, `filter`, `reduce`), array mutation vs non-mutation methods, DOM querying, DOM mutation
- **HTML5:** Interactive test lab interface and exercise sandboxes
- **CSS3:** Dark-mode dashboard layout and live visual output consoles
- **Runtime:** Node.js for CLI script execution and modern web browser DevTools

## Features

- **26 Core JavaScript Topics:** In-depth coverage across 3 major categories: Arrays & Traversal, Functions & Callbacks, and DOM & Event Handling.
- **Interactive Visual Lab (`index.html`):** Live browser sandbox allowing real-time testing of array operations, callback transformations, and dynamic DOM manipulation with immediate UI feedback.
- **Dedicated Script Modules:** Cleanly partitioned runnable practice scripts (`01-arrays-and-methods.js`, `02-functions-and-callbacks.js`, `03-dom-and-events.js`).
- **Exercise 1 Practice Pack (`exercise-1/`):** Hands-on practice series (A through E) covering array processing, custom callbacks, and DOM element workflows.

## Project Structure

```text
Day-3/
├── index.html                    # Interactive Lab & Visual Sandbox
├── style.css                     # Modern dark-mode styling for the lab
├── script.js                     # Interactive Lab Controller
├── 01-arrays-and-methods.js      # Practice file for Topics 1 to 13 (Arrays & Traversal)
├── 02-functions-and-callbacks.js # Practice file for Topics 14 to 18 (Functions & HOFs)
├── 03-dom-and-events.js          # Practice file for Topics 19 to 26 (DOM & Event Handling)
├── exercise-1/                   # Mentor-authored Exercise 1 A-E practice pack
│   ├── index.html
│   ├── script.js
│   └── README.md
├── linkedin-post.md              # Day 3 LinkedIn post draft
└── README.md                     # Comprehensive explanation reference
```

## How to Run

1. **Interactive Browser Lab:**
   Open `Day-3/index.html` directly in your browser or serve via `python -m http.server 5500` and visit `http://localhost:5500/Day-3/`.
2. **Terminal Execution via Node.js:**
   ```bash
   node Day-3/01-arrays-and-methods.js
   node Day-3/02-functions-and-callbacks.js
   node Day-3/03-dom-and-events.js
   ```

## What I Learned

### Part 1: Arrays, Traversal & Array Methods

#### 1. Arrays
An array is an ordered list of values enclosed in square brackets `[]`. In JavaScript, arrays can hold mixed data types and dynamic lengths.
```javascript
const fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // "Apple"
```

#### 2. Array Traversal
The process of accessing every element in an array one by one.

#### 3. `for` loop
Traditional index-based loop. Useful when you need fine-grained control over the index or step counter.
```javascript
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
```

#### 4. `forEach()`
Executes a callback function for each array element. Does not return a new array.
```javascript
fruits.forEach((item, index) => {
    console.log(index, item);
});
```

#### 5. `for...of`
Clean, modern ES6 loop for iterating over values of iterable objects (arrays, strings, sets).
```javascript
for (const fruit of fruits) {
    console.log(fruit);
}
```

#### 6. `map()`
Returns a **new array** containing the results of applying a transformation function to each element. Non-mutating.
```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // [2, 4, 6]
```

#### 7. `filter()`
Returns a **new array** with all elements that pass the test implemented by the callback function.
```javascript
const evens = [1, 2, 3, 4].filter(n => n % 2 === 0); // [2, 4]
```

#### 8. `push()`
Adds one or more elements to the **end** of an array and returns the new length. (Mutates original array)
```javascript
const stack = ["A"];
stack.push("B"); // ["A", "B"]
```

#### 9. `pop()`
Removes the **last** element from an array and returns that element. (Mutates original array)
```javascript
const removed = stack.pop(); // "B"
```

#### 10. `shift()`
Removes the **first** element from an array and returns it. (Mutates original array)
```javascript
const queue = ["First", "Second"];
const first = queue.shift(); // "First"
```

#### 11. `unshift()`
Adds one or more elements to the **beginning** of an array and returns the new length. (Mutates original array)
```javascript
queue.unshift("Zero"); // ["Zero", "Second"]
```

#### 12. `slice()`
Returns a shallow copy of a portion of an array into a new array. Does **not** modify the original array.
```javascript
const letters = ["A", "B", "C", "D"];
const sub = letters.slice(1, 3); // ["B", "C"]
```

#### 13. `splice()`
Modifies an array in place by removing, replacing, or adding elements.
```javascript
const list = ["A", "B", "E"];
list.splice(2, 0, "C", "D"); // Inserts "C" and "D" at index 2
```

---

### Part 2: Functions, Callbacks & Higher-Order Functions

#### 14. Normal Functions (Function Declarations)
Defined with the `function` keyword. Hoisted to the top of their scope.
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
```

#### 15. Anonymous Functions
Functions without a name, typically assigned to a variable or passed inline.
```javascript
const greet = function(name) {
    return `Hello, ${name}!`;
};
```

#### 16. Arrow Functions (ES6)
Concise syntax using `=>`. Does not bind its own `this`.
```javascript
const add = (a, b) => a + b;
```

#### 17. Callback Functions
A function passed into another function as an argument, to be executed later.
```javascript
function fetchData(callback) {
    const data = { status: 200 };
    callback(data);
}
fetchData(res => console.log(res));
```

#### 18. Higher-Order Functions (HOF)
A function that accepts another function as an argument, returns a function, or both (e.g. `map`, `filter`, custom factories).
```javascript
function multiplier(factor) {
    return (num) => num * factor;
}
const triple = multiplier(3);
triple(10); // 30
```

---

### Part 3: DOM Manipulation & Event Handling

#### 19. DOM Manipulation
The Document Object Model (DOM) represents HTML as a tree of objects that JavaScript can dynamically read, alter, add, and remove.

#### 20. DOM Element Selection
- `document.getElementById('id')`: Fastest selection for unique IDs.
- `document.querySelector('.class / #id')`: Selects first match using CSS selector.
- `document.querySelectorAll('.class')`: Returns a static `NodeList` of all matching elements.

#### 21. Creating Elements
- `document.createElement(tagName)`: Creates a new element node.
- `parent.appendChild(node)` or `parent.append(node)` / `parent.prepend(node)`: Inserts element into the DOM tree.

#### 22. Removing Elements
- `element.remove()`: Directly removes the element from the DOM.
- `parent.removeChild(child)`: Legacy removal via parent node.

#### 23. Replacing Elements
- `element.replaceWith(newElement)`: Swaps an existing DOM node with a new element.
- `parent.replaceChild(newChild, oldChild)`: Legacy replacement syntax.

#### 24. JavaScript Styling
- `element.style.color = 'blue'`: Direct inline styles.
- `element.classList.add('active')`, `remove()`, `toggle()`: Best practice class-based styling.

#### 25. Event Handling
Responding to user interactions such as mouse clicks, keyboard presses, form submissions, or scrolling.

#### 26. `addEventListener()`
Standard method to attach event listeners to DOM elements. Supports multiple listeners on the same element and clean removal with `removeEventListener()`.
```javascript
const btn = document.querySelector('#myBtn');
btn.addEventListener('click', (event) => {
    console.log('Button clicked!', event.target);
});
```

## Challenges

- **Global Scope Collisions:** Initially, scripts sharing helper functions like `multiply` risked variable name collisions when loaded in the same browser window. Resolved by scoping exercise logic inside dedicated blocks/IIFEs and separate modules.
- **Node vs. Browser DOM API:** Practice files covering both pure algorithms and DOM methods required distinguishing Node.js runnable algorithms from browser-only DOM features.

## Future Improvements

- Add automated unit tests with Jest / Vitest for array transformation exercises.
- Implement an interactive code editor directly in the browser lab using Monaco Editor.
- Add practice problems for Promises, `async/await`, and the Fetch API.

