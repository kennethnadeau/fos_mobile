import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScreenFC} from 'react-native-navigation-register-screens';
import Logo from '@fos/components/Logo';
import {SCREENS} from '@fos/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, Button} from 'react-native-elements';
import {vs, s, ms} from 'react-native-size-matters';
import RoundedButton from '@fos/components/RoundedButton';
import {useTranslation} from 'react-i18next';
import LandingHeaderBg from '@fos/assets/svg/landingHeaderBg.svg';

const LandingScreen: ScreenFC = () => {
  const {t} = useTranslation();

  const createNewAccountText = t('screens.landing.button.createNewAccount');
  const loginText = t('screens.landing.button.login');

  return (
    <SafeAreaView style={styles.container}>
      <LandingHeaderBg />
      <Text style={styles.headerText}>{t('screens.landing.header')}</Text>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton
          accessibilityLabel={createNewAccountText}
          accessible
          containerStyle={styles.createNewAccountBtnContainer}
          size="medium"
          title={createNewAccountText}
          titleStyle={styles.createNewAccountBtnTitle}
        />
        <Button
          accessibilityLabel={loginText}
          accessible
          buttonStyle={styles.loginBtn}
          title={loginText}
          type="clear"
        />
      </View>
    </SafeAreaView>
  );
};

LandingScreen.screenName = SCREENS.LANDING;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginBottom: vs(40),
    marginHorizontal: s(30),
    paddingHorizontal: s(30),
  },
  container: {
    flex: 1,
  },
  createNewAccountBtnContainer: {
    width: ms(320),
  },
  createNewAccountBtnTitle: {
    fontWeight: '700',
  },
  headerText: {
    ...StyleSheet.absoluteFillObject,
    fontSize: s(46),
    fontWeight: '700',
    marginTop: vs(100),
    textAlign: 'center',
  },
  loginBtn: {backgroundColor: 'transparent'},
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: vs(5),
  },
});

export default LandingScreen;
