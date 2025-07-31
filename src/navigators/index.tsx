import React, {type ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  type NavigationProps,
  type RootNavigatorParamList,
} from '@/types/navigation';

import UnAuthenticatedNavigator from '@/navigators/UnAuthenticatedNavigator';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const Navigator = (props: NavigationProps): ReactElement => {
  return (
    <NavigationContainer {...props}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="UnAuthenticatedStack"
          component={UnAuthenticatedNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
