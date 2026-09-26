# Day 3: Modern JavaScript Practice & Interactive Lab

Welcome to **Day 3** of Web Development Training! Today focuses on mastering modern JavaScript fundamentals, array manipulation methods, various function paradigms, higher-order functions, DOM manipulation, and event handling.

---

## 📂 File Structure for Day 3

```text
Day-3/
├── index.html                  # Interactive Lab & Visual Sandbox
├── style.css                   # Modern dark mode styling for the lab
├── script.js                   # Interactive Lab Controller
├── 01-arrays-and-methods.js    # Practice file for Topics 1 to 13 (Arrays & Traversal)
├── 02-functions-and-callbacks.js # Practice file for Topics 14 to 18 (Functions & HOFs)
├── 03-dom-and-events.js        # Practice file for Topics 19 to 26 (DOM & Event Handling)
└── README.md                   # Comprehensive explanation reference
```

---

## 📚 Topics Covered (1 - 26)

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
