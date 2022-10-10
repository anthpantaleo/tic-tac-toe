const GameLoad = () => {
  let board = [null, null, null, null, null, null, null, null, null];
  let player1 = "X";
  let player2 = "O";
  let currentPlayer = player1;
  let gameOn = true;
  let winner = "";
  let isWinner = false;
  let isDraw = false;
  let winningIndex = [null, null, null];
  return {
    board,
    player1,
    player2,
    currentPlayer,
    gameOn,
    winner,
    isWinner,
    isDraw,
    winningIndex,
  };
};

const domControl = (() => {
  const cells = document.querySelectorAll(".cell");
  const start = document.querySelector(".startgame");
  const gameCoach = document.querySelector(".gameplaythrough");

  start.addEventListener("click", clearBoard);

  function listenToBoard() {
    if (currentBoard.board.includes(null)) {
      cells.forEach((cell) => {
        cell.addEventListener("click", playerMove, { once: true });
      });
    } else {
      gameUpdater();
    }
  }

  function clearBoard() {
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("winner");
      cell.classList.remove("loser");
    });

    currentBoard = GameLoad();
    listenToBoard();
    gameUpdater();
  }

  function playerMove(event) {
    if (currentBoard.gameOn == true && currentBoard.isWinner == false) {
      let cellIndex = event.target.getAttribute("data-index");
      let currentCell = event.target;
      currentBoard.board[cellIndex] = currentBoard.currentPlayer;
      currentCell.innerText = currentBoard.currentPlayer;
      gameLogic.checkWin(currentBoard.board);
      changePlayer();
      gameUpdater();
    }
  }

  function changePlayer() {
    if (currentBoard.board.includes(null)) {
      if (currentBoard.gameOn) {
        if (currentBoard.currentPlayer === "X") {
          currentBoard.currentPlayer = currentBoard.player2;
        } else {
          currentBoard.currentPlayer = currentBoard.player1;
        }
      }
    }
  }

  function gameUpdater() {
    if (currentBoard.gameOn == true) {
      gameCoach.textContent = `${currentBoard.currentPlayer}'s Turn.`;
    } else if (currentBoard.gameOn == false && currentBoard.isWinner == true) {
      gameCoach.textContent = `${currentBoard.winner} Won!`;
      updateBoardWin();
    } else if (currentBoard.gameOn == false && currentBoard.isDraw == true) {
      gameCoach.textContent = `That's a tie!`;
    }
  }

  function updateBoardWin() {
    cells.forEach((cell) => {
      if (
        currentBoard.winningIndex.includes(
          parseInt(cell.getAttribute("data-index"))
        )
      ) {
        cell.classList.add("winner");
      } else {
        cell.classList.add("loser");
      }
    });
  }

  return { listenToBoard, clearBoard, gameUpdater };
})();

const gameLogic = (() => {
  const winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWin(someBoard) {
    for (let i = 0; i <= winStates.length - 1; i++) {
      let position1 = winStates[i][0];
      let position2 = winStates[i][1];
      let position3 = winStates[i][2];
      let checkBoard = currentBoard.board;
      if (
        checkBoard[position1] === currentBoard.currentPlayer &&
        checkBoard[position2] === currentBoard.currentPlayer &&
        checkBoard[position3] === currentBoard.currentPlayer
      ) {
        currentBoard.gameOn = false;
        currentBoard.winner = currentBoard.currentPlayer;
        currentBoard.isWinner = true;
        currentBoard.winningIndex = winStates[i];
        domControl.gameUpdater();
      } else if (!currentBoard.board.includes(null)) {
        currentBoard.gameOn = false;
        currentBoard.isDraw = true;
        domControl.gameUpdater();
      }
    }
  }

  return { checkWin };
})();

let currentBoard = GameLoad();
// GameBoard is created
domControl.listenToBoard();
//Immediately listens to the Dom
domControl.gameUpdater();
//Updates the Game Info
