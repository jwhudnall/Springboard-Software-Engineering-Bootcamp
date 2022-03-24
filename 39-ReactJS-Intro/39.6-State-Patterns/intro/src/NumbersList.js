import React, { useState } from "react";
import NumberItem from "./NumberItem";

const NumbersList = () => {
  const [numbers, setNumbers] = useState([2, 4, 5, 6, 99]);
  const remove = (num) => {
    setNumbers(numbers.filter((n) => n !== num));
  };
  return (
    <ul>
      {numbers.map((n) => (
        <NumberItem number={n} remove={remove} />
      ))}
    </ul>
  );
};

export default NumbersList;
