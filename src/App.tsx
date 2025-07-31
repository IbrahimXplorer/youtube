import {ThemeProvider} from '@shopify/restyle';
import React, {type ReactElement} from 'react';

import theme from '@/theme';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './navigators';
import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';

export type RootNavigatorParamList = {
  Home: undefined;
};

interface AppProps {}

const App = (_props: AppProps): ReactElement => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
