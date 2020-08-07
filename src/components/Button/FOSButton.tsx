import React from "react";
import { Button, ButtonProps } from "react-native-elements";
import { s } from "react-native-size-matters";
import { StyleSheet } from "react-native";

type Size = "small" | "medium" | "large";

type SizeMap = { [key in Size]: number };

type Props = ButtonProps & {
  size?: Size;
};

const borderRadiusMap: SizeMap = {
  small: s(8),
  medium: s(30),
  large: s(40),
};

const fontSizeMap: SizeMap = {
  small: s(8),
  medium: s(16),
  large: s(16),
};

const heightMap: SizeMap = {
  small: s(30),
  medium: s(40),
  large: s(50),
};

export const FOSButton = ({
  buttonStyle,
  titleStyle,
  containerStyle,
  size = "small",
  ...props
}: Props) => (
  <Button
    {...props}
    buttonStyle={[
      {
        borderRadius: borderRadiusMap[size],
        height: heightMap[size],
      },
      buttonStyle,
    ]}
    containerStyle={[defaultStyles.container, containerStyle]}
    titleStyle={[{ fontSize: fontSizeMap[size] }, titleStyle]}
  />
);

const defaultStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
