const { square, cube } = require("./square");

describe("square function", function () {
  test("square should return square", () => {
    let square2 = square(2);
    expect(square2).toEqual(4);
  });

  test("square should square negative numbers", () => {
    const res = square(-9);
    expect(res).toEqual(81);
  });
});

describe("cube function", () => {
  test("should cube positive numbers", () => {
    const res = cube(3);
    expect(res).toEqual(27);
  });
  test("should cube negative numbers", () => {
    const res = cube(-3);
    expect(res).toEqual(-27);
  });

  test("playing with any", () => {
    const randNum = Math.random() * 6;
    expect(randNum).toEqual(expect.any(Number));
  });

  test("playing with lives", () => {
    const numLives = 9;
    expect(numLives).not.toEqual(0);
  });
});
