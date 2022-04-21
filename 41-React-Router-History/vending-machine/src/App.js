import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import VendingMachine from "./VendingMachine";
import Sardines from "./Sardines";
import Carrots from "./Carrots";
import Almonds from "./Almonds";
import Navbar from "./NavBar";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<VendingMachine />} />
          <Route path='/sardines' element={<Sardines />} />
          <Route path='/almonds' element={<Almonds />} />
          <Route path='/carrots' element={<Carrots />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
