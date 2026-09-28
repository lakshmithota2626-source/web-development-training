/**
 * DAY 4: TIC-TAC-TOE GAME ENGINE & COMPONENT CONTROLLER
 */

// =============================================================================
// 1. TIC-TAC-TOE GAME ENGINE
// =============================================================================

class TicTacToeGame {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = "X";
        this.isGameActive = true;
        this.isAiMode = false;
        this.scores = { X: 0, O: 0, ties: 0 };

        // Winning combinations: 3 rows, 3 columns, 2 diagonals
        this.winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        this.initDOM();
        this.bindEvents();
    }

    initDOM() {
        this.cells = document.querySelectorAll('.cell');
        this.currentTurnBadge = document.getElementById('currentTurnBadge');
        this.scoreX = document.getElementById('scoreX');
        this.scoreO = document.getElementById('scoreO');
        this.scoreTies = document.getElementById('scoreTies');
        this.labelO = document.getElementById('labelO');
        this.gameBanner = document.getElementById('gameBanner');
        this.bannerMessage = document.getElementById('bannerMessage');
    }

    bindEvents() {
        // Cell Click Handlers
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });

        // Mode Switch
        document.querySelectorAll('input[name="gameMode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.isAiMode = e.target.value === 'ai';
                this.labelO.textContent = this.isAiMode ? "Nexus AI (O)" : "Player O";
                this.restartMatch();
            });
        });

        // Restart & Reset Buttons
        document.getElementById('btnRestart').addEventListener('click', () => this.restartMatch());
        document.getElementById('btnBannerPlayAgain').addEventListener('click', () => this.restartMatch());
        document.getElementById('btnResetScores').addEventListener('click', () => this.resetScores());
    }

    handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.getAttribute('data-index'), 10);

        // Ignore clicks if cell is already occupied or game is inactive
        if (this.board[index] !== null || !this.isGameActive) {
            return;
        }

        // Make Player Move
        this.makeMove(index, this.currentPlayer);

        // If Single Player Mode is active and game is still running, trigger AI turn
        if (this.isAiMode && this.isGameActive && this.currentPlayer === "O") {
            // Disable board during AI thinking
            setTimeout(() => {
                this.makeAiMove();
            }, 350);
        }
    }

    makeMove(index, player) {
        this.board[index] = player;
        const cell = this.cells[index];
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());

        const winResult = this.checkWin(player);

        if (winResult) {
            this.handleWin(player, winResult);
        } else if (this.checkTie()) {
            this.handleTie();
        } else {
            // Switch Turn
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
            this.updateTurnIndicator();
        }
    }

    makeAiMove() {
        if (!this.isGameActive) return;

        // 1. Check if AI can win in the next move
        const winningMove = this.findStrategicMove("O");
        if (winningMove !== null) {
            this.makeMove(winningMove, "O");
            return;
        }

        // 2. Block Human player from winning
        const blockingMove = this.findStrategicMove("X");
        if (blockingMove !== null) {
            this.makeMove(blockingMove, "O");
            return;
        }

        // 3. Take Center if available
        if (this.board[4] === null) {
            this.makeMove(4, "O");
            return;
        }

        // 4. Pick any available corner
        const corners = [0, 2, 6, 8].filter(idx => this.board[idx] === null);
        if (corners.length > 0) {
            const randomCorner = corners[Math.floor(Math.random() * corners.length)];
            this.makeMove(randomCorner, "O");
            return;
        }

        // 5. Pick first empty cell
        const emptyCells = this.board.map((v, i) => v === null ? i : null).filter(v => v !== null);
        if (emptyCells.length > 0) {
            const randomEmpty = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.makeMove(randomEmpty, "O");
        }
    }

    findStrategicMove(player) {
        for (const combo of this.winningCombos) {
            const [a, b, c] = combo;
            const values = [this.board[a], this.board[b], this.board[c]];
            const playerCount = values.filter(v => v === player).length;
            const emptyCount = values.filter(v => v === null).length;

            if (playerCount === 2 && emptyCount === 1) {
                if (this.board[a] === null) return a;
                if (this.board[b] === null) return b;
                if (this.board[c] === null) return c;
            }
        }
        return null;
    }

    checkWin(player) {
        for (const combo of this.winningCombos) {
            const [a, b, c] = combo;
            if (this.board[a] === player && this.board[b] === player && this.board[c] === player) {
                return combo; // Return winning combo indices
            }
        }
        return null;
    }

    checkTie() {
        return this.board.every(cell => cell !== null);
    }

    handleWin(player, combo) {
        this.isGameActive = false;
        this.scores[player] += 1;
        this.updateScoreboard();

        // Highlight winning cells
        combo.forEach(idx => {
            this.cells[idx].classList.add('winning-cell');
        });

        const winnerLabel = player === "X" ? "Player X" : (this.isAiMode ? "Nexus AI" : "Player O");
        this.bannerMessage.textContent = `🏆 ${winnerLabel} Wins!`;
        this.bannerMessage.style.color = player === "X" ? "var(--color-x)" : "var(--color-o)";
        
        setTimeout(() => {
            this.gameBanner.classList.add('show');
        }, 600);
    }

    handleTie() {
        this.isGameActive = false;
        this.scores.ties += 1;
        this.updateScoreboard();

        this.bannerMessage.textContent = "🤝 It's a Draw!";
        this.bannerMessage.style.color = "var(--text-secondary)";
        
        setTimeout(() => {
            this.gameBanner.classList.add('show');
        }, 400);
    }

    updateTurnIndicator() {
        this.currentTurnBadge.textContent = this.currentPlayer === "X" ? "PLAYER X" : (this.isAiMode ? "NEXUS AI" : "PLAYER O");
        this.currentTurnBadge.className = this.currentPlayer === "X" ? "turn-x" : "turn-o";
    }

    updateScoreboard() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
        this.scoreTies.textContent = this.scores.ties;
    }

    restartMatch() {
        this.board.fill(null);
        this.currentPlayer = "X";
        this.isGameActive = true;
        this.gameBanner.classList.remove('show');
        this.updateTurnIndicator();

        this.cells.forEach(cell => {
            cell.textContent = "";
            cell.className = "cell";
        });
    }

    resetScores() {
        this.scores = { X: 0, O: 0, ties: 0 };
        this.updateScoreboard();
        this.restartMatch();
    }
}

// Initialize Game on DOM Load
const game = new TicTacToeGame();


// =============================================================================
// 2. OOP CONTROLLER
// =============================================================================
document.getElementById('btnCreateHero').addEventListener('click', () => {
    const name = document.getElementById('heroNameInput').value || "Astra";
    const role = document.getElementById('heroRoleSelect').value;
    const outputElem = document.getElementById('oopOutputText');

    let heroInstance;
    if (role === 'Warrior') {
        heroInstance = new Player(name, "⚔️", 100);
    } else if (role === 'Mage') {
        heroInstance = new AIPlayer("Grandmaster");
        heroInstance.updateName = name;
    } else {
        heroInstance = new Player(name, "🤖", 250);
    }

    outputElem.textContent = `// OOP Instance Created:\n` +
        `Class Type: ${heroInstance.constructor.name}\n` +
        `Profile: ${heroInstance.getProfile()}\n` +
        `Win Metric: ${heroInstance.winRate}\n` +
        `Timestamp: ${new Date().toISOString()}`;
});


// =============================================================================
// 3. jQuery & AJAX CONTROLLER
// =============================================================================
$(document).ready(function() {
    // jQuery Effects
    $('#btnJqFade').on('click', () => $('#jqTargetBox').fadeToggle(300));
    $('#btnJqSlide').on('click', () => $('#jqTargetBox').slideToggle(300));
    $('#btnJqHighlight').on('click', () => $('#jqTargetBox').toggleClass('ui-state-highlight'));

    // AJAX Fetch Demonstrations
    $('#btnFetchPosts').on('click', async function() {
        $('#ajaxResultText').text("Fetching data from REST API...");
        try {
            const posts = await fetchUserPosts(2);
            $('#ajaxResultText').text(JSON.stringify(posts, null, 2));
        } catch (err) {
            $('#ajaxResultText').text(`Error: ${err.message}`);
        }
    });

    $('#btnPostData').on('click', async function() {
        $('#ajaxResultText').text("Posting payload to server...");
        const result = await createNewPost("Training Module Day 4", "Learned OOP, jQuery, and AJAX");
        $('#ajaxResultText').text(JSON.stringify(result, null, 2));
    });

    $('#btnJqAjax').on('click', function() {
        fetchWithJQuery('https://jsonplaceholder.typicode.com/todos/1', 'ajaxResultText');
    });
});
