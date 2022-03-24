import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("renders without crashing", () => {
  render(<Counter />);
});

it("should play with queries", () => {
  // const { getByText } = render(<Counter />);
  render(<Counter />);
  screen.getByText(`Let's count`, { exact: false });
});

it("should play with getAllByText queries", () => {
  const { getAllByText } = render(<Counter />);
  console.log(getAllByText(`count`, { exact: false }));
});

it("handles button clicks", () => {
  // Example using 'screen' vs destructuring
  render(<Counter />);
  screen.debug();
  const h2 = screen.getByText("Current count: 0");
  const btn = screen.getByText("Add");
  fireEvent.click(btn);
  screen.debug();
  expect(h2).toHaveTextContent("1");
  expect(h2).not.toHaveTextContent("0");
});
