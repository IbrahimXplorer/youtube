import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type FC } from 'react';

import {
    type BottomTabNavigatorScreenProps,
    type HomeStackParamList,
} from '@/types/navigation';
import HomeScreen from '@/screen/home/HomeScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack: FC<BottomTabNavigatorScreenProps<'HomeStack'>> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        animationDuration: 0,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
