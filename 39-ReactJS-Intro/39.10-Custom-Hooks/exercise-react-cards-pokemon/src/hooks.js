import { useState } from "react";

const useFlip = () => {
  const [flipState, setFlipState] = useState(true);
  const toggleState = () => {
    setFlipState((state) => !state);
  };
  return [flipState, toggleState];
};

export default useFlip;
