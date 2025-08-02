import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type ReactElement } from 'react';

import { AuthenticatedStackNavigatorParamList } from '@/types/navigation';

import SingleVideoScreen from '@/screen/player/SingleVideoScreen';
import LoginScreen from '@/screen/auth/LoginScreen';

const Stack =
  createNativeStackNavigator<AuthenticatedStackNavigatorParamList>();

export const AuthenticatedNavigator = (): ReactElement => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SingleVideo"
        component={SingleVideoScreen}
        options={{animation: 'fade', animationDuration: 500}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{animation: 'fade', animationDuration: 500}}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;
