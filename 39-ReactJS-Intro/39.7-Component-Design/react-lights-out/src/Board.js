import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.2 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      const row = [];
      for (let j = 0; j < ncols; j++) {
        // const probabilityResult = Math.random() * 1;
        const light = Math.random() <= chanceLightStartsOn;
        row.push(light);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every((row) => row.every((light) => light === false));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copy = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copy); // Flip current cell
      flipCell(y, x - 1, copy); // Flip left
      flipCell(y, x + 1, copy); // flip right
      flipCell(y - 1, x, copy); // flip above
      flipCell(y + 1, x, copy); // flip below
      // TODO: return the copy
      return copy;
    });
  }
  // console.log(board);

  // if the game is won, just show a winning msg & render nothing else
  return (
    <>
      {hasWon() ? (
        <h1>You Win!</h1>
      ) : (
        <table>
          <tbody>
            {board.map((row, y) => (
              <tr>
                {row.map((light, x) => (
                  <Cell
                    isLit={light}
                    flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                    testID={`${y}-${x}`}
                    key={`${y}-${x}`}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
  // TODO

  // make table board

  // TODO
}

export default Board;
