import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import { CarouselPagination } from "./CarouselPagination";

describe("<CarouselPagination />", () => {
  let carouselPagination: RenderAPI;

  beforeEach(() => {
    carouselPagination = render(
      <CarouselPagination activeDotIndex={0} dotsLength={4} />,
    );
  });

  it("should show carousel pagination", () => {
    const actual = carouselPagination.getByA11yLabel("Carousel Pagination");

    expect(actual).not.toBeNull();
    expect(actual.children).toHaveLength(1);
  });
});
