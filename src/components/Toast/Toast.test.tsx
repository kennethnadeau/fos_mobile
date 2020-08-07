import React from "react";
import { Toast, ToastProps } from "./Toast";
import { render, RenderAPI } from "@fos/utils/testing";

describe("<Toast />", () => {
  let toast: RenderAPI;
  const toastProps: ToastProps = {
    toastMessage: "Lorem Ipsum",
  };

  beforeEach(() => {
    toast = render(<Toast {...toastProps} />);
  });

  it("should show message", () => {
    const actual = toast.queryByText(toastProps.toastMessage);

    expect(actual).not.toBeNull();
  });

  it("should be possible to hide", () => {
    toast.rerender(
      <Toast {...toastProps} accessibilityLabel="Toast" toastMessage="" />,
    );
    const actual = toast.queryByA11yLabel("Toast");

    expect(actual).toBeNull();
  });
});
