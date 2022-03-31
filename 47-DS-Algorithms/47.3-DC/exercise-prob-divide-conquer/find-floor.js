function findFloor(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  if (target < arr[0]) {
    return -1;
  }
  if (target > arr[right]) {
    return arr[right];
  }

  while (left < right) {
    const midIdx = Math.floor((left + right) / 2);
    const guess = arr[midIdx];
    if (guess > target) {
      right = midIdx - 1;
    } else if (guess <= target && arr[midIdx + 1] > target) {
      return guess;
    } else {
      left = midIdx;
    }
  }
}

const result = findFloor([1, 2, 8, 10, 10, 12, 19], 0);
console.log(result);
module.exports = findFloor;
