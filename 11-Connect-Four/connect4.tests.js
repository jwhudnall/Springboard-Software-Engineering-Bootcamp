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
  it('Correctly constructs in-memory game board for alternate dimensions', () => {
    let HEIGHT = 5;
    let WIDTH = 5;
    let testBoard = [];
    makeBoard(HEIGHT, WIDTH, testBoard);
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
  it('Correctly constructs HTML game board for default dimensions', () => {
     // Based on HEIGHT: 6, WIDTH: 7
     expect(document.getElementsByTagName('tr').length).toEqual(7);
     expect(document.getElementsByTagName('td').length).toEqual(49);
  });
  it('Correctly constructs HTML game board for alternate dimensions', () => {
    const testBoard = [];
    const fakeBoardElement = document.createElement('div');
    const height = 5;
    const width = 5;
    makeBoard(height, width, testBoard);
    makeHtmlBoard(height, width, fakeBoardElement);

    expect(fakeBoardElement.children.length).toEqual(height + 1);
    expect(fakeBoardElement.children[1].children.length).toEqual(width)
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