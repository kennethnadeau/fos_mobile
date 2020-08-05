import React, {FC, useEffect, useRef} from 'react';
import {StyleSheet, ViewProps, View} from 'react-native';
import {Text} from 'react-native-elements';
import {vs, s} from 'react-native-size-matters';
import {Colors} from '@fos/themes';
import * as Animatable from 'react-native-animatable';

export type ToastProps = ViewProps & {
  message: string;
  isVisible?: boolean;
  delay?: number;
};

const Toast: FC<ToastProps> = ({
  message,
  isVisible = false,
  delay = 2000,
  ...viewProps
}) => {
  const animatableView = useRef<Animatable.View & View>(null);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        // @ts-ignore
        animatableView.current?.bounceOutUp();
      }, delay);
    }
  }, [delay, isVisible]);

  return isVisible ? (
    <Animatable.View
      animation="bounceInDown"
      easing="ease-in"
      ref={animatableView}
      style={styles.container}
      useNativeDriver
      {...viewProps}>
      <Text style={styles.message}>{message}</Text>
    </Animatable.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    height: vs(60),
    justifyContent: 'center',
  },
  message: {fontSize: s(16), fontWeight: '900'},
});

export default Toast;
