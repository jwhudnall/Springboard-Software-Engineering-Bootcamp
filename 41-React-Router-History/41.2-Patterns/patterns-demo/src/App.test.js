import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

test("/contact route", () => {
  render(
    <MemoryRouter initialEntries={["/contact"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText("To get in touch, enter your email.")).toBeInTheDocument();
});

test("navbar links", () => {
  render(
    <MemoryRouter initialEntries={["/food/burrito"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Here's a pic of burrito")).toBeInTheDocument();

  const link = screen.getByText("Show me the salad!");
  fireEvent.click(link);
  expect(screen.getByText("Here's a pic of salad")).toBeInTheDocument();
});
