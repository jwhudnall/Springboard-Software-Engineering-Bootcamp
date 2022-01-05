/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1;
const board = []; // array of rows, each row is array of cells  (board[y][x])
let gameIsActive = true;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(container, height, width) {
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      row[x] = null;
    }
    container.push(row);
  }
}

function makeHtmlBoard() {
  const htmlBoard = document.querySelector('#board');

  // Creates and populates top row of gameboard, including a click listener
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // Populate the remaining rows by WIDTH, HEIGHT, each with unique ID
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // Populate the HTML game board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${x}-${y}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    const row = board[y];
    if (!row[x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece', `p${currPlayer}`, 'fall'); // .fall = animation
  document.getElementById(`${x}-${y}`).append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  msg ? alert(msg) : alert('Tie Game!');
  gameIsActive = false;
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  if (gameIsActive) {
    const x = +evt.target.id;
    const y = findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    placeInTable(y, x);
    board[y][x] = currPlayer;

    if (checkForWin()) {
      return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    const boardIsFull = board.flat().every(val => val !== null);
    if (boardIsFull) {
      endGame();
    }
    // switch players
    currPlayer = currPlayer === 1 ? 2 : 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {  // row representation, from 0 to height - 1
    for (let x = 0; x < WIDTH; x++) { // col rep, from 0 to width - 1
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // Looks for 4 consecutive (horiz)
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // Looks for 4 consecutive (vert)
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // 4 consec Diag / Down-Right
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];// 4 consec Diag / Down-Left

      // If any of the 4 checks above returns true, a match is found, true is returned
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    } // Otherwise, x increments by 1 and the same 4 checks are performed, offset in X by +1
  }// after all X's are exhausted for a given y, y is offset by + 1, x resets to 0 and the process repeats
}

makeBoard(board, HEIGHT, WIDTH);
makeHtmlBoard();