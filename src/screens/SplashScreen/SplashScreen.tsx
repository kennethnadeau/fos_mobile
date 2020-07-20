import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ScreenFC} from 'react-native-navigation-register-screens';
import Logo from '@fos/components/Logo';
import {SCREENS} from '@fos/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {vs} from 'react-native-size-matters';
import {Navigation} from 'react-native-navigation';

const SplashScreen: ScreenFC = () => {
  // TODO Remove when delay when startup logic is ready
  useEffect(() => {
    const timeoutId = setTimeout(
      () =>
        Navigation.setRoot({
          root: {
            stack: {
              id: 'STACK.ROOT',
              children: [
                {
                  component: {
                    name: SCREENS.NAV_UX,
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                },
              ],
            },
          },
        }),
      800,
    );

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
    </SafeAreaView>
  );
};

SplashScreen.screenName = SCREENS.SPLASH_SCREEN;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: vs(20),
  },
});

export default SplashScreen;
