import { render, screen, fireEvent } from "@testing-library/react";
import Board from "./Board";

// Smoke test
it("should render", () => {
  render(<Board />);
});

// Snapshot test
it("should match snapshot (all lit)", () => {
  // 100% chance of lit to maintain snapshot consistency
  const { asFragment } = render(<Board chanceLightStartsOn={1} />);
  expect(asFragment()).toMatchSnapshot();
});

it("should match snapshot (none lit)", () => {
  // 100% chance of lit to maintain snapshot consistency
  const { asFragment } = render(<Board chanceLightStartsOn={0} />);
  // screen.debug();
  expect(asFragment()).toMatchSnapshot();
});

it("should display winning message (none lit)", () => {
  render(<Board chanceLightStartsOn={0} />);
  const msg = screen.getByText("You Win!");
  expect(msg).toBeInTheDocument();
});

it("should toggle all surrounding cells upon click", () => {
  render(<Board chanceLightStartsOn={1} />);
  const cellToBeClicked = screen.getByTestId("1-2");
  fireEvent.click(cellToBeClicked);
  const above = screen.getByTestId("0-2");
  const right = screen.getByTestId("1-3");
  const below = screen.getByTestId("2-2");
  const left = screen.getByTestId("1-1");
  expect(cellToBeClicked).not.toHaveClass("Cell-lit");
  expect(above).not.toHaveClass("Cell-lit");
  expect(right).not.toHaveClass("Cell-lit");
  expect(left).not.toHaveClass("Cell-lit");
  expect(below).not.toHaveClass("Cell-lit");
});
