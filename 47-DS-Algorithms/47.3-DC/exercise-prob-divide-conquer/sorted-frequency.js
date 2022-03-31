function sortedFrequency(arr, target) {
  // Inputs: (array, number)
  // Output: Number
  // EC:
  // Constraints: O(log n)

  // split array in half until one of the target numbers is found; search left while number, search right while number.
  let left = 0;
  let right = arr.length - 1;
  while (right >= left) {
    const midIdx = Math.floor((left + right) / 2);
    const guess = arr[midIdx];
    if (guess < target) {
      left = midIdx + 1;
    } else if (guess > target) {
      right = midIdx - 1;
    } else {
      // count occurrences in each direction, and return
      let count = 0;
      let findLeftOfIdx = midIdx;
      let findRightOfIdx = midIdx + 1;
      while (arr[findLeftOfIdx] === target) {
        count++;
        findLeftOfIdx--;
      }
      while (arr[findRightOfIdx] == target) {
        count++;
        findRightOfIdx++;
      }
      return count;
    }
  }
  return -1;
}

module.exports = sortedFrequency;
