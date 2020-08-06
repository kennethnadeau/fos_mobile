import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import RequestOtpCode, { RequestCodeProps } from "./RequestOtpCode";

describe("<RequestOtpCode />", () => {
  const props: RequestCodeProps = {
    onRequestCodePress: jest.fn(),
    countryCode: "",
    mobileNumber: "",
    onCountryCodeChange: jest.fn(),
    onMobileNumberChangeText: jest.fn(),
    onMobileNumberClear: jest.fn(),
  };

  let requestCodeComponent: RenderAPI;

  beforeEach(() => {
    requestCodeComponent = render(<RequestOtpCode {...props} />);
  });

  it("should have carousel item description", () => {
    const actual = requestCodeComponent.queryByA11yLabel("Enter Mobile Number");

    expect(actual).not.toBeNull();
  });

  it("should show header", () => {
    const actual = requestCodeComponent.queryByText("Enter Mobile Number");
    expect(actual).not.toBeNull();
  });

  it("should show country code input", () => {
    const actual = requestCodeComponent.queryByA11yLabel("Country code");

    expect(actual).not.toBeNull();
  });

  it("should show mobile number input", () => {
    const actual = requestCodeComponent.queryByPlaceholder("Your Number");

    expect(actual).not.toBeNull();
  });

  it("should show request code button", () => {
    const actual = requestCodeComponent.queryByA11yLabel("Request Code");
    expect(actual).not.toBeNull();
  });
});
