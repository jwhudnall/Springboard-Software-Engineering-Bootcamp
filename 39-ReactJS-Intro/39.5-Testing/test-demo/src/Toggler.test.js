import { render, fireEvent } from "@testing-library/react";
import Toggler from "./Toggler";

it("should show", () => {
  const { getByText } = render(<Toggler />);
  const heading = getByText("Hello World");
  expect(heading).toHaveClass("Toggler-text");
  expect(heading).toBeInTheDocument();
});

it("should toggle", () => {
  const { getByText } = render(<Toggler />);
  const heading = getByText("Hello World");
  expect(heading).toBeInTheDocument();
  fireEvent.click(getByText("Toggle")); // simulate button click
  expect(heading).not.toBeInTheDocument();
});
