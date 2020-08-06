import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import QuestionMarkContainer from "../QuestionMarkContainer";

describe("<QuestionMarkContainer />", () => {
  let questionMarkContainer: RenderAPI;

  beforeEach(() => {
    questionMarkContainer = render(<QuestionMarkContainer componentId="id" />);
  });

  it("should show support icon with the correct state", () => {
    const actual = questionMarkContainer.queryAllByA11yLabel("Support");
    expect(actual).not.toBeNull();
  });
});
