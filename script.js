let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let playerXScore = 0;
let playerOScore = 0;
let gameOver = false;

// Winning combinations 
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const winSound = document.getElementById("win-sound");
const clickSound = document.getElementById("click-sound");
const drawSound = document.getElementById("draw-sound");

// Function to update the game board UI
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    gameBoard.forEach((mark, index) => {
        cells[index].textContent = mark;
    });
}


function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            
            highlightWinningCells([a, b, c]);
            return gameBoard[a];
        }
    }
    return null;
}

// Function to highlight the winning cells
function highlightWinningCells(indices) {
    const cells = document.querySelectorAll('.cell');
    indices.forEach(index => {
        cells[index].style.backgroundColor = '#ffeb3b'; 
        cells[index].style.color = '#003366';  
    });
}


// Function to check if the game is a draw
function checkDraw() {

    return !gameBoard.includes('') && !checkWinner();
}

// Function to handle a cell click
function handleCellClick(event) {
    if (gameOver) return;
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] !== '') return; 

    // Mark the cell with the current player's symbol
    gameBoard[index] = currentPlayer;
    updateBoard();

    // Check for a winner
    
    const winner = checkWinner();
    if (winner) {
        gameOver = true;
        if (winner === 'X') {
            playerXScore++;
        } else {
            playerOScore++;
        }
        // Update status and scores
        document.getElementById('status').textContent = `Player ${winner} won!`;
        document.getElementById('player-x-score').textContent = playerXScore;
        document.getElementById('player-o-score').textContent = playerOScore;
        document.getElementById('win-sound').play(); 
        return;
    }

       // Check for a draw if no winner is found
       if (checkDraw()) {
        gameOver = true;
        document.getElementById('status').textContent = "It's a draw!";
        document.getElementById('draw-sound').play(); 
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
        document.getElementById('click-sound').play(); 
    }
}
 

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    updateBoard();
    document.getElementById('status').textContent = "Player X's turn";

    // Reset the background color and styles of all cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '#e0e0e0';  
        cell.style.color = '#000';  
    });
}


document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});


document.getElementById('reset-game').addEventListener('click', resetGame);


updateBoard();
