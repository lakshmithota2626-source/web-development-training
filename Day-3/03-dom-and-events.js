/**
 * ==============================================================================
 * DAY 3 - PART 3: DOM MANIPULATION, ELEMENT SELECTION, STYLING & EVENT HANDLING
 * ==============================================================================
 * 
 * Topics Covered:
 * 19. DOM manipulation overview
 * 20. DOM element selection
 * 21. Creating elements
 * 22. Removing elements
 * 23. Replacing elements
 * 24. JavaScript styling
 * 25. Event handling
 * 26. addEventListener()
 */

// 19 & 20. DOM ELEMENT SELECTION
console.log("=== 20. DOM ELEMENT SELECTION METHODS ===");

// 1. Selection by ID
const demoContainer = document.getElementById('demoSandbox');

// 2. Selection by CSS Selector (First match)
const primaryHeader = document.querySelector('.sandbox-header');

// 3. Selection by CSS Selector (All matches - NodeList)
const allPills = document.querySelectorAll('.demo-pill');

// 4. Selection by Class Name (HTMLCollection)
const activeCards = document.getElementsByClassName('active-card');

console.log("Found demo container:", demoContainer);
console.log("Found total pills:", allPills.length);

// 21. CREATING AND APPENDING ELEMENTS
console.log("\n=== 21. CREATING ELEMENTS ===");

function createNewNotificationCard(titleText, messageText) {
    // 1. Create wrapper element
    const newCard = document.createElement('div');
    newCard.className = 'dynamic-card';
    newCard.id = `card-${Date.now()}`;

    // 2. Create and configure inner elements
    const heading = document.createElement('h4');
    heading.textContent = titleText;

    const paragraph = document.createElement('p');
    paragraph.textContent = messageText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = '✕ Remove';

    // 3. Attach click event to newly created element (Topic 26)
    deleteBtn.addEventListener('click', () => {
        removeCardElement(newCard);
    });

    // 4. Assemble element hierarchy
    newCard.appendChild(heading);
    newCard.appendChild(paragraph);
    newCard.appendChild(deleteBtn);

    return newCard;
}

// 22. REMOVING ELEMENTS
console.log("\n=== 22. REMOVING ELEMENTS ===");

function removeCardElement(elementToRemove) {
    if (elementToRemove && elementToRemove.parentNode) {
        // Modern approach: element.remove()
        elementToRemove.remove();
        console.log(`Element ${elementToRemove.id} removed from DOM.`);
    }
}

// 23. REPLACING ELEMENTS
console.log("\n=== 23. REPLACING ELEMENTS ===");

function replaceCardContent(oldElement, newContentText) {
    const replacementElement = document.createElement('div');
    replacementElement.className = 'replaced-card';
    replacementElement.textContent = `[Updated]: ${newContentText}`;
    
    // Using modern replaceWith or legacy parent.replaceChild
    oldElement.replaceWith(replacementElement);
    console.log("Element replaced successfully.");
}

// 24. JAVASCRIPT STYLING & CLASSLIST MANIPULATION
console.log("\n=== 24. JAVASCRIPT STYLING ===");

function applyHighlightStyles(element) {
    // Method 1: Direct inline styling via .style property
    element.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
    element.style.border = '2px solid #6366f1';
    element.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.5)';
    element.style.transition = 'all 0.3s ease';

    // Method 2 (Recommended for scalable clean code): classList manipulation
    element.classList.add('is-highlighted');
    // element.classList.remove('is-dimmed');
    // element.classList.toggle('active-state');
}

// 25 & 26. EVENT HANDLING & addEventListener()
console.log("\n=== 25 & 26. EVENT HANDLING & addEventListener ===");

// Common Event Types:
// 'click', 'input', 'change', 'submit', 'keydown', 'keyup', 'mouseenter', 'mouseleave'

function initializeDemoEventListeners() {
    const addCardBtn = document.getElementById('btnAddCard');
    const container = document.getElementById('cardContainer');
    const inputField = document.getElementById('cardInputText');

    if (addCardBtn && container) {
        // addEventListener takes: (eventName, callbackFunction, options)
        addCardBtn.addEventListener('click', (event) => {
            // Event Object Inspection
            console.log("Event Type:", event.type);
            console.log("Clicked Element:", event.target);

            const userText = inputField && inputField.value.trim() 
                ? inputField.value.trim() 
                : "Dynamic card generated via DOM API";

            const card = createNewNotificationCard("New Notification", userText);
            container.prepend(card); // Prepend places new items at the top

            // Clear input after adding
            if (inputField) inputField.value = '';
        });
    }
}

// Self-initializing when DOM is fully parsed
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDemoEventListeners);
} else {
    initializeDemoEventListeners();
}
