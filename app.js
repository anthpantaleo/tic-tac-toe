const GameLoad = () => {
  let board = [null, null, null, null, null, null, null, null, null];
  let player1 = "X";
  let player2 = "O";
  let currentPlayer = player1;
  let gameOn = true;
  return { board, player1, player2, currentPlayer, gameOn };
};

let currentBoard = GameLoad();

const domControl = (() => {
  const cells = document.querySelectorAll(".cell");
  const start = document.querySelector(".startgame");
  const gameCoach = document.querySelector(".gameplaythrough");

  start.addEventListener("click", clearBoard);

  function listenToBoard() {
    cells.forEach((cell) => {
      cell.addEventListener("click", playerMove, { once: true });
    });
  }

  function clearBoard() {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    currentBoard.board = [null, null, null, null, null, null, null, null, null];
    listenToBoard();

    currentBoard.gameOn = true;
    currentBoard.currentPlayer = currentBoard.player1;
    gameUpdater();
  }

  function playerMove(event) {
    if (currentBoard.gameOn == true) {
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
    if (currentBoard.gameOn) {
      if (currentBoard.currentPlayer === "X") {
        currentBoard.currentPlayer = currentBoard.player2;
      } else {
        currentBoard.currentPlayer = currentBoard.player1;
      }
    }
  }

  function gameUpdater() {
    gameCoach.textContent = `${currentBoard.currentPlayer}'s Turn.`;
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
    console.table(someBoard);
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
      }
    }
  }

  return { checkWin };
})();

domControl.listenToBoard();
domControl.gameUpdater();

// gameControls.gameUpdater();

// const gameBoard = (() => {
//   const cells = document.querySelectorAll(".cell");

//   function listenToBoard() {
//     cells.forEach((cell) => {
//       cell.addEventListener("click", playerMove, { once: true });
//     });
//   }

//   function playerMove(event) {
//     if (gameOn) {
//       let cellIndex = event.target.getAttribute("data-index");
//       let currentCell = event.target;
//       currentBoard.board[currentCell] = currentPlayer;
//       console.table(currentBoard.board);
//       currentCell.textContent = currentPlayer;
//       gameControls.checkWin(currentBoard.board);
//       changePlayer();
//       gameControls.gameUpdater();
//     }
//   }

//   function changePlayer() {
//     if (currentBoard.currentPlayer === player1) {
//       currentBoard.currentPlayer = currentBoard.player2;
//     } else {
//       currentBoard.currentPlayer = currentBoard.player1;
//     }
//   }

//   function clearBoard() {
//     console.log("clear");
//     cells.forEach((cell) => {
//       cell.textContent = "";
//     });
//     currentBoard.board = [null, null, null, null, null, null, null, null, null];
//     console.table(currentBoard.board);
//     listenToBoard();
//     gameControls.gameUpdater();
//     currentBoard.gameOn = true;
//   }
//   return {
//     clearBoard,
//     listenToBoard,
//   };
// })();

// const gameControls = (() => {
//   const start = document.querySelector(".startgame");
//   start.addEventListener("click", function () {
//     currentBoard.currentPlayer = currentBoard.player1;
//     gameBoard.clearBoard();
//   });

//   const gameCoach = document.querySelector(".gameplaythrough");
//   function gameUpdater() {
//     gameCoach.textContent = `${currentBoard.currentPlayer}'s Turn.`;
//   }

//   const winStates = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   function checkWin(currentBoard) {
//     for (let i = 0; i <= winStates.length - 1; i++) {
//       console.log(winStates[i]);
//     }
//   }

//   return { gameCoach, gameUpdater, checkWin };
// })();
