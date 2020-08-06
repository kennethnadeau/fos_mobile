import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import CarouselPaginationContainer from "../CarouselPaginationContainer";

describe("<CarouselPaginationContainer />", () => {
  let carouselPaginationContainer: RenderAPI;

  beforeEach(() => {
    carouselPaginationContainer = render(
      <CarouselPaginationContainer componentId="id" />,
    );
  });

  it("should show pagination with the correct state", () => {
    const actual = carouselPaginationContainer.queryByA11yLabel(
      "Carousel Pagination",
    );
    expect(actual).not.toBeNull();
  });
});
