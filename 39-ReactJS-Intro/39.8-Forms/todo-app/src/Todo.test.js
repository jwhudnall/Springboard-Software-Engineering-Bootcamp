import { fireEvent, render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("renders", () => {
  render(<Todo task='Walk the dog' />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Todo task='Walk the dog' />);
  expect(asFragment()).toMatchSnapshot();
});

it("deletes todo on click", () => {
  const removeMock = jest.fn();
  render(<Todo task='New task to be done' deleteTodo={removeMock} />);
  const deleteBtn = screen.getAllByText("X")[0];
  fireEvent.click(deleteBtn);
  expect(removeMock).toHaveBeenCalled();
});
