function countZeroes(arr) {
  // I: array
  // O: Number
  // E:
  // C: O(log n)

  // Find first 0, and return arr length - index of first 0
  // cut array in half. if mid = 0 and left is 1, return arr length - index of mid
  // if none found, return 0

  let left = 0;
  let right = arr.length - 1;

  while (right > left) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === 0 && arr[mid - 1] === 1) {
      return arr.length - mid;
    } else if (arr[mid] === 1) {
      // get rid of everything on the left
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  // At this point, we have either all 0's or all 1's. Return accordingly.
  return arr[0] === 1 ? 0 : arr.length;
}

module.exports = countZeroes;
