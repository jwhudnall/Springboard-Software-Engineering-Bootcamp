import React, { useState } from "react";
import Circle from "./Circle";
import ColorButtons from "./ColorButtons";

const getRandom = (min = 0, max = 100) => {
  return Math.random() * (max - min) + min;
};

const ColoredCircles = () => {
  const [circles, setCircles] = useState([]);
  const addCircle = (color) => {
    setCircles((circles) => [...circles, { color, x: getRandom(), y: getRandom() }]); // Makes new array
  };
  const changePosition = (idx) => {
    setCircles((circles) => {
      const copy = [...circles];
      copy[idx].x = getRandom();
      copy[idx].y = getRandom();
      return copy;
    });
  };
  return (
    <div>
      <ColorButtons
        options={["peachpuff", "lightsteelblue", "paleturquoise"]}
        addCircle={addCircle}
      />
      {/* <button onClick={() => addCircle("peachpuff")}>Peachpuff</button>
      <button onClick={() => addCircle("paleturquoise")}>Paleturquoise</button> */}
      {circles.map(({ color, x, y }, i) => (
        <Circle color={color} idx={i} key={i} x={x} y={y} changePosition={changePosition} />
      ))}
    </div>
  );
};

export default ColoredCircles;
