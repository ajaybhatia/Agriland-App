import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import AppSplashScreen from '@/screens/login-auth/app-splash-screen';

import { AuthNavigator } from './auth-navigator';
import { NavigationContainer } from './navigation-container';
import { TabNavigator } from './tab-navigator';

const Stack = createNativeStackNavigator();

export const Root = () => {
  const hideSplash = React.useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    hideSplash();
  }, [hideSplash]);

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
        <Stack.Screen name="Auth" component={AuthNavigator} />
        {/* {(isFarmAdded.data?.isFarmAdded ?? false) && currentUser ? (
          <Stack.Screen name="App" component={TabNavigator} />
        ) : isFarmAdded.isLoading ? (
          <Stack.Screen name="AppSplashScreen" component={AppSplashScreen} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )} */}
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
