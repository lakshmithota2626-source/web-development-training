/**
 * DAY 3: INTERACTIVE LAB CONTROLLER SCRIPT
 */

// -----------------------------------------------------------------------------
// 1. ARRAY VISUALIZER CONTROLLER
// -----------------------------------------------------------------------------
let liveArray = ["React", "Vue", "Angular", "Node.js"];
const arrayDisplay = document.getElementById('arrayDisplay');
const arrayLogText = document.getElementById('arrayLogText');

function renderArrayChips() {
    arrayDisplay.innerHTML = '';
    liveArray.forEach((item, idx) => {
        const chip = document.createElement('div');
        chip.className = 'array-chip';
        chip.innerHTML = `<span class="chip-idx">[${idx}]</span> <span>${item}</span>`;
        arrayDisplay.appendChild(chip);
    });
}

function logArrayOp(message) {
    const time = new Date().toLocaleTimeString();
    arrayLogText.textContent = `[${time}] ${message}\nCurrent Array (${liveArray.length} items): [ ${liveArray.map(x => `"${x}"`).join(', ')} ]`;
}

// Initial render
renderArrayChips();
logArrayOp("Initial array loaded.");

// Array Action Listeners
document.getElementById('btnPush').addEventListener('click', () => {
    const newItem = `Item_${liveArray.length + 1}`;
    liveArray.push(newItem);
    renderArrayChips();
    logArrayOp(`push("${newItem}") -> Element added to the END.`);
});

document.getElementById('btnPop').addEventListener('click', () => {
    if (liveArray.length === 0) {
        logArrayOp("Array is already empty! Cannot pop.");
        return;
    }
    const popped = liveArray.pop();
    renderArrayChips();
    logArrayOp(`pop() -> Removed "${popped}" from the END.`);
});

document.getElementById('btnUnshift').addEventListener('click', () => {
    const newItem = `Item_0`;
    liveArray.unshift(newItem);
    renderArrayChips();
    logArrayOp(`unshift("${newItem}") -> Element added to the BEGINNING.`);
});

document.getElementById('btnShift').addEventListener('click', () => {
    if (liveArray.length === 0) {
        logArrayOp("Array is already empty! Cannot shift.");
        return;
    }
    const shifted = liveArray.shift();
    renderArrayChips();
    logArrayOp(`shift() -> Removed "${shifted}" from the BEGINNING.`);
});

document.getElementById('btnMap').addEventListener('click', () => {
    liveArray = liveArray.map(item => item.toUpperCase());
    renderArrayChips();
    logArrayOp("map(item => item.toUpperCase()) -> Transformed all elements to uppercase.");
});

document.getElementById('btnFilter').addEventListener('click', () => {
    liveArray = liveArray.filter(item => item.length > 5);
    renderArrayChips();
    logArrayOp("filter(item => item.length > 5) -> Kept only elements with > 5 characters.");
});

document.getElementById('btnResetArray').addEventListener('click', () => {
    liveArray = ["React", "Vue", "Angular", "Node.js"];
    renderArrayChips();
    logArrayOp("Array reset to default values.");
});

// -----------------------------------------------------------------------------
// 2. HIGHER-ORDER FUNCTION CALCULATOR CONTROLLER
// -----------------------------------------------------------------------------
const numA = document.getElementById('numA');
const numB = document.getElementById('numB');
const operationSelect = document.getElementById('operationSelect');
const btnExecCalc = document.getElementById('btnExecCalc');
const calcResult = document.getElementById('calcResult');

// Normal Function
function add(a, b) { return a + b; }

// Arrow Function
const multiply = (a, b) => a * b;

// Anonymous Function
const power = function(a, b) { return Math.pow(a, b); };

// Higher-Order Function taking callback operation
function executeMathOperation(a, b, operationCallback) {
    return operationCallback(a, b);
}

btnExecCalc.addEventListener('click', () => {
    const valA = parseFloat(numA.value) || 0;
    const valB = parseFloat(numB.value) || 0;
    const op = operationSelect.value;

    let callbackFn;
    let opName;

    if (op === 'add') {
        callbackFn = add;
        opName = "Normal Function: add(a, b)";
    } else if (op === 'multiply') {
        callbackFn = multiply;
        opName = "Arrow Function: (a, b) => a * b";
    } else {
        callbackFn = power;
        opName = "Anonymous Function: function(a, b)";
    }

    const output = executeMathOperation(valA, valB, callbackFn);
    calcResult.textContent = `Result (${opName}): ${output}`;
});

// -----------------------------------------------------------------------------
// 3. DOM SANDBOX CONTROLLER
// -----------------------------------------------------------------------------
function replaceSample() {
    const sample = document.getElementById('sampleCard');
    if (sample) {
        replaceCardContent(sample, "Replaced dynamically using element.replaceWith() at " + new Date().toLocaleTimeString());
    }
}

document.getElementById('btnStyleAll').addEventListener('click', () => {
    const cards = document.querySelectorAll('.dynamic-card');
    cards.forEach(card => {
        applyHighlightStyles(card);
    });
});
