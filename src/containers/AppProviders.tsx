import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider, Theme, colors} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import createStore from '@fos/redux/store';
import {Colors} from '@fos/themes';

const {store, persistor} = createStore();

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

const AppProviders: FC<{children: React.ReactElement<any>}> = ({children}) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={defaultTheme}>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default AppProviders;
