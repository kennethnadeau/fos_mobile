import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import { DotPagination } from "./DotPagination";

describe("<DotPagination />", () => {
  let dotPagination: RenderAPI;

  beforeEach(() => {
    dotPagination = render(<DotPagination activeDotIndex={0} dotsLength={4} />);
  });

  it("should show dot pagination", () => {
    const actual = dotPagination.getByA11yLabel("Dot Pagination");

    expect(actual).not.toBeNull();
    expect(actual.children).toHaveLength(1);
  });
});
