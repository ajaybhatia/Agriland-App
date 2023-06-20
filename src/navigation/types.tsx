import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { RouteProp as NRouteProp } from '@react-navigation/native';

import type { MobileAppUserBasicDetails } from '@/apis/model';

export type RootStackParamList = AuthStackParamList; //  & FooStackParamList & BarStackParamList
// very important to type check useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<
  RootStackParamList,
  T
>;

export enum LoginType {
  FACEBOOK,
  GOOGLE,
  OTP,
}

export type AuthStackParamList = {
  Login: undefined;
  HomeScreen: undefined;
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
  AccountDetailScreen: {
    userInfo?: MobileAppUserBasicDetails;
  };
  FarmDetailScreen: undefined;
  WeatherDetailScreen: undefined;
  NotificationsDetails: undefined;
  TaskDetailScreen: undefined;
  WeatherSingleDetail: {
    title: string;
  };
  WeatherChangesScreen: undefined;
  AddFarmHomeScreen: undefined;
  Drawer: undefined;
  AppSplashScreen: undefined;
  App: undefined;
  DashboardScreen: undefined;
  bottomTab: undefined;
  AddOperationScreen: undefined;
  CropRegistration: undefined;
  CropRegisterDetails: undefined;
  CropCodingScreen: undefined;
  StationBookingScreen: undefined;
  STationBookedScreen: undefined;
  TestScreen: undefined;
  MakeAppointmentScreen: {
    title: string;
  };
  MyCropsScreen: undefined;
  TaskCalenderDetailScreen: undefined;
  CropDetailScreen: undefined;
  SateLiteDemoScreen: undefined;
  SubscriptionBundleScreen: undefined;
  SateliteDetailSubscriptionScreen: undefined;
  ChooseSateliteFarmScreen: undefined;
  SateliteDemoMapScreen: undefined;
  SateliteMapScreen: undefined;
  TokenFirebaseScreen: undefined;
};
