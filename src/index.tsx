import 'react-native-gesture-handler';

import theme from '@config/nativebase/theme';
import client from '@config/react-query/client';
// import { APIProvider } from '@/api';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { Event } from '@notifee/react-native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import { QueryClientProvider } from '@tanstack/react-query';
import { locale } from 'expo-localization';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { I18nManager } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Toast from 'react-native-toast-message';

import { hydrateAuth, useSelectedLanguage } from '@/core';
import { RootNavigator } from '@/navigation';

hydrateAuth();
SplashScreen.preventAutoHideAsync();

const App = () => {
  const { language, setLanguage } = useSelectedLanguage();

  useEffect(() => {
    if (
      locale === 'ur-IN' ||
      locale === 'ur_IN' ||
      locale === 'ar' ||
      locale === 'ar_AA'
    ) {
      if (!I18nManager.isRTL) {
        setLanguage('ar');
      }
      I18nManager.forceRTL(true);
    } else {
      if (I18nManager.isRTL) {
        setLanguage('en');
      }
      I18nManager.forceRTL(false);
      // const getToken = async () => {
      //   // Register the device with FCM
      //   await messaging().registerDeviceForRemoteMessages();

      //   // Get the token
      //   const token = await messaging().getToken();
      //   // console.log('token ====> ', token);
      //   putToken.mutate({
      //     params: {
      //       fcmToken: token,
      //     },
      //   });
      // };

      // getToken();
      messaging().onMessage(onMessageReceived);
      //messaging().setBackgroundMessageHandler(onMessageReceived);
      addNotificationActions();
    }
  }, []);

  async function onMessageReceived(
    message: FirebaseMessagingTypes.RemoteMessage
  ) {
    // Do something
    onDisplayNotification(message);
  }

  async function onDisplayNotification(
    message: FirebaseMessagingTypes.RemoteMessage
  ) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: message?.messageId ?? '',
      name: 'AgriLand',
    });

    // Display a notification
    await notifee.displayNotification({
      id: message?.messageId ?? '',
      title: message.notification?.title ?? '',
      body: message.notification?.body ?? '',
      android: {
        channelId,
        smallIcon: 'ic_launcher_noti',
        importance: AndroidImportance.HIGH,
      },
    });
  }

  function addNotificationActions() {
    notifee.onForegroundEvent((event: Event) => {
      if (event.type === EventType.PRESS) {
        console.log(
          'User pressed an action with the id: ',
          event.detail.notification
        );
      }
    });
    notifee.onBackgroundEvent(async (event: Event) => {
      if (event.type === EventType.PRESS) {
        console.log(
          'User pressed an action with the id: ',
          event.detail.notification
        );
      }
    });
  }

  return (
    <QueryClientProvider client={client}>
      {/* config={config} */}
      <NativeBaseProvider theme={theme}>
        <BottomSheetModalProvider>
          {/* <APIProvider> */}
          <RootNavigator />
          <FlashMessage position="top" />
          {/* </APIProvider> */}
        </BottomSheetModalProvider>
      </NativeBaseProvider>
      <Toast />
    </QueryClientProvider>
  );
};

export default App;
