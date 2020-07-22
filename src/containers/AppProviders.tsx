import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider, Theme, colors} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import createStore from '@fos/redux/store';
import {Colors} from '@fos/themes';
import {s} from 'react-native-size-matters';

const {store, persistor} = createStore();

const defaultTheme: Theme = {
  Button: {
    buttonStyle: [
      {
        backgroundColor: Colors.secondary,
      },
    ],
    titleStyle: [
      {
        color: 'white',
        fontSize: s(16),
      },
    ],
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

const AppProviders: FC<{
  children: React.ReactElement<any>;
  testing?: boolean;
}> = ({children, testing = false}) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={defaultTheme}>
        <SafeAreaProvider
          initialMetrics={
            testing
              ? {
                  frame: {x: 0, y: 0, width: 0, height: 0},
                  insets: {top: 0, left: 0, right: 0, bottom: 0},
                }
              : undefined
          }>
          {children}
        </SafeAreaProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default AppProviders;
