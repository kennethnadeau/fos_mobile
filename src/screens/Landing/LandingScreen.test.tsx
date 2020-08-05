import React from "react";
import LandingScreen from "./LandingScreen";
import { render, RenderAPI } from "@fos/utils/testing";

describe("<LandingScreen />", () => {
  let rendered: RenderAPI;

  beforeEach(() => {
    rendered = render(<LandingScreen componentId="id" />);
  });

  it("should show header", () => {
    const actual = rendered.queryByText("Data. Meets. People.");

    expect(actual).toBeDefined();
  });

  it("should show logo", () => {
    const actual = rendered.queryByA11yLabel("App logo");

    expect(actual).toBeDefined();
  });

  it("should show create new account button", () => {
    const actual = rendered.getByA11yLabel("Create New Account");

    expect(actual).toBeDefined();
  });

  it("should show login button", () => {
    const actual = rendered.getByA11yLabel("Log In");

    expect(actual).toBeDefined();
  });
});
