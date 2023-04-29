import 'react-native-gesture-handler';

import theme from '@config/nativebase/theme';
import client from '@config/react-query/client';
// import { APIProvider } from '@/api';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
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
  // const [fontsLoaded] = useFonts({
  //   'Poppins-Black': require('@assets/fonts/Poppins-Black.ttf'),
  //   'Poppins-Bold': require('@assets/fonts/Poppins-Bold.ttf'),
  //   'Poppins-ExtraBold': require('@assets/fonts/Poppins-ExtraBold.ttf'),
  //   'Poppins-ExtraLight': require('@assets/fonts/Poppins-ExtraLight.ttf'),
  //   'Poppins-Light': require('@assets/fonts/Poppins-Light.ttf'),
  //   'Poppins-Medium': require('@assets/fonts/Poppins-Medium.ttf'),
  //   'Poppins-Regular': require('@assets/fonts/Poppins-Regular.ttf'),
  //   'Poppins-SemiBold': require('@assets/fonts/Poppins-SemiBold.ttf'),
  //   'Poppins-Thin': require('@assets/fonts/Poppins-Thin.ttf'),
  // });
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
    }
  }, []);
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
