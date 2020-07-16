import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenFC} from 'react-native-navigation-register-screens';
import {Icon, Text, colors} from 'react-native-elements';

const LoginScreen: ScreenFC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Flats or Spikes</Text>
      <Icon name="check" type="font-awesome" />
    </SafeAreaView>
  );
};

export default LoginScreen;

LoginScreen.screenName = 'Login';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.grey3,
    flex: 1,
    justifyContent: 'center',
  },
});
