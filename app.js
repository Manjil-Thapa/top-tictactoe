let player = 'X';
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

function handleClick(row, col) {
  if (board[row][col] == '') {
    document.getElementById(`cell${row}${col}`).innerText = player;
    board[row][col] = player;
    if (checkWin()) {
      alert(`${player} wins!`);
      resetBoard();
    } else if (checkTie()) {
      alert('Tie game!');
      resetBoard();
    } else {
      player = player == 'X' ? 'O' : 'X';
    }
  }
}

function checkWin() {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] != '' &&
      board[i][0] == board[i][1] &&
      board[i][1] == board[i][2]
    ) {
      return true;
    }
    if (
      board[0][i] != '' &&
      board[0][i] == board[1][i] &&
      board[1][i] == board[2][i]
    ) {
      return true;
    }
  }
  if (
    board[0][0] != '' &&
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2]
  ) {
    return true;
  }
  if (
    board[0][2] != '' &&
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0]
  ) {
    return true;
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        return false;
      }
    }
  }
  return true;
}

function resetBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.getElementById(`cell${i}${j}`).innerText = '';
      board[i][j] = '';
    }
  }
  player = 'X';
}

// attach click event handlers to each cell
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    document
      .getElementById(`cell${i}${j}`)
      .addEventListener('click', function () {
        handleClick(i, j);
      });
  }
}
