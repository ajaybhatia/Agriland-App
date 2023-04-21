import 'react-native-gesture-handler';

import config from '@config/nativebase/config';
import theme from '@config/nativebase/theme';
import client from '@config/react-query/client';
// import { APIProvider } from '@/api';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import { locale } from 'expo-localization';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { I18nManager, NativeModules } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Toast from 'react-native-toast-message';

import { getLanguage, hydrateAuth, isRTL, useSelectedLanguage } from '@/core';
import { RootNavigator } from '@/navigation';

hydrateAuth();
SplashScreen.preventAutoHideAsync();

const App = () => {
  const { language, setLanguage } = useSelectedLanguage();
  useEffect(() => {
    console.log(
      'Current Language==> ',
      getLanguage(),
      ' === ',
      locale,
      ' === ',
      NativeModules.I18nManager.localeIdentifier,
      '  ==== ',
      isRTL
    );

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
    }
  }, []);
  return (
    <QueryClientProvider client={client}>
      <NativeBaseProvider theme={theme} config={config}>
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
