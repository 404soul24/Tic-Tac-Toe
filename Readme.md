# Tic Tac Toe

A browser-based Tic Tac Toe game built with vanilla JavaScript using the **Module Pattern** and a clean separation of concerns across three independent modules.

🔗 **Live Demo**: [https://tic-tac-toe-chi-liard.vercel.app/](https://tic-tac-toe-chi-liard.vercel.app/)

---

## Features

- Two-player local gameplay (X and O)
- Win detection across all 8 winning combinations
- Tie detection when the board is full
- Winning cells highlighted on victory
- Restart button to reset the game

---

## Project Structure

```
tic-tac-toe/
├── index.html       # Markup — status display, game grid, reset button
├── style.css        # Styling (if separated)
└── script.js        # All game logic — GameBoard, Player, GameController, DisplayController
```

---

## How It Works

The code is organized into **four modules**, each with a single responsibility:

### `GameBoard`
Manages the board state as a 9-element array (indices 0–8).

```
0 | 1 | 2
3 | 4 | 5
6 | 7 | 8
```

Exposes:
- `getBoard()` — returns the current board array
- `placeMarker(index, marker)` — places a marker if the cell is empty, returns `true/false`
- `reset()` — clears the board

---

### `Player`
A factory function that creates player objects.

```js
Player("Player 1", "O") // → { name: "Player 1", marker: "O" }
```

---

### `GameController`
Contains all game logic — turn management, win checking, and tie detection.

**Win checking** tests all 8 possible winning combinations:

| Type | Indices |
|------|---------|
| Top row | 0, 1, 2 |
| Middle row | 3, 4, 5 |
| Bottom row | 6, 7, 8 |
| Left column | 0, 3, 6 |
| Middle column | 1, 4, 7 |
| Right column | 2, 5, 8 |
| Diagonal ↘ | 0, 4, 8 |
| Diagonal ↙ | 2, 4, 6 |

**Each round follows this sequence:**
1. Ignore the click if the game is already over or the cell is taken
2. Place the marker on the board
3. Check for a win → end the game and store winning indices
4. Check for a tie (all cells filled, no winner) → end the game
5. Otherwise, switch to the other player

Exposes: `playRound(index)`, `getActivePlayer()`, `isGameOver()`, `getWinningIndices()`, `getWinnerName()`, `reset()`

---

### `DisplayController`
Handles all DOM rendering. Reads state from `GameBoard` and `GameController` and rebuilds the UI after every move.

- Uses **event delegation** — one click listener on the grid container handles all 9 cells
- Calls `render()` after every move to reflect the latest board state
- Highlights winning cells in gold when the game ends

---

## Game Flow

```
User clicks a cell
       ↓
handleBoardClick(e)
       ↓
GameController.playRound(index)
  ├── GameBoard.placeMarker()   → updates board array
  ├── checkWin()                → sets gameOver + winningIndices
  └── switchPlayerTurn()        → updates activePlayer
       ↓
render()
  ├── reads GameBoard.getBoard()
  ├── reads GameController state
  └── rebuilds the DOM to match
```

---

## Getting Started

No dependencies or build tools required.

```bash
# Clone the repository
git clone https://github.com/404soul24/tic-tac-toe.git

# Open in browser
open index.html
```

Or just visit the [live demo](https://tic-tac-toe-chi-liard.vercel.app/).

---

## Built With

- HTML5
- CSS3
- Vanilla JavaScript (ES6+) — Module Pattern (IIFE), Factory Functions, Closures

---

## License

MIT