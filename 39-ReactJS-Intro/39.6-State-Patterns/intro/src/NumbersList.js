import React, { useState } from "react";

const NumbersList = () => {
  const [numbers, setNumbers] = useState([2, 4, 5, 6, 99]);
  const remove = (num) => {
    setNumbers(numbers.filter((n) => n !== num));
  };
  return (
    <ul>
      {numbers.map((n) => (
        <li>
          <button onClick={() => remove(n)}>{n}</button>
        </li>
      ))}
    </ul>
  );
};

export default NumbersList;
