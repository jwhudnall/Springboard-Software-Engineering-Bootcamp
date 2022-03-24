import { render, screen } from "@testing-library/react";

import Card from "./Card";

// Smoke test
it("renders", () => {
  render(<Card caption='sample-caption' src='link-to-somewhere' currNum={2} totalNum={3} />);
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <Card caption='sample-caption' src='link-to-somewhere' currNum={2} totalNum={3} />
  );
  expect(asFragment()).toMatchSnapshot();
});
