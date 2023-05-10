import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Login } from '@/screens';
import AddFarmScreen from '@/screens/login-auth/add-farm';
import OtpVerifyScreen from '@/screens/login-auth/otp-verify-screen';
import AppHeader from '@/ui/components/AppHeader';

export enum LoginType {
  FACEBOOK,
  GOOGLE,
  OTP,
}

export type AuthStackParamList = {
  Login: undefined;
  OtpVerifyScreen: {
    phoneNumber: string;
    confirmation: FirebaseAuthTypes.ConfirmationResult;
  };
  AddFarmScreen: {
    loginType: LoginType;
    google?: FirebaseAuthTypes.User | undefined;
    phoneNumber?: string | undefined;
  };
  BottomTabs: undefined;
  AccountDetailScreen: undefined;
  FarmDetailScreen: undefined;
  WeatherDetailScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  function onBackPress() {
    navigation.goBack();
  }
  return (
    <Stack.Navigator initialRouteName="Login">
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
          // eslint-disable-next-line react/no-unstable-nested-components
          header: () => {
            return (
              <AppHeader
                onBackPress={onBackPress}
                title={'Test'}
                // iconName={'arrow-u-right-top'}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="AddFarmScreen"
        component={AddFarmScreen}
        options={{
          headerShown: true,
          // eslint-disable-next-line react/no-unstable-nested-components
          header: ({ options }) => {
            return (
              <AppHeader
                title={options?.title ?? 'Test'}
                // iconName={'arrow-u-right-top'}
                //  onBackPress={onBackPress}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};
