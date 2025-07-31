import { ThemeProvider } from '@shopify/restyle';
import React, { type ReactElement } from 'react';

import theme from '@/theme';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './navigators';

export type RootNavigatorParamList = {
  Home: undefined;
};

interface AppProps {}

const App = (_props: AppProps): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
