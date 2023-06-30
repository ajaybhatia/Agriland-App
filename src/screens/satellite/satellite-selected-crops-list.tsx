import { useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'native-base';
import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { StyleSheet } from 'react-native';

import type { CultivationDetailResponse } from '@/apis/model';
import { useAuth } from '@/core';
import { useSatelliteFarm } from '@/core/satellite-farm';

import SatelliteCropCell from '../crop/components/satellite-crop-cell';

function SatelliteSelectedCropsList() {
  const nav = useNavigation();
  const userInfoo = useAuth.use.userInfos();
  const cropsSelected = useSatelliteFarm.use.satelliteSelectedCrops();

  const onSelectCrop = useCallback(
    (item: CultivationDetailResponse) => {
      if (item.fieldId) {
        nav.navigate('SateliteMapScreen');
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
    <View flex={1} backgroundColor={'white'}>
      <View flex={1} mx={5} justifyContent={'flex-start'}>
        <FlatList
          numColumns={2}
          // style={{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={cropsSelected}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({
            item,
            index,
          }: {
            item: CultivationDetailResponse;
            index: number;
          }) => {
            // console.log(isSelected);
            return <SatelliteCropCell item={item} onSelect={onSelectCrop} />;
          }}
        />
      </View>
    </View>
  );
}

export default SatelliteSelectedCropsList;

const styles = StyleSheet.create({
  headerFooterStyle: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
