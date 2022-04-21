import "./App.css";
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";
import Home from "./Home";
import Eat from "./Eat";
import Navbar from "./Navbar";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/eat' element={<Eat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
