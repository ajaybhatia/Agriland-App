import { useNavigation } from '@react-navigation/native';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { Login } from '@/screens';
import AddFarmScreen from '@/screens/login-auth/add-farm';
import AppSplashScreen from '@/screens/login-auth/app-splash-screen';
import OtpVerifyScreen from '@/screens/login-auth/otp-verify-screen';
import AppHeader from '@/ui/components/AppHeader';

import { NavigationContainer } from './navigation-container';
import { TabNavigator } from './tab-navigator';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const Root = () => {
  const hideSplash = React.useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    hideSplash();
  }, [hideSplash]);
  const navigation = useNavigation();
  function onBackPress() {
    navigation.goBack();
  }
  const headerComponent = React.useCallback(
    (props: NativeStackHeaderProps) => (
      <AppHeader
        title={props?.options?.title ?? 'Test'}
        // iconName={'arrow-u-right-top'}
        //  onBackPress={onBackPress}
      />
    ),
    []
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
      }}
      initialRouteName="AppSplashScreen"
    >
      {/* {isFirstTime ? (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      ) : ( */}
      <Stack.Group>
        <Stack.Screen name="App" component={TabNavigator} />
        <Stack.Screen name="AppSplashScreen" component={AppSplashScreen} />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OtpVerifyScreen"
          component={OtpVerifyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddFarmScreen"
          component={AddFarmScreen}
          options={{
            headerShown: true,
            header: headerComponent,
          }}
        />
      </Stack.Group>
      {/* )} */}
    </Stack.Navigator>
  );
};

export const RootNavigator = () => (
  <NavigationContainer>
    <Root />
  </NavigationContainer>
);
