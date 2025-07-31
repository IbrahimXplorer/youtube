import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type FC } from 'react';

import VideoScreen from '@/screen/video/VideoScreen';
import {
    VideoStackParamList,
    type BottomTabNavigatorScreenProps,
} from '@/types/navigation';

const Stack = createNativeStackNavigator<VideoStackParamList>();

export const VideoStack: FC<BottomTabNavigatorScreenProps<'VideoStack'>> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        animationDuration: 0,
      }}>
      <Stack.Screen
        name="Video"
        component={VideoScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
