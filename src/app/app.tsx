import React from "react";
import { Platform, StatusBar } from "react-native";
import { AppContainer } from "../screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import KeyboardManager from "react-native-keyboard-manager";
import { connect } from "react-redux";

if (Platform.OS === "ios") {
  KeyboardManager.setKeyboardDistanceFromTextField(100);
}

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle='dark-content' />
      <AppContainer />
    </SafeAreaProvider>
  );
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
