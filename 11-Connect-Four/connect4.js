/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const dimsBtn = document.querySelector('#change-dims');
const currentTurn = document.querySelector('#player-turn');
const gameContainer = document.querySelector('#game');
let htmlBoard = document.querySelector('#board');
let WIDTH = 7;
let HEIGHT = 6;
let currPlayer = 1;
const board = []; // array of rows, each row is array of cells  (board[y][x])
let gameIsActive = true;

dimsBtn.addEventListener('submit', function (e) {
  e.preventDefault();
  HEIGHT = e.target.height.value;
  WIDTH = e.target.width.value;
  destroyBoard(htmlBoard);
  makeBoard(HEIGHT, WIDTH, board);
  makeHtmlBoard(HEIGHT, WIDTH, htmlBoard);
  gameIsActive = true;
});

const destroyBoard = (boardElement) => {
  boardElement.remove();
  board.splice(0, board.length);
  const boardTable = document.createElement('table');
  boardTable.setAttribute('id', 'board');
  gameContainer.append(boardTable);
  htmlBoard = document.querySelector('#board');
}

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(height, width, container) {
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      row[x] = null;
    }
    container.push(row);
  }
}

function makeHtmlBoard(height, width, boardElement) {
  const htmlBoard = boardElement;

  // Creates and populates top row of gameboard, including a click listener
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // Populate the remaining rows by WIDTH, HEIGHT, each with unique ID
  for (let x = 0; x < width; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // Populate the HTML game board
  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++) {
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
  alert(msg);
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

    const boardIsFull = board.flat().every(val => val !== null);
    if (boardIsFull) {
      endGame('Tie Game!');
    }
    switchPlayers(currPlayer);
  }
}

const switchPlayers = () => {
  currPlayer = currPlayer === 1 ? 2 : 1;
  currentTurn.innerText = currPlayer;
  currentTurn.classList.toggle('p1-text-color');
  currentTurn.classList.toggle('p2-text-color');
};

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

makeBoard(HEIGHT, WIDTH, board);
makeHtmlBoard(HEIGHT, WIDTH, htmlBoard);