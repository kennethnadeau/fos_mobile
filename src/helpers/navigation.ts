import {Navigation, Options} from 'react-native-navigation';
import {SCREENS} from '@fos/constants';

const commonOptions: Partial<Options> = {
  topBar: {
    visible: true,
    title: {
      component: {
        name: SCREENS.COMPONENTS.TOP_BAR.PAGINATION,
      },
    },
  },
};

export function goToOTPScreen(componentId: string, login = false) {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.OTP,
      options: commonOptions,
      passProps: {
        login,
      },
    },
  });
}
