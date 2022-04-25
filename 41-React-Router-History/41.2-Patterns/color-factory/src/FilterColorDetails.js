import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ColorDetail from "./ColorDetail";
import ColorFactory from "./ColorFactory";

function FilterColorDetails({ colors, setColors }) {
  const { color } = useParams();
  const currentColor = colors.find((c) => c.colorName.toLowerCase() === color.toLowerCase());

  if (currentColor) {
    return <ColorDetail color={currentColor} />;
  }

  return <Navigate to='/colors' replace />;
}

export default FilterColorDetails;
