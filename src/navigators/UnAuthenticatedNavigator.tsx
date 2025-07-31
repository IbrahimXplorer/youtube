import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {type ReactElement} from 'react';

import {type UnAuthenticatedStackNavigatorParamList} from '@/types/navigation';

import BottomTabNavigator from './BottomTabNavigator';

const Stack =
  createNativeStackNavigator<UnAuthenticatedStackNavigatorParamList>();

export const UnAuthenticatedNavigator = (): ReactElement => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{animation: 'fade', animationDuration: 500}}
      />
    </Stack.Navigator>
  );
};

export default UnAuthenticatedNavigator;
