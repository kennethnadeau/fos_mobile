import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {ScreenFC} from 'react-native-navigation-register-screens';
import {SCREENS} from '@fos/constants';
import {vs, s} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import RoundedButton from '@fos/components/RoundedButton';
import Logo from '@fos/components/Logo';
import {useTranslation} from 'react-i18next';

const NavUxScreen: ScreenFC = () => {
  const {t} = useTranslation();

  const headerText = t('screens.navUx.text.selectYourExperience');
  const launchAppText = t('screens.navUx.button.launchApp');
  const newSubscriptionsText = t('screens.navUx.button.newSubscriptions');
  const joinTeamInviteText = t('screens.navUx.button.joinTeamInvite');

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <Text style={styles.header}>{headerText}</Text>

      <View style={styles.buttonContainer}>
        <RoundedButton
          accessibilityLabel={launchAppText}
          accessibilityRole="button"
          accessible
          size="large"
          title={launchAppText}
        />

        <RoundedButton
          accessibilityLabel={newSubscriptionsText}
          accessibilityRole="button"
          accessible
          size="large"
          title={newSubscriptionsText}
        />

        <RoundedButton
          accessibilityLabel={joinTeamInviteText}
          accessibilityRole="button"
          accessible
          size="large"
          title={joinTeamInviteText}
        />
      </View>
    </SafeAreaView>
  );
};

NavUxScreen.screenName = SCREENS.NAV_UX;

const styles = StyleSheet.create({
  buttonContainer: {
    height: vs(180),
    justifyContent: 'space-between',
    marginHorizontal: s(50),
    width: s(300),
  },
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: vs(30),
  },
  header: {
    fontSize: s(16),
    fontWeight: '900',
    lineHeight: vs(19),
    marginVertical: vs(26),
  },
});

export default NavUxScreen;
