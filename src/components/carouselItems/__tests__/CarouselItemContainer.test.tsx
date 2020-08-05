import React from "react";
import { render, RenderAPI } from "@fos/utils/testing";
import CarouselItemContainer from "../CarouselItemContainer";
import { Text } from "react-native-elements";

const Sample = () => <Text>Sample</Text>;

describe("<CarouselItemContainer />", () => {
  let carouselItemContainer: RenderAPI;

  beforeEach(() => {
    carouselItemContainer = render(
      <CarouselItemContainer header="Hello">
        <Sample />
      </CarouselItemContainer>,
    );
  });

  it("should show header", () => {
    const actual = carouselItemContainer.queryByText("Hello");

    expect(actual).not.toBeNull();
  });

  it("should show passed child component", () => {
    const actual = carouselItemContainer.queryByText("Sample");

    expect(actual).not.toBeNull();
  });

  it("should match snapshot", () => {
    expect(carouselItemContainer.toJSON()).toMatchSnapshot();
  });
});
