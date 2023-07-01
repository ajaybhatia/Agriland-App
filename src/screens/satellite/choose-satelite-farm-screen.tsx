import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, I18nManager } from 'react-native';
import Toast from 'react-native-toast-message';

import { usePostApiFarmerAppCreatefarmonautcrops } from '@/apis/endpoints/api';
import type { FarmResponse } from '@/apis/model';
import client from '@/config/react-query/client';
import { useAuth } from '@/core';
import { clearFarmData, useSatelliteFarm } from '@/core/satellite-farm';
import {
  AddSubscriptionMoreCrop,
  type AuthStackParamList,
} from '@/navigation/types';
import AppLoader from '@/ui/components/AppLoader';
import colors from '@/ui/theme/colors';

import FarmerListVerticalCell from '../home/components/farmer-list-vertical-cell';
import SatelliteSelectedCrops from './components/satellite-selected-crops';

type Props = {};

const ChooseSateliteFarmScreen = (props: Props) => {
  const route =
    useRoute<RouteProp<AuthStackParamList, 'ChooseSateliteFarmScreen'>>();
  const addCropsInmembership = usePostApiFarmerAppCreatefarmonautcrops();
  const cropsSelected = useSatelliteFarm.use.satelliteSelectedCrops();
  const userInfoo = useAuth.use.userInfos();
  const [isLoading, setLoading] = useState<boolean>(true);
  const nav = useNavigation();
  const onSelectFarm = useCallback(
    (item: FarmResponse) => {
      //  setSelectedFarmState(item);
      nav.navigate('SatelliteChooseCropByFarm', {
        farmId: item?.id ?? '',
        farmName: I18nManager.isRTL ? item.name?.ar ?? '' : item.name?.en ?? '',
      });
    },
    [nav]
  );

  const onContinue = useCallback(() => {
    if (userInfoo?.farmonautCropsAvailable) {
      var countOfCrops = 0;
      let countOfCropsMap = cropsSelected.map((x) => {
        countOfCrops = countOfCrops + x.crops.length;
        return {
          it: x.crops,
        };
      });
      if (userInfoo?.farmonautCropsAvailable > countOfCrops) {
        // continue on satelite Screen
        //nav.navigate('SatelliteSelectedCropsList');
        addCropsToServer();
      } else {
        alertExceedSelected();
      }
    } else {
      alertExceedSelected();
    }
  }, [cropsSelected.length, nav, userInfoo]);

  function alertExceedSelected() {
    Alert.alert('Warning!', `you cannot select crops more than your plan.`);
  }

  useEffect(() => {
    clearFarmData();
  }, []);

  function addCropsToServer() {
    addCropsInmembership.mutate(
      {
        data: {
          farmCrops: cropsSelected.map((x) => {
            return {
              farmId: x.farmid,
              farmCropsIds: x.crops
                .map((y) => {
                  return y?.farmCropId ?? '';
                })
                .join(','),
            };
          }),
        },
      },
      {
        onSuccess(data) {
          console.log('addCropsInmembership 1 ===> ', data);
          if (data) {
            if (route.params.screenFrom === AddSubscriptionMoreCrop.UNKNOWN) {
              nav.goBack();
              nav.navigate('SatelliteSelectedCropsList');
            } else {
              client
                .invalidateQueries({
                  queryKey: ['/api/FarmerApp/getfarmonautcrops'],
                })
                .then((item) => {
                  nav.goBack();
                })
                .catch((e) => {
                  nav.goBack();
                });
            }
          } else {
            Toast.show({
              type: 'error',
              text1: 'Something went wrong!',
            });
          }
        },
        onError(error) {
          console.log('checkArea ===> ', error);
          Toast.show({
            type: 'error',
            text1: error.message,
          });
        },
      }
    );
  }

  return (
    <View flex={1}>
      <Text
        fontSize={15}
        mx={5}
        fontFamily={'body'}
        mb={3}
        fontWeight={'600'}
        fontStyle={'normal'}
        mt={5}
      >
        Choose the farm for which you want to view satellite
      </Text>
      <SatelliteSelectedCrops />
      <FarmerListVerticalCell
        isAutoSelect={false}
        onSelectedFarm={onSelectFarm}
        onLoading={setLoading}
      />
      {cropsSelected.length > 0 && (
        <Button
          onPress={onContinue} //nav.navigate('SateliteDemoMapScreen')}
          backgroundColor={colors.button_color}
          borderRadius={8}
          width={'80%'}
          isLoading={isLoading}
          fontWeight={'normal'}
          fontSize={20}
          overflow={'hidden'}
          alignSelf={'center'}
          position={'absolute'}
          bottom={5}
        >
          {'Continue'}
        </Button>
      )}
      {(isLoading || addCropsInmembership.isLoading) && <AppLoader />}
    </View>
  );
};

export default ChooseSateliteFarmScreen;
