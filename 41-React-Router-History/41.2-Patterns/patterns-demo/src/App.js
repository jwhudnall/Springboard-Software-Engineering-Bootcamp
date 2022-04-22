import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Food from "./Food";
import FoodNav from "./FoodNav";
import NotFound from "./NotFound";
import Contact from "./Contact";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <FoodNav />
        <Routes>
          <Route path='/food/:name' element={<Food />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/secret' element={<Navigate to='/food/sushi' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
