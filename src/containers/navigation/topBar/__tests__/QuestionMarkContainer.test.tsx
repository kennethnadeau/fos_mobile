import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import QuestionMarkContainer from "../QuestionMarkContainer";

describe("<QuestionMarkContainer />", () => {
  let questionMarkContainer: RenderAPI;

  beforeEach(() => {
    questionMarkContainer = render(<QuestionMarkContainer componentId="id" />);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip("should match snapshot", () =>
    expect(questionMarkContainer.toJSON()).toMatchSnapshot());
});
