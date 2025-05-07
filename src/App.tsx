import React, {type ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import theme from '@/theme';
import 'react-native-gesture-handler';
import HomeScreen from './screen/HomeScreen';

export type RootNavigatorParamList = {
  Home: undefined;
};

interface AppProps {}

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const App = (_props: AppProps): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
