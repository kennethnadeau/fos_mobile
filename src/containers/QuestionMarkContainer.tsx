import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenFC } from "react-native-navigation-register-screens";
import { SCREENS } from "@fos/constants";
import { QuestionMarkIcon } from "@fos/components/Icons/QuestionMarkIcon";

const QuestionMarkContainer: ScreenFC = () => {
  return (
    <View style={styles.container}>
      {/* FIXME Navigate to support screen */}
      <QuestionMarkIcon onPress={() => {}} />
    </View>
  );
};

// TODO: make this more generic
QuestionMarkContainer.screenName = SCREENS.COMPONENTS.TOP_BAR.QUESTION_MARK;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QuestionMarkContainer;
