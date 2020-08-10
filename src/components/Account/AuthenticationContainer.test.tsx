import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import AuthenticationContainer from "./AuthenticationContainer";
import { Text } from "react-native-elements";

const Sample = () => <Text>Sample</Text>;

describe("<AuthenticationContainer />", () => {
  let authenticationContainer: RenderAPI;

  beforeEach(() => {
    authenticationContainer = render(
      <AuthenticationContainer header="Hello">
        <Sample />
      </AuthenticationContainer>,
    );
  });

  it("should show header", () => {
    const actual = authenticationContainer.queryByText("Hello");

    expect(actual).not.toBeNull();
  });

  it("should show passed child component", () => {
    const actual = authenticationContainer.queryByText("Sample");

    expect(actual).not.toBeNull();
  });
});
