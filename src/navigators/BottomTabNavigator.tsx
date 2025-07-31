/* eslint-disable react/no-unstable-nested-components */
import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {type RouteProp} from '@react-navigation/native';
import React, {type FC, type ReactElement} from 'react';
import {type TextStyle, type ViewStyle} from 'react-native';

import {Icon} from '@/components';
import theme from '@/theme';
import {
  type BottomTabNavigatorParamList,
  UnAuthenticatedStackNavigatorScreenProps,
} from '@/types/navigation';
import {AccountStack} from './stack/AccountStack';
import {HomeStack} from './stack/HomeStack';
import {VideoStack} from './stack/VideoStack';
import {detectDevice} from '@/utils';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

interface BottomTabNavigatorProps
  extends UnAuthenticatedStackNavigatorScreenProps<'Root'> {}

type routesStackType = 'AccountStack' | 'HomeStack' | 'VideoStack';

export const BottomTabNavigator: FC<
  BottomTabNavigatorProps
> = (): ReactElement => {
  const renderIcon = (title: routesStackType): string => {
    switch (title) {
      case 'AccountStack':
        return 'user';
      case 'VideoStack':
        return 'video';
      default:
        return 'home';
    }
  };

  const BottomTabIcon = ({
    title,
    focused,
  }: {
    title: string;
    focused: boolean;
    color: string;
    size: number;
  }): ReactElement => {
    return (
      <Icon
        variant="vector"
        icon={renderIcon(title as routesStackType)}
        type="feather"
        color={focused ? 'primary' : 'black200'}
      />
    );
  };

  const screenOptions = ({
    route,
  }: {
    route: RouteProp<
      BottomTabNavigatorParamList,
      keyof BottomTabNavigatorParamList
    >;
  }): BottomTabNavigationOptions => ({
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.black200,
    tabBarShowLabel: true,
    headerShadowVisible: false,
    tabBarStyle: [$tabBar],
    tabBarLabelStyle: $tabBarLabel,
    tabBarIcon: props => <BottomTabIcon {...props} title={route.name} />,
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="VideoStack"
        component={VideoStack}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          title: 'Home',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const $tabBar: ViewStyle = {
  height: detectDevice?.isIOS ? theme.spacing[22] : theme.spacing[20],
};

const {b5semiBold} = theme.textVariants;

const $tabBarLabel: TextStyle = {
  fontFamily: b5semiBold.fontFamily,
  fontSize: b5semiBold.fontSize,
};
