import { useNavigation } from '@react-navigation/native';
import { Button, Text, View, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import type { FarmResponse } from '@/apis/model';
import { useAuth } from '@/core';
import { useSatelliteFarm } from '@/core/satellite-farm';
import AppLoader from '@/ui/components/AppLoader';
import colors from '@/ui/theme/colors';

import FarmerListVerticalCell from '../home/components/farmer-list-vertical-cell';
import SatelliteSelectedCrops from './components/satellite-selected-crops';

type Props = {};

const ChooseSateliteFarmScreen = (props: Props) => {
  const cropsSelected = useSatelliteFarm.use.satelliteSelectedCrops();
  const userInfoo = useAuth.use.userInfos();
  const [isLoading, setLoading] = useState<boolean>(true);
  const nav = useNavigation();
  const onSelectFarm = useCallback(
    (item: FarmResponse) => {
      //  setSelectedFarmState(item);
      nav.navigate('SatelliteChooseCropByFarm', {
        farmId: item?.id ?? '',
      });
    },
    [nav]
  );

  const onContinue = useCallback(() => {
    if (userInfoo?.farmonautCropsAvailable) {
      if (userInfoo?.farmonautCropsAvailable > cropsSelected.length) {
        // continue on satelite Screen
        nav.navigate('SatelliteSelectedCropsList');
      } else {
        alertExceedSelected();
      }
    } else {
      alertExceedSelected();
    }
  }, [cropsSelected.length, nav, userInfoo?.farmonautCropsAvailable]);

  function alertExceedSelected() {
    Alert.alert('Warning!', `you cannot select crops more than your plan.`);
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
      <FarmerListVerticalCell
        isAutoSelect={false}
        onSelectedFarm={onSelectFarm}
        onLoading={setLoading}
      />
      {cropsSelected.length > 0 && (
        <VStack
          position={'absolute'}
          bottom={0}
          left={0}
          pt={5}
          right={0}
          bgColor={'white'}
        >
          <SatelliteSelectedCrops />

          <Button
            onPress={onContinue} //nav.navigate('SateliteDemoMapScreen')}
            backgroundColor={colors.button_color}
            borderRadius={8}
            width={'80%'}
            isLoading={isLoading}
            mb={'10'}
            mt={5}
            fontWeight={'normal'}
            fontSize={20}
            overflow={'hidden'}
            alignSelf={'center'}
          >
            {'Continue'}
          </Button>
        </VStack>
      )}
      {isLoading && <AppLoader />}
    </View>
  );
};

export default ChooseSateliteFarmScreen;
