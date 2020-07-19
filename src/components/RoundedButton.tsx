import React from 'react';
import {Button, ButtonProps} from 'react-native-elements';
import {s, vs} from 'react-native-size-matters';

type Size = 'small' | 'medium' | 'large';

type SizeMap = {[key in Size]: number};

type Props = ButtonProps & {
  size?: Size;
};

const borderRadiusMap: SizeMap = {
  small: s(8),
  medium: s(30),
  large: s(30),
};

const fontSizeMap: SizeMap = {
  small: s(8),
  medium: s(12),
  large: s(16),
};

const heightMap: SizeMap = {
  small: vs(40),
  medium: vs(45),
  large: vs(50),
};

const RoundedButton = ({
  buttonStyle,
  titleStyle,
  size = 'small',
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
    titleStyle={[{fontSize: fontSizeMap[size]}, titleStyle]}
  />
);

export default RoundedButton;
