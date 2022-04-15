const Stack = require("./stack");

const hasBalancedBrackets = (str) => {
  // Stack.push, pop, peek, isEmpty
  const bracketPairs = {
    ")": "(",
    "}": "{",
    "]": "["
  };
  const openingBrackets = Object.values(bracketPairs);
  const closingBrackets = Object.keys(bracketPairs);
  const stack = new Stack();

  for (char of str) {
    // if char is in opening brackets, add it to the stack
    if (openingBrackets.indexOf(char) !== -1) {
      stack.push(char);
    } else if (closingBrackets.indexOf(char) !== -1) {
      const isCorrectBracket = stack.peek() === bracketPairs[char];
      if (isCorrectBracket) {
        stack.pop();
      } else {
        return false;
      }
    }
    // else if char is in closing brackets, peek at stack value.
    // if they are a pair, pop the top off the stack and continue
    // else, return false
  }
  // return stack.length === 0
  return stack.size === 0;
};

module.exports = hasBalancedBrackets;
