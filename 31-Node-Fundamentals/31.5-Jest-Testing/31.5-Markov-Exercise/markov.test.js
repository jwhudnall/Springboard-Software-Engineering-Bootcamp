const { MarkovMachine } = require("./markov");

describe("Test MarkovMachine", () => {
  let mm;

  beforeEach(() => {
    mm = new MarkovMachine("the cat in the hat is in the hat");
  });

  test("Should contain word array", () => {
    expect(typeof mm.words).toEqual("object");
    expect(Array.isArray(mm.words)).toBeTruthy();
  });

  test("choice should select valid option from array", () => {
    const arr = ["a", "b", "c"];
    const choice = MarkovMachine.choice(arr);
    expect(arr).toContain(choice);
  });

  test("Should contain chains map with appropriate keys", () => {
    expect(mm.chains.get("the")).toBeTruthy();
    expect(mm.chains.get("cat")).toBeTruthy();
    expect(mm.chains.get("in")).toBeTruthy();
    expect(mm.chains.get("hat")).toBeTruthy();
    expect(mm.chains.get("is")).toBeTruthy();
  });

  test("Should generate semi-predictable text", () => {
    const text = mm.makeText();
    console.log(`Text: ${text}`);
    expect(text.endsWith("hat.")).toBe(true);
  });

  test("Chains keys should contain correct array values", () => {
    expect(mm.chains.get("the")).toEqual(["cat", "hat", "hat"]);
    expect(mm.chains.get("cat")).toEqual(["in"]);
    expect(mm.chains.get("in")).toEqual(["the", "the"]);
    expect(mm.chains.get("the")).toEqual(["cat", "hat", "hat"]);
    expect(mm.chains.get("hat")).toEqual(["is", null]);
    expect(mm.chains.get("is")).toEqual(["in"]);
  });
});
