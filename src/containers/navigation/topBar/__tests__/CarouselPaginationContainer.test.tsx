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

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip("should match snapshot", () =>
    expect(carouselPaginationContainer.toJSON()).toMatchSnapshot());
});
