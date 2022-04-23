import { Link } from "react-router-dom";

const Nav = ({ dogs }) => {
  return (
    <ul>
      {dogs.map((dog) => (
        <li key={dog.name}>
          <Link to={`/dogs/${dog.name}`}>{dog.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
