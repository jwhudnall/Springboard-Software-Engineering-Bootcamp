/*
Rest / Spread Operator Exercises
In this exercise, you’ll refactor some ES5 code into ES2015.

Given this function:
function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function(num) {
    return num % 2 === 0
  });
}
Refactor it to use the rest operator & an arrow function:
*/
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const filterOutOdds = (...nums) => nums.filter(n => n % 2 === 0);
console.log(filterOutOdds(...nums));

/*
findMin
Write a function called findMin that accepts a variable number of arguments and returns the smallest argument.

Make sure to do this using the rest and spread operator.
*/
const findMin = (...nums) => Math.min(...nums);
console.log(findMin(...nums));

/*
mergeObjects
Write a function called mergeObjects that accepts two objects and returns a new object which contains all the keys and values of the first object and second object.

mergeObjects({a:1, b:2}, {c:3, d:4}) // {a:1, b:2, c:3, d:4}
*/

const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });
console.log(mergeObjects({ a: 1, b: 2 }, { c: 3, d: 4 }));

/*
doubleAndReturnArgs

Write a function called doubleAndReturnArgs which accepts an array and a variable number of arguments. The function should return a new array with the original array values and all of additional arguments doubled.
*/

const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(n => n * 2)];

console.log(doubleAndReturnArgs([1, 2, 3], 4, 4)) // [1,2,3,8,8]
console.log(doubleAndReturnArgs([2], 10, 4)) // [2, 20, 8]

/*
Slice and Dice!
For this section, write the following functions using rest, spread and refactor these functions to be arrow functions!

Make sure that you are always returning a new array or object and not modifying the existing inputs.

/** remove a random element in the items array
and return a new array without that item. */
const removeRandom = (items) => {
  const newArr = [...items];
  const randIdx = Math.random() * items.length;
  newArr.splice(randIdx, 1);
  return newArr;
}
// console.log(removeRandom([1,2,3,4,5]));

/** Return a new array with every item in array1 and array2. */
const extend = (array1, array2) => [...array1, ...array2];

/** Return a new object with all the keys and values
from obj and a new key/value pair */
const addKeyVal = (obj, key, val) => {
  const objCopy = {...obj};
  objCopy[key] = val;
  return objCopy;
}
console.log(addKeyVal({name: 'James', height: 'tall'}, 'isCool', true));

/** Return a new object with a key removed. */
const removeKey = (obj, key) => {
  const objCopy = {...obj};
  delete objCopy[key];
  return objCopy;
}

/** Combine two objects and return a new object. */
const combine = (obj1, obj2) => ({ ...obj1, ...obj2 });


/** Return a new object with a modified key and value. */
const update = (obj, key, val) => ({ ...obj, [key]: val });
console.log(update({name: 'Tux', species: 'cat', isNice: 'true'}, 'isNice', false));