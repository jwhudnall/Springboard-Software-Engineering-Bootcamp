import { useState, useEffect } from "react";
import useLocalStorageState from "./hooks/useLocalStorageState";

const Counter = () => {
  // const [count, setCount] = useState(() => {
  //   let value;
  //   value = JSON.parse(window.localStorage.getItem("count") || 0);
  //   return value;
  // });
  // useEffect(() => {
  //   window.localStorage.setItem("count", count);
  // }, [count]);
  const [count, setCount] = useLocalStorageState("count", 0);
  const addToCount = () => {
    setCount((count) => count + 1);
  };
  return (
    <>
      <h4>{count}</h4>
      <button onClick={addToCount}>Add</button>
    </>
  );
};

export default Counter;
