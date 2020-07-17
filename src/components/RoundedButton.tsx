import React, {useContext} from 'react';
import {Button, ButtonProps} from 'react-native-elements';
import {s} from 'react-native-size-matters';
import {ThemeContext} from 'react-native-elements';

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
}: Props) => {
  const {theme} = useContext(ThemeContext);

  return (
    <Button
      {...props}
      buttonStyle={[
        {
          borderRadius: borderRadiusMap[size],
          padding: paddingMap[size],
        },
        theme.Button?.buttonStyle,
        buttonStyle,
      ]}
      titleStyle={[{fontSize: fontSizeMap[size]}, titleStyle]}
    />
  );
};

export default RoundedButton;
