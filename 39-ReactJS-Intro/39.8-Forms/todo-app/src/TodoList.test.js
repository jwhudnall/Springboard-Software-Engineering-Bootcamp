import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";

test("renders", () => {
  render(<TodoList />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<TodoList />);
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
