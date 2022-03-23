import { render, screen } from "@testing-library/react";
import FixedComponent from "./FixedComponent";

test("renders without crashing", () => {
  render(<FixedComponent />);
});

it("Should match snapshot", () => {
  const { asFragment } = render(<FixedComponent />);
  expect(asFragment()).toMatchSnapshot();
});
