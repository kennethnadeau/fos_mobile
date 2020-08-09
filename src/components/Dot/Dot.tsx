import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "themes";

type DotProps = {
  active?: boolean;
};

export const Dot: FC<DotProps> = (props) => {
  let currentStyle = props.active ? styles.dotActive : styles.dotInactive;
  return <View style={[styles.dot, currentStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    borderRadius: 5,
    height: 8,
    marginHorizontal: 3,
    width: 8,
  },
  dotActive: {
    backgroundColor: Colors.white,
  },
  dotInactive: {
    backgroundColor: Colors.muted,
    height: 6,
    width: 6,
  },
});
