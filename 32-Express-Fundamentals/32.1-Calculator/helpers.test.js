const { median, mean, mode, calcResponse, handleInput } = require("./helpers");

describe("Test Median", () => {
  test("Should return median for odd numbers", () => {
    expect(median([1, 2, 3, 4, 5])).toEqual(3);
    expect(median([5, 4, 3, 2, 1])).toEqual(3);
    expect(median([5, 1, 4, 2, 3])).toEqual(3);
    expect(median([1, 5, 2, 4, 3])).toEqual(3);
    expect(median([-1, -2, -3, -4, -5])).toEqual(-3);
    expect(median([-5, -4, -3, -2, -1])).toEqual(-3);
    expect(median([-5, -1, -4, -2, -3])).toEqual(-3);
    expect(median([-1, -5, -2, -4, -3])).toEqual(-3);
  });
  test("Should return median for even numbers", () => {
    expect(median([1, 2, 3, 4])).toEqual(2.5);
    expect(median([4, 3, 2, 1])).toEqual(2.5);
    expect(median([1, 2, 3, 4, 5, 6])).toEqual(3.5);
  });
});

describe("Test Mean", () => {
  test("Should return mean for positive numbers", () => {
    expect(mean([1, 2, 3, 4, 5])).toEqual(3);
    expect(mean([2, 2, 2, 2])).toEqual(2);
    expect(mean([5, 5, 3, 3])).toEqual(4);
  });
  test("Should return mean for negative numbers", () => {
    expect(mean([-1, -2, -3, -4, -5])).toEqual(-3);
    expect(mean([-2, -2, -2, -2])).toEqual(-2);
    expect(mean([-5, -5, -3, -3])).toEqual(-4);
  });
  test("Should return mean for mixed numbers", () => {
    expect(mean([-1, 2, 3, 4, -5])).toEqual(3 / 5);
    expect(mean([-2, -2, 2, 2])).toEqual(0);
    expect(mean([-5, -5, 3, 3])).toEqual(-1);
  });
});

describe("Test Mode", () => {
  test("Should return mode for positive numbers", () => {
    expect(mode([1, 2, 3, 4, 3, 5])).toEqual(3);
    expect(mode([1, 2, 1, 2, 3])).toEqual(1);
    expect(mode([1, 2, 3, 1, 5, 6, 1])).toEqual(1);
  });
  test("Should return mode for negative numbers", () => {
    expect(mode([-1, -2, -3, -4, -3, -5])).toEqual(-3);
    expect(mode([-1, -2, -1, -2, -3])).toEqual(-1);
    expect(mode([-1, -2, -3, -1, -5, -6, -1])).toEqual(-1);
  });
});

describe("Test Additional Helpers", () => {
  test("calcResponse should generate correct format", () => {
    expect(calcResponse("mean", 4)).toEqual({
      response: { operation: "mean", value: 4 },
    });
  });
  test("handleInput should return object if error", () => {
    const res1 = handleInput(undefined);
    const res2 = handleInput("1,C,3,4");
    const res3 = handleInput("1,2,3,4");
    expect(handleInput(res1)).toHaveProperty("error");
    expect(handleInput(res2)).toHaveProperty("error");
    expect(handleInput(res3)).toHaveLength(4);
    expect(handleInput(res3)).toEqual([1, 2, 3, 4]);
  });
});
