const Stack = require("./stack");
const hasBalancedBrackets = require("./challenges");

let stack;

beforeEach(function () {
  stack = new Stack();
});

describe("balanced brackets", () => {
  it("should import Stack ds", () => {
    stack.push("{");
    stack.push("}");
    expect(stack.peek()).toEqual("}");
  });
  it("should return true if brackets are balanced", () => {
    expect(hasBalancedBrackets("(hi) there")).toBeTruthy();
    expect(hasBalancedBrackets("(hi [there])")).toBeTruthy();
    expect(hasBalancedBrackets("(((hi)))")).toBeTruthy();
  });
  it("should return false if brackets are inbalanced", () => {
    expect(hasBalancedBrackets("(hello")).toBeFalsy();
    expect(hasBalancedBrackets("(nope]")).toBeFalsy();
    expect(hasBalancedBrackets("((ok) [nope)]")).toBeFalsy();
  });
});
