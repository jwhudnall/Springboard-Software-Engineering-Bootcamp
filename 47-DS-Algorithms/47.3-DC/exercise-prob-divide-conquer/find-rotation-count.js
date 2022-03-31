function findRotationCount(arr) {
  // input: array
  // output: number
  // EC:
  // C: O(log n)

  // Find the pivot (where n < n -1). Return pivot index, if found. Else, return 0.
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const midIdx = Math.floor((left + right) / 2);
    const guess = arr[midIdx];
    const previous = arr[midIdx - 1];
    if (guess < previous) {
      return midIdx;
    } else {
      left = midIdx + 1;
    }
  }
  return 0;
}

const result = findRotationCount([7, 9, 11, 12, 15]);
console.log(result);

module.exports = findRotationCount;
