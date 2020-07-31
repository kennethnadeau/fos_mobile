import React, {FC} from 'react';
import {Text} from 'react-native-elements';
import {TextProps, StyleSheet} from 'react-native';
import {Colors} from '@fos/themes';
import {s} from 'react-native-size-matters';

const FooterText: FC<TextProps> = ({style, ...props}) => (
  <Text {...props} style={[styles.footerText, style]} />
);

const styles = StyleSheet.create({
  footerText: {
    color: Colors.muted,
    fontSize: s(16),
  },
});

export default FooterText;
