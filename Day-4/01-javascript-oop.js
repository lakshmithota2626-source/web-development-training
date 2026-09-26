/**
 * ==============================================================================
 * DAY 4 - PART 1: JAVASCRIPT OBJECT-ORIENTED PROGRAMMING (OOP)
 * ==============================================================================
 * 
 * Topics Covered:
 * 1. ES6 Classes & Constructors
 * 2. Instance Methods & Properties
 * 3. Inheritance with extends & super
 * 4. Encapsulation with Private Fields (#)
 * 5. Getters & Setters
 * 6. Static Methods & Static Properties
 * 7. Polymorphism (Method Overriding)
 */

console.log("=== 1 & 2. ES6 CLASSES, CONSTRUCTORS & METHODS ===");

// Base Class: Player (Common blueprint for game entities)
class Player {
    // 4. Private field (Encapsulation - accessible only inside this class)
    #secretPasscode;

    constructor(name, symbol, score = 0) {
        this.name = name;
        this.symbol = symbol; // "X" or "O"
        this.score = score;
        this.#secretPasscode = Math.floor(1000 + Math.random() * 9000);
    }

    // Instance Method
    getProfile() {
        return `Player: ${this.name} | Symbol: [${this.symbol}] | Score: ${this.score}`;
    }

    // Method to mutate state
    incrementScore() {
        this.score += 1;
        return `${this.name} score increased to ${this.score}`;
    }

    // 5. Getter and Setter
    get winRate() {
        return `${this.score} total victories recorded`;
    }

    set updateName(newName) {
        if (newName && newName.trim().length > 0) {
            this.name = newName.trim();
        } else {
            console.error("Invalid player name provided!");
        }
    }

    // 6. Static Method (Called on class directly, not instance)
    static compareScores(playerA, playerB) {
        if (playerA.score > playerB.score) {
            return `${playerA.name} is leading by ${playerA.score - playerB.score} points`;
        } else if (playerB.score > playerA.score) {
            return `${playerB.name} is leading by ${playerB.score - playerA.score} points`;
        }
        return "Both players are tied!";
    }
}

// 3 & 7. INHERITANCE & POLYMORPHISM (AIPlayer extends Player)
class AIPlayer extends Player {
    constructor(difficulty = "Hard") {
        // Call super constructor to initialize inherited properties
        super("Nexus AI", "O", 0);
        this.difficulty = difficulty;
    }

    // 7. Polymorphism: Overriding getProfile method from base class
    getProfile() {
        return `[BOT] ${this.name} (Difficulty: ${this.difficulty}) | Score: ${this.score}`;
    }

    // AI specific method (Minimax decision maker)
    calculateBestMove(boardState) {
        console.log(`[AI Thinking]: Evaluating board positions with ${this.difficulty} algorithm...`);
        // Find first empty cell for simple demonstration
        const availableIndices = [];
        boardState.forEach((val, idx) => {
            if (val === null || val === '') availableIndices.push(idx);
        });
        return availableIndices[Math.floor(Math.random() * availableIndices.length)];
    }
}

// -----------------------------------------------------------------------------
// VERIFICATION / EXECUTION
// -----------------------------------------------------------------------------
const human = new Player("Balaji", "X", 3);
const ai = new AIPlayer("Master");

console.log(human.getProfile());
console.log(ai.getProfile());

human.incrementScore();
console.log(human.winRate);

console.log("\nStatic Score Comparison:", Player.compareScores(human, ai));
