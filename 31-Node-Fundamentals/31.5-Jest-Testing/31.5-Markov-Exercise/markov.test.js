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

  test("Should contain chains dictionary with appropriate keys", () => {
    expect(mm.chains).toHaveProperty("the");
    expect(mm.chains).toHaveProperty("cat");
    expect(mm.chains).toHaveProperty("in");
    expect(mm.chains).toHaveProperty("hat");
    expect(mm.chains).toHaveProperty("is");
  });

  test("Chains keys should contain correct array values", () => {
    expect(mm.chains["the"]).toEqual(["cat", "hat", "hat"]);
    expect(mm.chains["cat"]).toEqual(["in"]);
    expect(mm.chains["in"]).toEqual(["the", "the"]);
    expect(mm.chains["the"]).toEqual(["cat", "hat", "hat"]);
    expect(mm.chains["hat"]).toEqual(["is", null]);
    expect(mm.chains["is"]).toEqual(["in"]);
  });
});
