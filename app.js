const gameBoard = (() => {
  let player1 = "X";
  let player2 = "O";
  let currentPlayer = player1;
  let board = new Array(9);
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", playerMove, { once: true });
  });

  function playerMove(event) {
    let cellIndex = event.target.getAttribute("data-index");
    let currentCell = event.target;
    console.log(`Clicked ${cellIndex}`);
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
