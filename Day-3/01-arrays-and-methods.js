/**
 * ==============================================================================
 * DAY 3 - PART 1: ARRAYS, TRAVERSAL & ARRAY METHODS
 * ==============================================================================
 * 
 * Topics Covered:
 * 1. Arrays (Creation, indexing)
 * 2. Array Traversal
 * 3. for loop
 * 4. forEach()
 * 5. for...of
 * 6. map()
 * 7. filter()
 * 8. push()
 * 9. pop()
 * 10. shift()
 * 11. unshift()
 * 12. slice()
 * 13. splice()
 */

console.log("=== 1. ARRAYS ===");
// An array is an ordered collection of values that can store multiple data types.
const fruits = ["Apple", "Banana", "Cherry", "Mango"];
console.log("Fruits Array:", fruits);
console.log("First Fruit (Index 0):", fruits[0]); // "Apple"
console.log("Total Count (Length):", fruits.length); // 4

console.log("\n=== 2 & 3. ARRAY TRAVERSAL USING TRADITIONAL FOR LOOP ===");
// Traditional for-loop: Index-based iteration, perfect when index control is required.
for (let i = 0; i < fruits.length; i++) {
    console.log(`Index ${i} -> ${fruits[i]}`);
}

console.log("\n=== 4. ARRAY TRAVERSAL USING forEach() ===");
// forEach() executes a provided callback function once for each array element.
// Note: forEach does not return a new array and cannot be stopped with 'break'.
fruits.forEach((fruit, index) => {
    console.log(`forEach: [${index}] ${fruit}`);
});

console.log("\n=== 5. ARRAY TRAVERSAL USING for...of ===");
// for...of iterates directly over the values of an iterable (clean and readable).
for (const item of fruits) {
    console.log("for...of Item:", item);
}

console.log("\n=== 6. map() METHOD ===");
// map() creates a NEW array populated with the results of calling a function on every element.
// Pure function: Does not mutate the original array.
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(num => num * num);
console.log("Original Numbers:", numbers);
console.log("Squared with map():", squaredNumbers); // [1, 4, 9, 16, 25]

console.log("\n=== 7. filter() METHOD ===");
// filter() creates a shallow copy of a portion of an array, filtered down to elements
// that pass the test implemented by the provided callback function.
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Even Numbers with filter():", evenNumbers); // [2, 4]

console.log("\n=== 8 & 9. push() AND pop() (STACK OPERATIONS - END) ===");
const stack = ["Task 1", "Task 2"];

// push() adds one or more elements to the END of an array and returns new length
stack.push("Task 3");
console.log("After push('Task 3'):", stack); // ["Task 1", "Task 2", "Task 3"]

// pop() removes the LAST element from an array and returns that element
const poppedItem = stack.pop();
console.log("Popped Item:", poppedItem); // "Task 3"
console.log("Stack after pop():", stack); // ["Task 1", "Task 2"]

console.log("\n=== 10 & 11. shift() AND unshift() (QUEUE OPERATIONS - START) ===");
const queue = ["User B", "User C"];

// unshift() adds one or more elements to the BEGINNING of an array
queue.unshift("User A");
console.log("After unshift('User A'):", queue); // ["User A", "User B", "User C"]

// shift() removes the FIRST element from an array and returns it
const shiftedUser = queue.shift();
console.log("Shifted (Removed first):", shiftedUser); // "User A"
console.log("Queue after shift():", queue); // ["User B", "User C"]

console.log("\n=== 12. slice() (NON-MUTATING EXTRACTION) ===");
// slice(startIndex, endIndex) returns a shallow copy of a portion of an array.
// Note: endIndex is NOT included. Does NOT modify the original array.
const colors = ["Red", "Green", "Blue", "Yellow", "Purple"];
const rgb = colors.slice(0, 3);
console.log("Original Colors:", colors);
console.log("Sliced (0 to 3):", rgb); // ["Red", "Green", "Blue"]

console.log("\n=== 13. splice() (MUTATING INSERTION/DELETION) ===");
// splice(startIndex, deleteCount, item1, item2, ...) changes the contents of an array
// by removing or replacing existing elements and/or adding new elements in place.
const animals = ["Dog", "Cat", "Elephant", "Lion"];

// Remove 1 element at index 1 ("Cat") and insert "Tiger" and "Cheetah"
const removedAnimals = animals.splice(1, 1, "Tiger", "Cheetah");
console.log("Removed Animal via splice:", removedAnimals); // ["Cat"]
console.log("Animals Array after splice:", animals); // ["Dog", "Tiger", "Cheetah", "Elephant", "Lion"]
