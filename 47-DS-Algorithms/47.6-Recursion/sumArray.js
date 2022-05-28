// Right a function that returns the sum of a list using recursion

const sum = (arr) => {
  // Base Case
  if (arr.length === 0) {
    return 0;
  }
  // Recursive Case
  return arr[0] + sum(arr.slice(1));
};

// arr = [1,2,3]
const expected1 = 6;
const actual1 = sum([1, 2, 3]);
console.log(`Should be true: ${expected1 === actual1}. Actual: ${actual1}`);

const expected2 = 10;
const actual2 = sum([1, 2, 3, 4]);
console.log(`Should be true: ${expected2 === actual2}. Actual: ${actual2}`);

const maxSubplots = (arr) => {
  let max = Math.max(arr);
  let min = Math.max(arr);
  // Base Case
  // if max % min === 0
  // return min

  // Recursive Case
  // call maxSubplots on [max % min, min]
};
