import React from "react";
import OTPScreen from "./OTPScreen";
import { render, RenderAPI } from "@fos/utils/testing";

describe("<OTPScreen />", () => {
  let createNewAccountScreen: RenderAPI;

  beforeEach(() => {
    createNewAccountScreen = render(<OTPScreen componentId="id" />);
  });

  it("should show request code slider item", () => {
    expect(
      createNewAccountScreen.queryByA11yLabel("Enter Mobile Number"),
    ).not.toBeNull();
  });

  it("should show verify code slider item", () => {
    expect(
      createNewAccountScreen.queryByA11yLabel("Enter Verification Code"),
    ).not.toBeNull();
  });

  it("should show email address slider item", () => {
    expect(
      createNewAccountScreen.queryByA11yLabel("Enter Email Address"),
    ).not.toBeNull();
  });

  it("should show new user slider item", () => {
    expect(
      createNewAccountScreen.queryAllByA11yLabel("Enter Name"),
    ).not.toBeNull();
  });
});
