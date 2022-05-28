let result = [];

const doubler = (arr) => {
  for (let n of arr) {
    if (Array.isArray(n)) {
      doubler(n);
    } else {
      // console.log(n * 2);
      result = result.concat(n * 2);
    }
  }
};

const input1 = [1, [2, [3], 4], 5];
const expected1 = [2, 4, 6, 8, 10];
doubler(input1);

console.log(result);
