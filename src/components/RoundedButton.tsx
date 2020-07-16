import React from 'react';
import {Button, ButtonProps} from 'react-native-elements';
import {s} from 'react-native-size-matters';

type Size = 'small' | 'medium' | 'large';

type SizeMap = {[key in Size]: number};

type Props = ButtonProps & {
  size?: Size;
};

const borderRadiusMap: SizeMap = {
  small: s(8),
  medium: s(15),
  large: s(30),
};

const paddingMap: SizeMap = {
  small: s(8),
  medium: s(12),
  large: s(16),
};

const fontSizeMap: SizeMap = {
  small: s(8),
  medium: s(12),
  large: s(16),
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
      {borderRadius: borderRadiusMap[size], padding: paddingMap[size]},
      buttonStyle,
    ]}
    titleStyle={[{fontSize: fontSizeMap[size]}, titleStyle]}
  />
);

export default RoundedButton;
