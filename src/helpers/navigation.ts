import {Navigation} from 'react-native-navigation';
import {SCREENS} from '@fos/constants';

export function goToCreateNewAccount(componentId: string) {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.CREATE_NEW_ACCOUNT,
      options: {
        topBar: {
          visible: true,
          title: {
            component: {
              name: SCREENS.COMPONENTS.TOP_BAR.PAGINATION,
            },
          },
        },
      },
    },
  });
}
