import React, { useState } from "react";
import Circle from "./Circle";

const ColoredCircles = () => {
  const [circles, setCircles] = useState(["cornflowerblue", "peachpuff", "lavender"]);
  const addCircle = () => {
    setCircles((circles) => [...circles, "magenta"]); // Makes new array
  };
  return (
    <div>
      {circles.map((c, i) => (
        <Circle color={c} idx={i} key={i} />
      ))}
      <button onClick={addCircle}>Add</button>
    </div>
  );
};

export default ColoredCircles;
