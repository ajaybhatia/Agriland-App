import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { FlatList, View } from 'native-base';
import React, { useCallback } from 'react';

import { useAuth } from '@/core';

import type { OperationItem } from './components/operation-item-cell';
import OperationItemCell from './components/operation-item-cell';

const AddOperationScreen = () => {
  const array: OperationItem[] = [
    {
      title: 'Services',
      btn1: 'Crop Registration',
      btn1Icon: 'crop-landscape',
      btn2: 'Station Booking',
      btn2Icon: 'directions-railway',
      btn3: 'Tests',
      btn3Icon: 'confirmation-num',
    },
    {
      title: 'Agricultural Market',
      btn1: 'Crop Marketing',
      btn2: 'Production Supplies',
      btn3: 'Crop Loan',
      btn1Icon: 'surround-sound',
      btn2Icon: 'sim-card',
      btn3Icon: 'money',
    },
    {
      title: 'Information Center',
      btn1: 'Weather Changes',
      btn2: 'Satellite Data',
      btn3: 'Social Media',
      btn1Icon: 'cloud',
      btn2Icon: 'satellite',
      btn3Icon: 'perm-media',
    },
  ];
  const nav = useNavigation();
  const userInfo = useAuth.use.userInfos();

  const cropRegister = useCallback(
    () => nav.navigate('CropRegistration'),
    [nav]
  );
  const onStationBooking = useCallback(
    () => nav.navigate('StationBookingScreen'),
    [nav]
  );
  const onCropTest = useCallback(() => nav.navigate('TestScreen'), [nav]);
  const onWeatherPress = useCallback(
    () => nav.navigate('WeatherDetailScreen'),
    [nav]
  );
  const onSatelLite = useCallback(() => {
    if (userInfo) {
      if (userInfo?.farmerPlans?.endDate) {
        if (dayjs().isBefore(dayjs(userInfo.farmerPlans?.endDate))) {
          nav.navigate('SatelliteSelectedCropsList');
          //  nav.navigate('SateLiteDemoScreen');
        } else {
          nav.navigate('SateLiteDemoScreen');
        }
      } else {
        nav.navigate('SateLiteDemoScreen');
      }
    }
  }, [nav, userInfo]);

  const onSocialMedia = useCallback(
    () => nav.navigate('CropRegistration'),
    [nav]
  );

  return (
    <View flex={1} backgroundColor={'white'}>
      <FlatList
        data={array}
        keyExtractor={(item, index) => `${index}`}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({
          item,
          index,
        }: {
          item: OperationItem;
          index: number;
        }) => {
          if (index === 0) {
            return (
              <OperationItemCell
                btns={item}
                onFirstOption={cropRegister}
                onSecondOption={onStationBooking}
                onThirdOption={onCropTest}
              />
            );
          } else if (index === 1) {
            return <OperationItemCell btns={item} />;
          }

          return (
            <OperationItemCell
              btns={item}
              onFirstOption={onWeatherPress}
              onSecondOption={onSatelLite}
              onThirdOption={onSocialMedia}
            />
          );
        }}
      />
    </View>
  );
};

export default AddOperationScreen;
