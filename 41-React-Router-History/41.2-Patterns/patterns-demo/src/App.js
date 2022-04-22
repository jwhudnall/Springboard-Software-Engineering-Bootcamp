import { BrowserRouter, Route, Routes } from "react-router-dom";
import Food from "./Food";
import FoodNav from "./FoodNav";
import NotFound from "./NotFound";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <FoodNav />
        <Routes>
          <Route path='/food/:name' element={<Food />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
