import { CommonActions, useNavigation } from '@react-navigation/native';
import { Image as ImageBase, View } from 'native-base';
import React from 'react';

import { useGetApiFarmIsFarmAdded } from '@/apis/endpoints/api';
import type { FarmExists } from '@/apis/model';

const AppSplashScreen = () => {
  const navigation = useNavigation();
  const getFarmAdded = useGetApiFarmIsFarmAdded({
    query: {
      onSuccess: (data: FarmExists) => {
        if (data.isFarmAdded) {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'App' }],
            })
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'Auth' }],
            })
          );
        }
      },
      onError: () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'Auth' }],
          })
        );
      },
    },
  });
  return (
    <View
      flex={1}
      bgColor={'#023c69'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <ImageBase
        alt=""
        height={'100%'}
        width={'100%'}
        resizeMode={'cover'}
        alignSelf={'center'}
        source={require('./../../../assets/splash2.png')}
      />
    </View>
  );
};

export default AppSplashScreen;
