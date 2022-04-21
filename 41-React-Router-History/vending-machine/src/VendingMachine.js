import { Route, Routes, Link, NavLink } from "react-router-dom";
import "./VendingMachine.css";

const VendingMachine = () => {
  return (
    <div className='VendingMachine'>
      <h1>Healthy-Snack Vending Machine</h1>
      <ul>
        <li>
          <Link to='/sardines'>Sardines</Link>
        </li>
        <li>
          <Link to='/almonds'>Almonds</Link>
        </li>
        <li>
          <Link to='/carrots'>Carrots</Link>
        </li>
      </ul>
    </div>
  );
};

export default VendingMachine;
