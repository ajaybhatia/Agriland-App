import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, VStack } from 'native-base';
import React, { useCallback } from 'react';
import { Alert, I18nManager } from 'react-native';

import type { FarmonautFarm, FarmonautFarmCropModel } from '@/apis/model';

import SatelliteSelectedCropsCell from './satellite-selected-crops-cell';

type Props = {
  item: FarmonautFarm;
};

const SatelliteCropsWithFarmName = ({ item }: Props) => {
  const nav = useNavigation();
  const onSelectCrop = useCallback(
    (itemV: FarmonautFarmCropModel) => {
      if (itemV.fieldId) {
        nav.navigate('SateliteMapScreen', {
          fieldId: itemV.fieldId,
        });
      } else {
        Alert.alert(
          'Warning!',
          'You cannot find satellite data for this crop.'
        );
      }
    },
    [nav]
  );
  return (
    <VStack>
      <Text
        fontFamily={'body'}
        fontSize={'md'}
        fontStyle={'normal'}
        fontWeight={'500'}
        py={2}
      >
        {I18nManager.isRTL ? item?.name?.ar ?? '' : item?.name?.en ?? ''}
      </Text>
      <FlatList
        numColumns={2}
        // style={{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={item?.farmCrops ?? []}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({
          item: farm,
          index,
        }: {
          item: FarmonautFarmCropModel;
          index: number;
        }) => {
          // console.log(isSelected);
          return (
            <SatelliteSelectedCropsCell item={farm} onSelect={onSelectCrop} />
          );
        }}
      />
    </VStack>
  );
};

export default SatelliteCropsWithFarmName;
