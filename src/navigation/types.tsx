import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { RouteProp as NRouteProp } from '@react-navigation/native';

import type {
  FarmerCropCalendarActivity,
  MobileAppUserBasicDetails,
} from '@/apis/model';
import type { CardPayment } from '@/screens/payments/add-card-payment';

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

export enum AddSubscriptionMoreCrop {
  BACK,
  UNKNOWN,
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
  TaskDetailScreen: {
    detail: FarmerCropCalendarActivity;
  };
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
  TaskCalenderDetailScreen: {
    farmId: string;
  };
  CropDetailScreen: undefined;
  SateLiteDemoScreen: undefined;
  SubscriptionBundleScreen: undefined;
  SateliteDetailSubscriptionScreen: {
    amount: number;
    planid: string;
    packageType: string;
  };
  ChooseSateliteFarmScreen: {
    screenFrom: AddSubscriptionMoreCrop;
  };
  SateliteDemoMapScreen: undefined;
  SateliteMapScreen: {
    fieldId: string;
  };
  TokenFirebaseScreen: undefined;
  AddCardPayment: {
    card?: CardPayment;
    onAddCard: (card: CardPayment) => void;
  };
  SatelliteChooseCropByFarm: {
    farmId: string;
    farmName: string;
  };
  SatelliteSelectedCropsList: undefined;
};
