import { useState } from "react";
import { Link } from "react-router-dom";

const ColorSelectList = ({ colors }) => {
  const [pallete, setPallete] = useState(colors);
  return (
    <div>
      <h2>Please select a color.</h2>
      <ul>
        {pallete.map((color) => (
          <li key={color.colorName}>
            <Link to={`/colors/${color.colorName}`}>{color.colorName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorSelectList;
