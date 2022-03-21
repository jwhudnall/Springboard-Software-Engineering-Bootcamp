const cats = [
  {
    name: "blue",
    age: 5
  },
  {
    name: "Tux",
    age: 7
  }
];

const meow = () => "MEOW!";
// Default Export (only 1 per file!)
export default cats;
export { meow };
