import {Navigation} from 'react-native-navigation';

import '@fos/screens';
import {SCREENS} from '@fos/constants';
import {Colors} from '@fos/themes';

Navigation.setDefaultOptions({
  layout: {
    backgroundColor: Colors.primary,
    componentBackgroundColor: Colors.primary,
  },
  statusBar: {
    style: 'light',
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: SCREENS.NAV_UX,
      },
    },
  });
});
