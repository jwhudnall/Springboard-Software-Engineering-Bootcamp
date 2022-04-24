import React from "react";
import { useParams } from "react-router-dom";
import ColorDetail from "./ColorDetail";

function FilterColorDetails({ colors }) {
  const { color } = useParams();

  if (color) {
    const currentColor = colors.find((c) => c.colorName.toLowerCase() === color.toLowerCase());
    console.log(currentColor);
    return <ColorDetail color={currentColor} />;
  }

  return null;
}

export default FilterColorDetails;
