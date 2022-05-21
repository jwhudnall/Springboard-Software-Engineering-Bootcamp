import React, { useState } from "react";

const useCounter = ({ init = 0 }) => {
  const [count, setCount] = useState(init);
  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);
  return [count, increment, decrement];
};

export default useCounter;
