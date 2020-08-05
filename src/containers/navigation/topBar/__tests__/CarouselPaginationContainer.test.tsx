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

  it("should match snapshot", () =>
    expect(carouselPaginationContainer.toJSON()).toMatchSnapshot());
});
