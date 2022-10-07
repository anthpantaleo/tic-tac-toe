const boardModule = (() => {
  let board = new Array(9);
})();

const gamePlay = (() => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", playerMove, { once: true });
  });
})();

//   console.log(event.target.getAttribute("data-index"));
