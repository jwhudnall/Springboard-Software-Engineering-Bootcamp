/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    let row = [];
    for (let j = 0; j < WIDTH; j++) {
      row[j] = null;
    }
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code
  const top = document.createElement("tr");  // Create a table row element
  top.setAttribute("id", "column-top"); // add #column-top to new row element
  top.addEventListener("click", handleClick); // Add click listener to row

  // Populate the top row by adding the number of values in WIDTH, adding unique IDs to each cell
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);  // append top row to board

  // TODO: add comment for this code
  // Similar to makeBoard(), populate the game board with <td>'s using a nested loop
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${x}-${y}`); // Add unique ID based on cell position
      row.append(cell); // Add each cell to current row
    }
    htmlBoard.append(row); // Add each row to board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i = HEIGHT - 1; i >= 0; i--) {
    const row = board[i];
    if (row[x] === null) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  // Create new DIV element
  piece.classList.add('piece', `p${currPlayer}`);
  // Add class piece, as well as p1 or p2 (check current);
  // Append to correct cell
  document.getElementById(`${x}-${y}`).append(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  const boardIsFull = board.flat().every(val => val !== null);
  if (boardIsFull) {
    endGame();
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
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

  for (var y = 0; y < HEIGHT; y++) {  // row representation, from 0 to height - 1
    for (var x = 0; x < WIDTH; x++) { // col rep, from 0 to width - 1
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // Looks for 4 consecutive (horiz)
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // Looks for 4 consecutive (vert)
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // 4 consec Diag / Down-Right
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];// 4 consec Diag / Down-Left

      // If any of the 4 checks above returns true, a match is found, true is returned
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    } // Otherwise, x increments by 1 and the same 4 checks are performed, offset in X by +1
  }// after all X's are exhausted for a given y, y is offset by + 1, x resets to 0 and the process repeats
}

makeBoard();
makeHtmlBoard();
