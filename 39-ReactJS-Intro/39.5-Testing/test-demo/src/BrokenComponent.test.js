import { render, screen } from "@testing-library/react";
import BrokenComponent from "./BrokenComponent";

test("renders without crashing", () => {
  render(<BrokenComponent />);
});
