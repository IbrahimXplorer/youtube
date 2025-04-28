import { ThemeProvider } from '@shopify/restyle';
import React, { type ReactElement } from 'react';

import theme from '@/theme';

import 'react-native-gesture-handler';
import { Text } from './components';

export const App = (): ReactElement => {
  return (
      <ThemeProvider theme={theme} >
        <Text>Shadow Ui</Text>
      </ThemeProvider>
  );
};

export default App;
