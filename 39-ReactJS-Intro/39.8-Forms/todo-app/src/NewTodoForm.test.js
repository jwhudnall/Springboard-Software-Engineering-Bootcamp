import { render, screen, fireEvent } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

test("renders", () => {
  render(<NewTodoForm />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<NewTodoForm />);
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});

it("runs the create function on form submit", function () {
  const createMock = jest.fn();
  const { getByText } = render(<NewTodoForm addTodo={createMock} />);
  const createButton = getByText("Add");
  fireEvent.click(createButton);
  expect(createMock).toHaveBeenCalled();
});
