import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {ScreenFC} from 'react-native-navigation-register-screens';
import {SCREENS} from '@fos/constants';
import {vs, s, ms} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import RoundedButton from '@fos/components/RoundedButton';
import Logo from '@fos/components/Logo';
import {useTranslation} from 'react-i18next';
import {Navigation} from 'react-native-navigation';

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

      <View style={styles.btnContainer}>
        <RoundedButton
          accessibilityLabel={launchAppText}
          accessibilityRole="button"
          accessible
          buttonStyle={styles.btn}
          onPress={() => {
            Navigation.push('STACK.ROOT', {
              component: {
                name: SCREENS.LANDING,
                options: {
                  topBar: {
                    visible: false,
                  },
                },
              },
            });
          }}
          size="large"
          title={launchAppText}
        />

        <RoundedButton
          accessibilityLabel={newSubscriptionsText}
          accessibilityRole="button"
          accessible
          buttonStyle={styles.btn}
          size="large"
          title={newSubscriptionsText}
        />

        <RoundedButton
          accessibilityLabel={joinTeamInviteText}
          accessibilityRole="button"
          accessible
          buttonStyle={styles.btn}
          size="large"
          title={joinTeamInviteText}
        />
      </View>
    </SafeAreaView>
  );
};

NavUxScreen.screenName = SCREENS.NAV_UX;

const styles = StyleSheet.create({
  btn: {
    width: ms(300),
  },
  btnContainer: {
    alignItems: 'center',
    height: vs(220),
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
    lineHeight: vs(25),
    marginVertical: vs(30),
  },
});

export default NavUxScreen;
