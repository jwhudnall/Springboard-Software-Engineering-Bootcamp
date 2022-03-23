import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

test("renders without crashing", () => {
  render(<Counter />);
});
