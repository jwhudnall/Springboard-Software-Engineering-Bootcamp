const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;

  while (end >= start) {
    let mid = Math.floor((start + end) / 2);
    let guess = arr[mid];
    console.log(`Mid idx: ${mid}`);
    if (guess === target) {
      return mid;
    } else if (guess < target) {
      start = mid + 1;
    } else if (guess > target) {
      end = mid - 1;
    }
  }
  return -1;
};

const arr1 = [1, 2, 3, 4, 5, 6, 7, 9, 10];
console.log(binarySearch(arr1, 31));
