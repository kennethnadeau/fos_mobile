import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from '@fos/redux/store';
import {ThemeProvider, colors, Theme} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from '@fos/themes';

export const {store, persistor} = configureStore();

const defaultTheme: Theme = {
  Button: {
    buttonStyle: {
      backgroundColor: Colors.secondary,
    },
  },
  Text: {
    style: {
      color: colors.grey5,
    },
  },
  Icon: {
    color: colors.primary,
  },
};

function wrapWithRequiredProviders(Component: React.ComponentType<any>) {
  return (props: any) => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <SafeAreaProvider>
            <Component {...props} />
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapWithRequiredProviders;
