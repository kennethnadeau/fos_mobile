import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import DotPaginationContainer from "./DotPaginationContainer";

describe("<DotPaginationContainer />", () => {
  let dotPaginationContainer: RenderAPI;

  beforeEach(() => {
    dotPaginationContainer = render(
      <DotPaginationContainer componentId="id" />,
    );
  });

  it("should show pagination with the correct state", () => {
    const actual = dotPaginationContainer.queryByA11yLabel("Dot Pagination");
    expect(actual).not.toBeNull();
  });
});
