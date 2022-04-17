import { useState } from "react";
// Custom Hook Objectives:
// 1) Make a piece of state - start as true or false
// 2) Make a function to toggle state from t=>f or f=>t

const useToggleState = (initialState = true) => {
  const [state, setState] = useState(true);
  const toggleState = () => {
    setState((state) => !state);
  };
  return [state, toggleState];
};

export default useToggleState;
