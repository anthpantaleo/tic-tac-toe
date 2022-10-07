let player1 = "X";
let player2 = "O";
let currentPlayer = player1;

const gameBoard = (() => {
  let board = new Array(9);

  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", playerMove, { once: true });
  });

  function playerMove(event) {
    let cellIndex = event.target.getAttribute("data-index");
    let currentCell = event.target;
    board[cellIndex] = currentPlayer;
    console.table(board);
    currentCell.textContent = currentPlayer;
    changePlayer();
  }

  function changePlayer() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }
})();

const gameControls = (() => {
  const start = document.querySelector(".startgame");
  start.addEventListener("click", function () {
    board = new Array(9);
    currentPlayer = player1;
    clearboard();
  });

  function clearBoard() {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  }
})();
