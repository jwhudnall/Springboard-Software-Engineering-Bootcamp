import { render, fireEvent, screen } from "@testing-library/react";
import ShoppingList from "./ShoppingList";

it("renders without crashing", () => {
  render(<ShoppingList />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<ShoppingList />);
  expect(asFragment()).toMatchSnapshot();
});

it("should add new item", () => {
  render(<ShoppingList />);
  expect(screen.queryByText("Product Name: Chocolate Milk")).not.toBeInTheDocument();
  const input = screen.getByLabelText("Product");
  const btn = screen.queryByText("Add Item");
  fireEvent.change(input, { target: { value: "Chocolate Milk" } });
  fireEvent.click(btn);
  expect(screen.getByText("Product Name: Chocolate Milk")).toBeInTheDocument();
});
