import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import { QuestionMarkIcon } from "../QuestionMarkIcon";

describe("<QuestionMarkIcon />", () => {
  let questionMarkIcon: RenderAPI;

  beforeEach(() => {
    questionMarkIcon = render(<QuestionMarkIcon onPress={jest.fn()} />);
  });

  it("should show question mark icon", () => {
    const actual = questionMarkIcon.queryAllByA11yLabel("Support");

    expect(actual).not.toBeNull();
  });
});
