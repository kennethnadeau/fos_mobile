import React, { FC } from "react";
import { View, StyleSheet, ViewStyle, ViewProps } from "react-native";
import { Text } from "react-native-elements";
import { vs, s } from "react-native-size-matters";

export type AuthenticationContainerProps = {
  header: string;
  children: JSX.Element | JSX.Element[];
  containerStyle?: ViewStyle;
  containerProps?: ViewProps;
};

const AuthenticationContainer: FC<AuthenticationContainerProps> = ({
  header,
  children,
  containerStyle,
  containerProps,
}) => (
  <View style={[styles.container, containerStyle]} {...containerProps}>
    <Text h4 style={styles.header}>
      {header}
    </Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: s(40),
  },
  header: { marginVertical: vs(20) },
});

export default AuthenticationContainer;
