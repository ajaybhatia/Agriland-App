import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Login } from '@/screens';
import AddFarmScreen from '@/screens/farm/add-farm';
import OtpVerifyScreen from '@/screens/login-auth/otp-verify-screen';

export type AuthStackParamList = {
  Login: undefined;
  OtpVerifyScreen: {
    phoneNumber: string;
    confirmation: FirebaseAuthTypes.ConfirmationResult;
  };
  AddFarmScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddFarmScreen"
        component={AddFarmScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="OtpVerifyScreen"
        component={OtpVerifyScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
