import { View } from 'native-base';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function AppLoader() {
  return (
    <View
      position={'absolute'}
      left={0}
      right={0}
      top={0}
      bottom={0}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'rgba(0,0,0,0.1)'}
    >
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}
