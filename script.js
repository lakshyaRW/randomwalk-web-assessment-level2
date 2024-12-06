const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const xScore = document.getElementById('x-score');
const oScore = document.getElementById('o-score');
const drawScore = document.getElementById('draw-score');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let scores = { X: 0, O: 0, Draw: 0 };
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updateScore() {
  xScore.textContent = scores.X;
  oScore.textContent = scores.O;
  drawScore.textContent = scores.Draw;
}

function checkWin() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusText.textContent = `Player ${currentPlayer} wins!`;
      scores[currentPlayer]++;
      updateScore();
      return true;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    statusText.textContent = 'It\'s a draw!';
    scores.Draw++;
    updateScore();
    return true;
  }

  return false;
}

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (!checkWin()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player X's Turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
