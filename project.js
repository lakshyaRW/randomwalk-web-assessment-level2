const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('gameStatus');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const resetButton = document.getElementById('reset');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let scores = { X: 0, O: 0 };

function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => handleMove(index));
        gameBoard.appendChild(cell);
    });
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function handleMove(index) {
    if (board[index]) return; 
    board[index] = currentPlayer;
    updateBoard();
    if (checkWinner()) {
        scores[currentPlayer]++;
        updateScore();
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        endGame();
    } else if (board.every(cell => cell)) {
        statusText.textContent = "It's a Draw!";
        endGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function updateBoard() {
    const cells = gameBoard.children;
    board.forEach((mark, index) => {
        cells[index].textContent = mark;
        if (mark) cells[index].classList.add('taken');
    });
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    );
}


function updateScore() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}


function endGame() {
    Array.from(gameBoard.children).forEach(cell => cell.classList.add('taken'));
}


resetButton.addEventListener('click', resetGame);

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    createBoard();
}

createBoard();