import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Eat from "./Eat";

function App() {
  return (
    <div className='App'>
      <h1>Bookkeeper!</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/eat' element={<Eat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
