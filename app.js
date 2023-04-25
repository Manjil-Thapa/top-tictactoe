const humanPlayer = 'X';
const aiPlayer = 'O';
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

const cells = document.querySelectorAll('.cell');
let currentPlayer = humanPlayer;
let gameBoard = Array.from(Array(9).keys());

cells.forEach((cell) => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(event) {
  const cell = event.target;
  const cellIndex = cell.id;

  updateGameBoard(cellIndex, currentPlayer);
  displayGameBoard();

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (checkTie()) {
    endGame(true);
  } else {
    switchPlayer();
    if (currentPlayer === aiPlayer) {
      aiMove();
    }
  }
}

function updateGameBoard(cellIndex, player) {
  gameBoard[cellIndex] = player;
}

function displayGameBoard() {
  gameBoard.forEach((cell, index) => {
    document.getElementById(index).innerText = cell;
  });
}

function checkWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return gameBoard[index] === player;
    });
  });
}

function checkTie() {
  return gameBoard.every((cell) => {
    return cell !== undefined;
  });
}

function endGame(tie) {
  if (tie) {
    setMessage('Tie Game!');
  } else {
    setMessage(`${currentPlayer} Wins!`);
  }
  cells.forEach((cell) => {
    cell.removeEventListener('click', handleClick);
  });
}

function setMessage(message) {
  document.getElementById('message').innerText = message;
}

function switchPlayer() {
  currentPlayer = currentPlayer === humanPlayer ? aiPlayer : humanPlayer;
}

function aiMove() {
  let availableCells = gameBoard.filter((cell) => {
    return typeof cell === 'number';
  });
  let randomIndex = Math.floor(Math.random() * availableCells.length);
  let cellIndex = availableCells[randomIndex];

  updateGameBoard(cellIndex, currentPlayer);
  displayGameBoard();

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (checkTie()) {
    endGame(true);
  } else {
    switchPlayer();
  }
}

document.getElementById('restart').addEventListener('click', restartGame);

function restartGame() {
  gameBoard = Array.from(Array(9).keys());
  currentPlayer = humanPlayer;
  cells.forEach((cell) => {
    cell.innerText = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  setMessage('');
}

displayGameBoard();
