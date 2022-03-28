import { render, screen, fireEvent } from "@testing-library/react";
import Cell from "./Cell";

// Smoke Test
it("renders without crashing", () => {
  render(<Cell isLit={true} dataId={"0-2"} />);
});

// Snapshot Test
it("matches snapshot", () => {
  const { asFragment } = render(<Cell isLit={true} dataId={"0-2"} />);
  screen.debug();
  expect(asFragment()).toMatchSnapshot();
});
