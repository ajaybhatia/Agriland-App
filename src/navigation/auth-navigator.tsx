import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Login } from '@/screens';
import AddFarmScreen from '@/screens/farm/add-farm';
import OtpVerifyScreen from '@/screens/login-auth/otp-verify-screen';
import AppHeader from '@/ui/components/AppHeader';

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
        name="OtpVerifyScreen"
        component={OtpVerifyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddFarmScreen"
        component={AddFarmScreen}
        options={{
          headerShown: true,
          headerTitle: 'Create a new account',
          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props) => {
            return (
              <AppHeader
                title="Create a new account"
                iconName={'arrow-u-right-top'}
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
