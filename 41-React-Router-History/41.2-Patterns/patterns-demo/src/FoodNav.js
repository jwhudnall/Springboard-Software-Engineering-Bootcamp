import { Link } from "react-router-dom";

const defaultFoods = ["burrito", "salad", "sushi", "pasta"];
const FoodNav = ({ foods = defaultFoods }) => {
  return (
    <ul>
      {foods.map((food) => (
        <li key={food}>
          <Link to={`/food/${food}`}>Show me the {food}!</Link>
        </li>
      ))}
    </ul>
  );
};

export default FoodNav;
