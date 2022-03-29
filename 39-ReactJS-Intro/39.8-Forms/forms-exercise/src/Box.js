import React, { useState } from "react";

const Box = ({ backgroundColor, width, height, deleteBox }) => {
  // this component should display a div with a background color, width and height based on the props passed to it.
  return (
    <div style={{ backgroundColor: backgroundColor, width, height }}>
      <button onClick={deleteBox}>X</button>
    </div>
  );
};

export default Box;
