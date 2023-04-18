import 'react-native-gesture-handler';

// import { APIProvider } from '@/api';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import FlashMessage from 'react-native-flash-message';

import { hydrateAuth } from '@/core';
import { RootNavigator } from '@/navigation';

import config from './config/nativebase/config';
import theme from './config/nativebase/theme';

hydrateAuth();
SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <NativeBaseProvider theme={theme} config={config}>
      <BottomSheetModalProvider>
        {/* <APIProvider> */}
        <RootNavigator />
        <FlashMessage position="top" />
        {/* </APIProvider> */}
      </BottomSheetModalProvider>
    </NativeBaseProvider>
  );
};

export default App;
