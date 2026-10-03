/**
 * ==============================================================================
 * DAY 3 - PART 2: FUNCTIONS, ARROW FUNCTIONS, CALLBACKS & HIGHER-ORDER FUNCTIONS
 * ==============================================================================
 * 
 * Topics Covered:
 * 14. Normal functions (Function Declarations)
 * 15. Anonymous functions
 * 16. Arrow functions (ES6)
 * 17. Callback functions
 * 18. Higher-order functions
 */

console.log("=== 14. NORMAL FUNCTIONS (FUNCTION DECLARATIONS) ===");
// Normal functions are declared with the 'function' keyword.
// They are hoisted (can be called before they are defined in the file).
function calculateTotal(price, taxRate = 0.18) {
    const total = price + (price * taxRate);
    return total.toFixed(2);
}

const billAmount = calculateTotal(100);
console.log("Calculated Total (Normal function):", `$${billAmount}`);

console.log("\n=== 15. ANONYMOUS FUNCTIONS ===");
// An anonymous function is a function without a name, typically assigned to a variable
// or used immediately as an argument.
const greetUser = function(name) {
    return `Hello, welcome back ${name}!`;
};

console.log(greetUser("Balaji"));

console.log("\n=== 16. ARROW FUNCTIONS (ES6) ===");
// Arrow functions provide a concise syntax and lexically bind the 'this' value.

// Standard arrow function with body block
const multiplyValues = (a, b) => {
    return a * b;
};

// Concise single-line arrow function (Implicit Return)
const addTax = (amount) => amount * 1.18;
const square = n => n * n; // Parentheses optional for single parameter

console.log("Multiply (Arrow):", multiplyValues(6, 7)); // 42
console.log("Square (Concise Arrow):", square(9)); // 81

console.log("\n=== 17. CALLBACK FUNCTIONS ===");
// A callback function is a function passed into another function as an argument,
// which is then invoked inside the outer function to complete some routine or action.

function processUserData(username, callbackFn) {
    console.log(`[Database]: Fetching records for user: ${username}...`);
    // Simulated processing
    const userProfile = { id: 101, username: username, status: "Active" };
    // Invoking the callback with the result
    callbackFn(userProfile);
}

// Defining our callback
function displayWelcomeNotification(profile) {
    console.log(`[Notification]: Welcome ${profile.username}! Account status: ${profile.status}`);
}

// Passing the callback function reference
processUserData("balaji_dev", displayWelcomeNotification);

console.log("\n=== 18. HIGHER-ORDER FUNCTIONS ===");
// A Higher-Order Function is a function that either:
// 1. Takes one or more functions as arguments (e.g., map, filter, custom wrappers)
// 2. Returns a new function as its result

// Example 1: Function that takes another function as an argument
function transformArray(items, transformerFn) {
    const result = [];
    for (const item of items) {
        result.push(transformerFn(item));
    }
    return result;
}

const rawPrices = [10, 20, 30];
const formattedPrices = transformArray(rawPrices, price => `$${price}.00`);
console.log("Transformed with custom HOF:", formattedPrices);

// Example 2: Function that RETURNS a new function (Function Factory / Closure)
function createMultiplier(multiplier) {
    return function(num) {
        return num * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("Double 15:", double(15)); // 30
console.log("Triple 15:", triple(15)); // 45
