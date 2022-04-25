import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import ColorFactory from "./ColorFactory";
import FilterColorDetails from "./FilterColorDetails";
import ColorForm from "./ColorForm";

function App() {
  const DEFAULT_COLORS = [
    {
      colorName: "red",
      colorValue: "red"
    },
    {
      colorName: "green",
      colorValue: "green"
    },
    {
      colorName: "blue",
      colorValue: "blue"
    }
  ];
  const [colors, setColors] = useState(DEFAULT_COLORS);
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/colors' element={<ColorFactory colors={colors} setColors={setColors} />} />
          <Route path='/colors/:color' element={<FilterColorDetails colors={colors} />} />
          <Route path='/colors/new' element={<ColorForm colors={colors} setColors={setColors} />} />
          <Route path='/*' element={<Navigate to='/colors' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

App.defaultProps = {
  colors: [
    {
      colorName: "red",
      colorValue: "#fd0d0d"
    },
    {
      colorName: "green",
      colorValue: "#26e870"
    },
    {
      colorName: "blue",
      colorValue: "#2566e9"
    }
  ]
};
