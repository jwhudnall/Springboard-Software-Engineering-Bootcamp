import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

// Smoke Test
it("renders", () => {
  render(<Carousel />);
});

// Snapshot Test
it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  // screen.debug();
  expect(asFragment()).toMatchSnapshot();
});

it("scrolls left and right", () => {
  render(<Carousel />);
  const rightArrow = screen.getByTestId("right-arrow");
  const smallText = screen.getByText("Image 1 of 3.");
  fireEvent.click(rightArrow);
  const leftArrow = screen.getByTestId("left-arrow");
  expect(smallText).toHaveTextContent("2 of 3");
  fireEvent.click(leftArrow);
  expect(smallText).toHaveTextContent("1 of 3");
});

it("hides left arrow at 0 idx", () => {
  render(<Carousel />);
  const leftArrow = screen.queryByTestId("left-arrow");
  expect(leftArrow).toBeNull();
});

it("hides right arrow at last idx", () => {
  render(<Carousel />);
  const rightArrow = screen.queryByTestId("right-arrow");
  fireEvent.click(rightArrow); // 2/3
  fireEvent.click(rightArrow); // 3/3 (should now be hidden)
  expect(screen.queryByTestId("right-arrow")).toBeNull();
});
