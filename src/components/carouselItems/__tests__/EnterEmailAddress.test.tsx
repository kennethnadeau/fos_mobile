import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import EmailAddress, { EnterEmailAddressProps } from "../EnterEmailAddress";

describe("<EmailAddress />", () => {
  let enterEmailAddress: RenderAPI;
  const props: EnterEmailAddressProps = {
    onEmailClear: jest.fn(),
    emailAddress: "foo@example.com",
    onNextPress: jest.fn(),
    onEmailAddressChangeText: jest.fn(),
  };

  beforeEach(() => {
    enterEmailAddress = render(<EmailAddress {...props} />);
  });

  it("should show header", () => {
    const actual = enterEmailAddress.queryByText("Enter Email Address");

    expect(actual).not.toBeNull();
  });

  it("should show input", () => {
    const actual = enterEmailAddress.queryByA11yLabel("Your Email");

    const placeholder = enterEmailAddress.queryByPlaceholder("Your Email");

    expect(actual).not.toBeNull();
    expect(placeholder).not.toBeNull();
  });

  it("should show next button", () => {
    const actual = enterEmailAddress.queryByA11yLabel("Next");

    expect(actual).not.toBeNull();
  });

  it("should show footer", () => {
    const actual = enterEmailAddress.queryByText("Email Usage");

    expect(actual).not.toBeNull();
  });

  it("should match snapshot", () => {
    expect(enterEmailAddress.toJSON()).toMatchSnapshot();
  });
});
