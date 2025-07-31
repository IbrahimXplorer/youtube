import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type FC } from 'react';

import AccountScreen from '@/screen/account/AccountScreen';
import {
    AccountStackParamList,
    type BottomTabNavigatorScreenProps,
} from '@/types/navigation';

const Stack = createNativeStackNavigator<AccountStackParamList>();

export const AccountStack: FC<BottomTabNavigatorScreenProps<'AccountStack'>> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        animationDuration: 0,
      }}>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
