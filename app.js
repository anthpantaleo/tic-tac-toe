let player1 = "X";
let player2 = "O";
let currentPlayer = player1;

const gameBoard = (() => {
  let board = new Array(9);

  const cells = document.querySelectorAll(".cell");

  function listenToBoard() {
    cells.forEach((cell) => {
      cell.addEventListener("click", playerMove, { once: true });
    });
  }

  function playerMove(event) {
    let cellIndex = event.target.getAttribute("data-index");
    let currentCell = event.target;
    board[cellIndex] = currentPlayer;
    console.table(board);
    currentCell.textContent = currentPlayer;
    changePlayer();
    gameControls.gameUpdater();
  }

  function changePlayer() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }

  function clearBoard() {
    console.log("clear");
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    board = [null, null, null, null, null, null, null, null, null];
    console.table(board);
    listenToBoard();
    gameControls.gameUpdater();
  }
  return {
    clearBoard,
    listenToBoard,
  };
})();

const gameControls = (() => {
  const start = document.querySelector(".startgame");
  start.addEventListener("click", function () {
    currentPlayer = player1;
    gameBoard.clearBoard();
  });

  const gameCoach = document.querySelector(".gameplaythrough");
  function gameUpdater() {
    gameCoach.textContent = `${currentPlayer}'s Turn.`;
  }

  return { gameCoach, gameUpdater };
})();

gameBoard.listenToBoard();
gameControls.gameUpdater();
