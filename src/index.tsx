import 'react-native-gesture-handler';

import config from '@config/nativebase/config';
import theme from '@config/nativebase/theme';
import client from '@config/react-query/client';
// import { APIProvider } from '@/api';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import Toast from 'react-native-toast-message';

import { hydrateAuth } from '@/core';
import { RootNavigator } from '@/navigation';

hydrateAuth();
SplashScreen.preventAutoHideAsync();

const App = () => {
  //   useEffect(() => {
  //     if (!I18nManager.isRTL) {
  //       I18nManager.forceRTL(true);
  //     }
  //   }, []);
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
