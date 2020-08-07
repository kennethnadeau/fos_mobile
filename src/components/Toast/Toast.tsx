import React, { FC, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, ViewProps, View } from "react-native";
import { Text } from "react-native-elements";
import { vs, s } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";

import { Colors } from "@fos/themes";
import { setToastMessage } from "@fos/redux/slices/toastSlice";

export type ToastProps = ViewProps & {
  toastMessage: string;
  delay?: number;
};

export const Toast: FC<ToastProps> = ({
  toastMessage,
  delay = 2000,
  ...viewProps
}) => {
  const animatableView = useRef<Animatable.View & View>(null);
  const dispatch = useDispatch();
  const isVisible = !!toastMessage;

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        // @ts-ignore
        animatableView.current?.bounceOutUp();
        dispatch(setToastMessage(""));
      }, delay);
    }
  }, [delay, isVisible, dispatch]);

  return isVisible ? (
    <Animatable.View
      animation="bounceInDown"
      easing="ease-in"
      ref={animatableView}
      style={styles.container}
      useNativeDriver
      {...viewProps}>
      <Text style={styles.message}>{toastMessage}</Text>
    </Animatable.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: Colors.secondary,
    height: vs(60),
    justifyContent: "center",
  },
  message: { fontSize: s(16), fontWeight: "900" },
});
