function findRotatedIndex(arr, target) {
  // I: sorted array
  // O:
  // C:
  // EC: O(log n)

  let left = 0;
  let right = arr.length - 1;
  while (right > left) {
    // look for rotation point
    const midIdx = Math.floor((left + right) / 2);
    const guess = arr[midIdx];
    if (guess > arr[right]) {
      left = midIdx + 1;
    } else {
      right = midIdx;
    }
  }

  if (target >= arr[left] && target <= arr[arr.length - 1]) {
    right = arr.length - 1;
  } else {
    left = 0;
  }

  while (left <= right) {
    const midIdx = Math.floor((left + right) / 2);
    const guess = arr[midIdx];
    if (guess === target) {
      return midIdx;
    } else if (guess < target) {
      left = midIdx + 1;
    } else {
      right = midIdx - 1;
    }
  }

  return -1;
}

console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12));

module.exports = findRotatedIndex;
