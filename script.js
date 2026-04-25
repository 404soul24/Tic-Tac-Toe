const GameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const placeMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const reset = () => board.fill("");

  return { getBoard, placeMarker, reset };
})();

const Player = (name, marker) => ({ name, marker });

const GameController = (function () {
  const Players = [Player("Player 1", "O"), Player("Player 2", "X")];

  let activePlayer = Players[0];
  let gameOver = false;
  let winnerName = null;
  let winningIndices = null;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (board, marker) => {
    const match = winningConditions.find((condition) =>
      condition.every((index) => board[index] === marker),
    );
    return match || null;
  };

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === Players[0] ? Players[1] : Players[0];
  };

  const getActivePlayer = () => activePlayer;
  const isGameOver = () => gameOver;
  const getWinningIndices = () => winningIndices;
  const getWinnerName = () => winnerName;

  const playRound = (index) => {
    if (gameOver) return;

    const placed = GameBoard.placeMarker(index, activePlayer.marker);
    if (!placed) return;

    const board = GameBoard.getBoard();

    const winMatch = checkWin(board, activePlayer.marker);
    if (winMatch) {
      gameOver = true;
      winnerName = activePlayer.name;
      winningIndices = winMatch;
      return;
    }

    const isTie = board.every((square) => square !== "");
    if (isTie) {
      gameOver = true;
      return;
    }

    switchPlayerTurn();
  };

  const reset = () => {
    activePlayer = Players[0];
    gameOver = false;
    winnerName = null;
    winningIndices = null;
    GameBoard.reset();
  };

  return {
    playRound,
    getActivePlayer,
    isGameOver,
    getWinningIndices,
    getWinnerName,
    reset,
  };
})();

const displayController = (function () {
  const container = document.querySelector("#gameboard");
  const statusEl = document.querySelector("#status");
  const resetBtn = document.querySelector("#reset-btn");

  const render = () => {
    const board = GameBoard.getBoard();
    const winIdx = GameController.getWinningIndices() || [];

    container.innerHTML = "";

    board.forEach((cell, index) => {
      const square = document.createElement("div");
      square.classList.add("square");

      if (cell) {
        square.classList.add("taken");
        square.dataset.marker = cell;
      }

      if (winIdx.includes(index)) square.classList.add("win-cell");

      square.textContent = cell;
      square.dataset.index = index;
      container.appendChild(square);
    });

    if (GameController.isGameOver()) {
      const winner = GameController.getWinnerName();
      if (winner) {
        statusEl.textContent = `${winner} wins!`;
        statusEl.className = "win";
      } else {
        statusEl.textContent = "It's a draw.";
        statusEl.className = "draw";
      }
    } else {
      const p = GameController.getActivePlayer();
      statusEl.textContent = `${p.name}'s turn — ${p.marker}`;
      statusEl.className = "";
    }
  };

  const handleBoardClick = (e) => {
    if (GameController.isGameOver()) return;
    const square = e.target.closest(".square");
    if (!square) return;
    const selectedIndex = parseInt(square.dataset.index);
    GameController.playRound(selectedIndex);
    render();
  };

  container.addEventListener("click", handleBoardClick);

  resetBtn.addEventListener("click", () => {
    GameController.reset();
    render();
  });

  render();
})();
