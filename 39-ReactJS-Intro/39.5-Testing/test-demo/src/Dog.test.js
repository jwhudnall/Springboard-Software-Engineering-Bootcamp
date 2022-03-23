import { render, screen } from "@testing-library/react";
import Dog from "./Dog";

test("renders without crashing", () => {
  render(<Dog name='Millie' isAdopted={true} />);
});

it("Should match snapshot", () => {
  const { asFragment } = render(<Dog name='Millie' isAdopted={true} />);
  expect(asFragment()).toMatchSnapshot();
});

it("Should match snapshot (false)", () => {
  const { asFragment } = render(<Dog name='Millie' isAdopted={false} />);
  expect(asFragment()).toMatchSnapshot();
});
