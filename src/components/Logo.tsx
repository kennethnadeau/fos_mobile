import React, {FC} from 'react';
import {Image, StyleSheet, ImageStyle} from 'react-native';
import {Images} from '@fos/themes';
import {s, vs} from 'react-native-size-matters';

const Logo: FC<{style?: ImageStyle}> = ({style}) => {
  return (
    <Image
      accessibilityLabel="App logo"
      accessible
      resizeMode="contain"
      source={Images.logo}
      style={[styles.image, style]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: vs(138),
    width: s(151),
  },
});

export default Logo;
