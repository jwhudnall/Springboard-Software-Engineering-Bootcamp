describe('makeBoard', () => {
  it('Correctly constructs in-memory game board for default dimensions', () => {
    // Based on HEIGHT: 6, WIDTH: 7
    expect(board).toEqual([
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ])
  });
  it('Correctly constructs in-memory game board for different dimensions', () => {
    let HEIGHT = 5;
    let WIDTH = 5;
    let testBoard = [];
    makeBoard(testBoard, HEIGHT, WIDTH);
    console.log(testBoard);

    expect(testBoard).toEqual([
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null]
    ]);
  });
});

describe('makeHtmlBoard', () => {
  it('Correctly constructs HTML game board', () => {
     // Based on HEIGHT: 6, WIDTH: 7
     expect(document.getElementsByTagName('tr').length).toEqual(7);
  });
});

describe('findSpotForCol', () => {
  it('Correctly places game piece within column', () => {
     // Based on HEIGHT: 6, WIDTH: 7
     expect(findSpotForCol(0)).toEqual(5);
     expect(findSpotForCol(1)).toEqual(5);
  });
});

describe('endGame', () => {
  it('Alerts user after game over', () => {
    spyOn(window, 'alert');
    msg = 'Player1 Wins!'
    endGame(msg);
    expect(window.alert).toHaveBeenCalledWith(msg);
  });
});



// findSpotForCol(x)