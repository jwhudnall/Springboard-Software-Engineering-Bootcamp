import FoodNav from "./FoodNav";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <FoodNav />
    </MemoryRouter>
  );
});
