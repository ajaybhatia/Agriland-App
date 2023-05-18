import auth from '@react-native-firebase/auth';
import type {
  DrawerContentComponentProps,
  DrawerHeaderProps,
} from '@react-navigation/drawer';
import {
  createDrawerNavigator,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { CommonActions, useNavigation } from '@react-navigation/native';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Pressable,
  SectionList,
  Text,
  View,
  VStack,
} from 'native-base';
import * as React from 'react';
import { Alert, Animated, StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AccountDetailScreen from '@/screens/account/account-detail-screen';
import AddFarmHomeScreen from '@/screens/farm/add-farm-homescreen';
import FarmDetailScreen from '@/screens/farm/farm-detail-screen';
import HomeScreen from '@/screens/home/home-screen';
import NotificationsDetails from '@/screens/notifications-screens/notifications-details';
import TaskDetailScreen from '@/screens/tasks/tasks-detail-screen';
import WeatherChangesScreen from '@/screens/weather/weather-changes-screen';
import WeatherDetailScreen from '@/screens/weather/weather-detail-screen';
import WeatherSingleDetail from '@/screens/weather/weather-single-detail';
import AppHeader from '@/ui/components/AppHeader';
import DrawerOptions from '@/ui/components/DrawerOptions';
import colors from '@/ui/theme/colors';

import type { AuthStackParamList } from './types';

const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};

// MyDrawer
export interface DrawerOptionObj {
  title: string;
  data: DrawerSubOptionObj[];
}
export type DrawerSubOptionObj = {
  navigation: string;
  label: string;
  icon?: number;
  as?: unknown;
};

function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {
  const options: DrawerOptionObj[] = [
    {
      title: 'Account Management',
      data: [
        {
          label: 'Account Details',
          as: MaterialIcons,
          navigation: 'MyFarmsTab',
          icon: require('@assets/app-logo.png'),
        },
        {
          label: 'Company Data',
          as: MaterialIcons,
          navigation: 'MyFarmsTab',
          icon: require('@assets/app-logo.png'),
        },
        {
          label: 'Documents',
          as: MaterialIcons,
          navigation: 'MyFarmsTab',
          icon: require('@assets/app-logo.png'),
        },
      ],
    },
    {
      title: 'Payment and billing',
      data: [
        {
          label: 'Payment and billing',
          as: MaterialIcons,
          navigation: 'MyFarmsTab',
          icon: require('@assets/app-logo.png'),
        },
        {
          label: 'Purchases',
          as: MaterialIcons,
          navigation: 'MyFarmsTab',
          icon: require('@assets/app-logo.png'),
        },
        {
          label: 'Coding request',
          as: MaterialIcons,
          navigation: 'MyFarmsTab',
          icon: require('@assets/app-logo.png'),
        },
        {
          label: 'Test',
          as: MaterialIcons,
          navigation: 'MyFarmsTab',
          icon: require('@assets/app-logo.png'),
        },
        {
          label: 'Station reservation',
          as: MaterialIcons,
          navigation: 'MyFarmsTab',
          icon: require('@assets/app-logo.png'),
        },
        {
          label: 'Subscriptions',
          as: MaterialIcons,
          navigation: 'MyFarmsTab',
          icon: require('@assets/app-logo.png'),
        },
      ],
    },
    {
      title: '',
      data: [
        {
          label: 'Setting',
          as: MaterialIcons,
          navigation: 'MyFarmsTab',
          icon: require('@assets/app-logo.png'),
        },
        {
          label: 'Sign Out',
          as: MaterialIcons,
          navigation: 'SignOut',
          icon: require('@assets/app-logo.png'),
        },
      ],
    },
  ];

  const isDrawerOpen = useDrawerStatus() === 'open';

  return (
    <SafeAreaView style={[styles.container]}>
      <VStack flex={1}>
        <HStack width={'100%'} alignItems={'center'} mt={10}>
          <Box
            alignSelf={'center'}
            borderRadius={40}
            overflow={'hidden'}
            ml={2}
          >
            <Image
              alt=""
              resizeMode="contain"
              style={styles.userImg}
              source={require('@assets/app-logo.png')}
            />
          </Box>
          <VStack>
            <Text fontWeight="700" fontSize={16}>
              Username
            </Text>
          </VStack>
        </HStack>
        <SectionList
          sections={options}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({
            item,
            index,
          }: {
            item: DrawerSubOptionObj;
            index: number;
          }) => (
            <DrawerOptions
              index={index}
              item={item}
              onPress={(item2: DrawerSubOptionObj) => {
                if (item2.navigation === 'SignOut') {
                  Alert.alert('Warning', 'Are you sure, you want to logout?', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'LogOut',
                      onPress: async () => {
                        navigation.closeDrawer();
                        await auth().signOut();
                        navigation.dispatch(
                          CommonActions.reset({
                            index: 1,
                            routes: [{ name: 'Auth' }],
                          })
                        );
                      },
                    },
                  ]);
                } else {
                  navigation.closeDrawer();
                  navigation.navigate(item2.navigation);
                }
              }}
            />
          )}
          renderSectionHeader={({ section: { title } }) => {
            return (
              <VStack>
                {title !== 'Account Management' && (
                  <View
                    mt={title !== '' ? 3 : 2}
                    mb={title !== '' ? 5 : 0}
                    borderTopColor={'rgba(0,0,0,0.4)'}
                    borderTopWidth={1}
                  />
                )}
                <Text
                  fontSize={17}
                  mx={5}
                  fontStyle={'normal'}
                  fontWeight={'700'}
                >
                  {title}
                </Text>
              </VStack>
            );
          }}
        />
        <Pressable
          onPress={() => {
            if (isDrawerOpen) {
              navigation.closeDrawer();
            } else {
              navigation.openDrawer();
            }
          }}
          position={'absolute'}
          top={5}
          right={5}
        >
          <Icon as={MaterialIcons} name={'clear'} size={'lg'} color={'black'} />
        </Pressable>
      </VStack>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator<AuthStackParamList>();

// Tabs

const _renderIcon = (routeName: string, selectedTab: string) => {
  let icon = require('@assets/bottom-bar/home.png');
  let title = '';

  switch (routeName) {
    case 'title1':
      icon = require('@assets/bottom-bar/home.png');
      title = 'HOME';
      break;
    case 'title2':
      icon = require('@assets/bottom-bar/dashboard.png');
      title = 'DASHBOARD';
      break;
    case 'title4':
      icon = require('@assets/bottom-bar/crops.png');
      title = 'CROPS';
      break;
    case 'title5':
      icon = require('@assets/bottom-bar/farms.png');
      title = 'FARMS';
      break;
  }

  return (
    <VStack alignItems={'center'}>
      {/* <Icon
        as={MaterialCommunityIcons}
        name={'plus-circle'}
        size={'lg'}
        color={routeName !== selectedTab ? 'black' : 'rgba(256,45,45,1)'}
      /> */}
      <Image h={5} w={5} alt="" resizeMode="contain" source={icon} />
      <Text
        fontSize={11}
        mt={2}
        numberOfLines={1}
        color={routeName !== selectedTab ? '#36cad0' : '#36cad0'}
        fontFamily={'body'}
        fontWeight={routeName !== selectedTab ? '400' : '600'}
        fontStyle={'normal'}
      >
        {title}
      </Text>
    </VStack>
  );
};
const renderTabBar = ({ routeName, selectedTab, navigate }) => {
  return (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={styles.tabbarItem}
    >
      {_renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );
};

const RootStack = createNativeStackNavigator<AuthStackParamList>();

function HomeRootStackView() {
  const nav = useNavigation();
  const onBackPress = () => {
    nav.goBack();
  };
  return (
    <RootStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false, animation: 'none' }}
    >
      <RootStack.Screen
        options={{
          headerShown: true,
          title: 'AgriLand',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props: NativeStackHeaderProps) => (
            <AppHeader
              //onBackPress={onBackPress}
              title={props?.options?.title ?? ''}
              iconName={'sort'}
              as={MaterialIcons}
            />
          ),
          overlayColor: 'rgba(0,0,0,0)',
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        name="HomeScreen"
        component={HomeScreen}
      />

      <RootStack.Screen
        options={{
          headerShown: true,
          title: 'Account Details',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props: NativeStackHeaderProps) => (
            <AppHeader
              onBackPress={onBackPress}
              title={props?.options?.title ?? ''}
              iconName={'arrow-u-right-top'}
            />
          ),
          overlayColor: 'rgba(0,0,0,0)',
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        name="AccountDetailScreen"
        component={AccountDetailScreen}
      />
      <RootStack.Screen
        options={{
          headerShown: true,
          title: 'Farm Details',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props: NativeStackHeaderProps) => (
            <AppHeader
              onBackPress={onBackPress}
              title={props?.options?.title ?? ''}
              iconName={'arrow-u-right-top'}
            />
          ),
          overlayColor: 'rgba(0,0,0,0)',
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        name="FarmDetailScreen"
        component={FarmDetailScreen}
      />
      <RootStack.Screen
        options={{
          headerShown: false,
          title: 'Weather Details',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props: NativeStackHeaderProps) => (
            <AppHeader
              onBackPress={onBackPress}
              title={props?.options?.title ?? ''}
              iconName={'arrow-u-right-top'}
            />
          ),
          overlayColor: 'rgba(0,0,0,0)',
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        name="WeatherDetailScreen"
        component={WeatherDetailScreen}
      />
      <RootStack.Screen
        options={{
          headerShown: true,
          title: 'Notifications',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props: NativeStackHeaderProps) => (
            <AppHeader
              onBackPress={onBackPress}
              title={props?.options?.title ?? ''}
              iconName={'arrow-u-right-top'}
            />
          ),
          overlayColor: 'rgba(0,0,0,0)',
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        name="NotificationsDetails"
        component={NotificationsDetails}
      />
      <RootStack.Screen
        options={{
          headerShown: true,
          title: 'Harvesting',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props: NativeStackHeaderProps) => (
            <AppHeader
              onBackPress={onBackPress}
              title={props?.options?.title ?? ''}
              iconName={'arrow-u-right-top'}
            />
          ),
          overlayColor: 'rgba(0,0,0,0)',
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        name="TaskDetailScreen"
        component={TaskDetailScreen}
      />
      <RootStack.Screen
        options={{
          headerShown: true,
          title: 'Atmmospheric Pressure',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props: NativeStackHeaderProps) => (
            <AppHeader
              onBackPress={onBackPress}
              title={props?.options?.title ?? ''}
              iconName={'arrow-u-right-top'}
            />
          ),
          overlayColor: 'rgba(0,0,0,0)',
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        name="WeatherSingleDetail"
        component={WeatherSingleDetail}
      />
      <RootStack.Screen
        options={{
          headerShown: true,
          title: 'Weather Changes',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props: NativeStackHeaderProps) => (
            <AppHeader
              onBackPress={onBackPress}
              title={props?.options?.title ?? ''}
              iconName={'arrow-u-right-top'}
            />
          ),
          overlayColor: 'rgba(0,0,0,0)',
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        name="WeatherChangesScreen"
        component={WeatherChangesScreen}
      />
      <RootStack.Screen
        options={{
          headerShown: true,
          title: 'Add Farm',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props: NativeStackHeaderProps) => (
            <AppHeader
              onBackPress={onBackPress}
              title={props?.options?.title ?? ''}
              iconName={'arrow-u-right-top'}
            />
          ),
          overlayColor: 'rgba(0,0,0,0)',
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        name="AddFarmHomeScreen"
        component={AddFarmHomeScreen}
      />
    </RootStack.Navigator>
  );
}

const DrawerMainRender = () => {
  return (
    <Drawer.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
      // screenOptions={{
      //   drawerType: '',
      // }}
    >
      <Drawer.Screen
        options={{
          headerShown: true,
          title: 'Hello, Harminder',
          headerTitle: 'Hello, Harminder',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          header: (props: DrawerHeaderProps) => (
            <AppBarHeader {...props} left={false} />
          ),
          overlayColor: 'rgba(0,0,0,0)',
          drawerStyle: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
};
type HeaderType = {
  left?: boolean;
};

const AppBarHeader = ({
  navigation,
  left = false,
  options,
}: DrawerHeaderProps & HeaderType) => {
  const isDrawerOpen = useDrawerStatus() === 'open';

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.headerSubContainer}>
        <HStack
          my={Platform.OS === 'ios' ? 1 : 2}
          mx={5}
          justifyContent={left ? 'flex-start' : 'space-between'}
          alignItems="center"
        >
          <HStack alignItems="center">
            <IconButton
              ml={-1}
              onPress={() => {
                if (isDrawerOpen) {
                  //navigationRef?.current?.setVisible(true);
                  navigation.closeDrawer();
                } else {
                  // navigationRef?.current?.setVisible(false);
                  navigation.openDrawer();
                }
              }}
              icon={
                <Icon
                  as={MaterialIcons}
                  name={'sort'}
                  size={29}
                  color={'#000'}
                />
              }
            />
          </HStack>
          <Text fontWeight="700" fontSize={16}>
            {options?.title ?? 'Hello'}
          </Text>
          {/* <HStack>
            <View borderRadius={30 / 2} overflow={'hidden'} w={35} h={35}>
              <Image
                alt=""
                // resizeMode="cover"
                style={styles.userHeaderImg}
                source={AllImages.DEFAULT_IMAGE}
              />
            </View>
          </HStack> */}
        </HStack>
      </View>
    </SafeAreaView>
  );
};

export const TabNavigator = () => {
  const nav = useNavigation();
  const onBackPress = () => {
    nav.goBack();
  };

  return (
    <CurvedBottomBar.Navigator
      type="UP"
      style={styles.bottombar}
      shadowStyle={styles.shawdow}
      height={80}
      circleWidth={60}
      bgColor="white"
      initialRouteName="title1"
      borderTopLeftRight
      screenOptions={{
        headerShown: false,
      }}
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('title3')}
          >
            <Icon
              as={MaterialCommunityIcons}
              name={'plus'}
              size={'2xl'}
              color={'white'}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen
        name="title1"
        position="LEFT"
        component={HomeRootStackView}
      />
      <CurvedBottomBar.Screen
        name="title2"
        position="LEFT"
        component={() => <Screen2 />}
      />
      <CurvedBottomBar.Screen
        name="title4"
        component={() => <Screen1 />}
        position="RIGHT"
      />
      <CurvedBottomBar.Screen
        name="title5"
        component={() => <Screen2 />}
        position="RIGHT"
      />
      <CurvedBottomBar.Screen
        name="title3"
        component={() => <Screen1 />}
        position="CENTER"
      />
    </CurvedBottomBar.Navigator>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  shawdow: {
    borderColor: 'rgba(256,256,256,0)',
    borderWidth: 0,
    //backgroundColor: 'rgba(256,256,256,1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottombar: {},
  btnCircleUp: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    bottom: 20,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
  flatList: { flex: 1 },
  contentList: {
    paddingTop: 30,
  },
  userImg: { width: 65, height: 65 },
  headerSubContainer: {
    backgroundColor: colors.BACKGROUND_COLOR,
  },
  headerContainer: {
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND_COLOR,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
