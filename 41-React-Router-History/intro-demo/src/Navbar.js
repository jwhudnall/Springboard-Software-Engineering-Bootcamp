import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/eat'>Eat</NavLink>
    </nav>
  );
};

export default Navbar;
