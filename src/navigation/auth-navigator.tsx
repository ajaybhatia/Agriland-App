import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

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
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  const navigation = useNavigation();
  function onBackPress() {
    navigation.goBack();
  }
  return (
    <Stack.Navigator>
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
          headerShown: true,
          // eslint-disable-next-line react/no-unstable-nested-components
          header: () => {
            return (
              <AppHeader
                onBackPress={onBackPress}
                title="Verify OTP"
                iconName={'arrow-u-right-top'}
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
          headerTitle: 'Create a new account',
          // eslint-disable-next-line react/no-unstable-nested-components
          header: () => {
            return (
              <AppHeader
                title="Create a new account"
                iconName={'arrow-u-right-top'}
                onBackPress={onBackPress}
              />
            );
          },
          // headerLeft: () => {
          //   return (
          //     <Button
          //       variant="unstyled"
          //       overflow={'hidden'}
          //       borderRadius={'lg'}
          //       _text={{
          //         textTransform: 'none',
          //       }}
          //       startIcon={
          //         <Icon
          //           as={MaterialCommunityIcons}
          //           name="arrow-u-right-top"
          //           size="lg"
          //           color={'green.800'}
          //         />
          //       }
          //     >
          //       {''}
          //     </Button>
          //   );
          // },
        }}
      />
    </Stack.Navigator>
  );
};
