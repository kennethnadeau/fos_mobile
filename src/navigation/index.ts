import {Navigation} from 'react-native-navigation';

import '@fos/screens';
import {SCREENS} from '@fos/constants';
import {Colors} from '@fos/themes';

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      noBorder: true,
      background: {
        color: Colors.primary,
      },
      backButton: {
        title: 'Back',
        showTitle: true,
        color: 'white',
      },
    },
    layout: {
      backgroundColor: Colors.primary,
      componentBackgroundColor: Colors.primary,
    },
    statusBar: {
      style: 'light',
    },
    animations: {
      setRoot: {
        alpha: {
          from: 0,
          to: 1,
          duration: 500,
          startDelay: 100,
          interpolation: 'accelerate',
        },
      },
    },
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SCREENS.LANDING,
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
  });
});
