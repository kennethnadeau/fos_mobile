import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider, Theme, colors} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import createStore from '@fos/redux/store';
import {Colors} from '@fos/themes';
import {s, ms} from 'react-native-size-matters';

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
  Input: {
    placeholderTextColor: Colors.muted,
    inputStyle: {
      color: Colors.white,
      padding: ms(6),
      alignItems: 'center',
    },
    inputContainerStyle: {
      borderColor: Colors.white,
      alignItems: 'center',
      borderBottomWidth: s(0.7),
      borderWidth: s(0.7),
      borderRadius: s(30),
      overflow: 'hidden',
      padding: ms(6),
    },
  },
  Text: {
    style: {
      fontSize: s(16),
      color: 'white',
    },
  },
  Icon: {
    color: colors.primary,
  },
};

export const NavigationComponentProviders: FC<{
  children: React.ReactElement<any>;
}> = ({children}) => (
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
  </Provider>
);

const AppProviders: FC<{
  children: React.ReactElement<any>;
  testing?: boolean;
}> = ({children, testing = false}) => (
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
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
    </Provider>
  </PersistGate>
);

export default AppProviders;
