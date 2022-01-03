/*
Object Enhancements Exercise
In this exercise, you’ll refactor some ES5 code into ES2015.
Write your code in the sections with a comment to “Write an ES2015 Version”.

*/

// Same keys and values ES2015
const createInstructor = (firstName, lastName) => {
  return {
    firstName,
    lastName
  }
}

// Computed Property Names ES2015
const favoriteNumber = 42;

const instructor = {
  firstName: "Colt",
  [favoriteNumber]: "That is my favorite!"
}

// Object Methods ES2015
const instructor1 = {
  firstName: "Colt",
  sayHi() {
    return "Hi!";
  },
  sayBye() {
    return this.firstName + " says bye!";
  }
}
console.log(instructor1.sayBye());

// createAnimal function
const createAnimal = function (species, verb, noise) {
  return {
    species,
    [verb]() {
    return noise;
  }
}
}

const puppy = createAnimal('dog', 'yip', 'BOWBOW!');
// console.log(puppy.yip());