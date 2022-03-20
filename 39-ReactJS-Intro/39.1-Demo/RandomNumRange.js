// Default values via destructuring syntax:
const RandomNumRange = ({ min = 1, max = 10 }) => {
  // Random int between min, max
  const rand = Math.floor(Math.random() * (max - min)) + min;
  return <h1>Rand is: {rand}</h1>;
};
