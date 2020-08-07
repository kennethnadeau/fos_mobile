import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import { Alert, AlertProps } from "./Alert";
import { Button } from "react-native-elements";

describe("<Alert />", () => {
  let alert: RenderAPI;
  const alertProps: AlertProps = {
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, est!",
    header: "Lorem, ipsum.",
    buttons: [
      {
        id: "hello",
        title: "hello",
        onPress: jest.fn(),
      },
      {
        id: "world",
        title: "world",
        onPress: jest.fn(),
      },
    ],
  };

  beforeEach(() => {
    alert = render(<Alert {...alertProps} />);
  });

  it("should show header", () => {
    const actual = alert.queryByText(alertProps.header);

    expect(actual).not.toBeNull();
  });

  it("should show body", () => {
    const actual = alert.queryByText(alertProps.body);

    expect(actual).not.toBeNull();
  });

  it("should show buttons", () => {
    const helloButton = alert.queryByA11yLabel("hello");
    const worldButton = alert.queryByA11yLabel("world");

    [helloButton, worldButton].forEach((btn) => expect(btn).not.toBeNull());

    alert.rerender(
      <Alert
        {...alertProps}
        buttons={undefined}
        renderButtons={() => <Button accessibilityLabel="Hey" title="Hey" />}
      />,
    );

    const withRenderButtons = alert.queryByA11yLabel("Hey");

    expect(withRenderButtons).not.toBeNull();
  });
});
