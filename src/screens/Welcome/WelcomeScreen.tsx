import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {ScreenFC} from 'react-native-navigation-register-screens';
import {SCREENS} from '@fos/constants';
import RabbitSvg from '@fos/assets/svg/rabbit.svg';
import {s, vs} from 'react-native-size-matters';
import {Colors} from 'themes';
import {Trans} from 'react-i18next';

type WelcomeScreenProps = {
  fullName: string;
};

const WelcomeScreen: ScreenFC<WelcomeScreenProps> = ({fullName}) => (
  <View style={styles.container}>
    <RabbitSvg
      color={Colors.secondary}
      fill={Colors.secondary}
      height={vs(74)}
      width={s(115)}
    />
    <Text style={styles.welcomeText}>
      <Trans values={{fullName}}>Welcome Back</Trans>
    </Text>
  </View>
);

WelcomeScreen.screenName = SCREENS.WELCOME;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: s(28),
    marginTop: vs(20),
    textAlign: 'center',
    width: s(250),
  },
});

export default WelcomeScreen;
