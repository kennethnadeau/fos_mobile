import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenFC } from "react-native-navigation-register-screens";
import { SCREENS } from "@fos/constants";
// TODO: need icon here
// import { BackButtonIcon } from "@fos/components/Icons/BackButtonIcon";
// import { Navigation } from "react-native-navigation";

const BackButtonContainer: ScreenFC = () => {
  return (
    <View style={styles.container}>
      {/* <BackButtonIcon onPress={() => Navigation.pop()} /> */}
    </View>
  );
};

BackButtonContainer.screenName = SCREENS.COMPONENTS.TOP_BAR.BACK_BUTTON;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BackButtonContainer;
