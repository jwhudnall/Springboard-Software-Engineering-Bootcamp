import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("renders", () => {
  render(<Todo task='Walk the dog' />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Todo task='Walk the dog' />);
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
