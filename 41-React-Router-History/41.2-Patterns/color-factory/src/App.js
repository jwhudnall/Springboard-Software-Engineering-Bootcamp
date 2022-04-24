import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import ColorFactory from "./ColorFactory";
import FilterColorDetails from "./FilterColorDetails";

function App({ colors }) {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/colors' element={<ColorFactory colors={colors} />} />
          <Route path='/colors/:color' element={<FilterColorDetails colors={colors} />} />
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
  ]
};
