import { NavLink } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className='NavBar'>
      <NavLink to='/'>Vending Machine</NavLink>
      <NavLink to='/sardines'>Sardines</NavLink>
      <NavLink to='/almonds'>Almonds</NavLink>
      <NavLink to='/carrots'>Carrots</NavLink>
    </nav>
  );
};

export default Navbar;
