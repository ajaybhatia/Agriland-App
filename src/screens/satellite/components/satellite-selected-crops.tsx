import { FlatList, View } from 'native-base';
import React from 'react';
import { I18nManager } from 'react-native';

import type { SelectedCropsListState } from '@/core/satellite-farm';
import { useSatelliteFarm } from '@/core/satellite-farm';

import SatelliteFarHorizontal from './satellite-farm-horizontal';

type Props = {};

const SatelliteSelectedCrops = (props: Props) => {
  const cropsSelected = useSatelliteFarm.use.satelliteSelectedCrops();
  return (
    <View>
      <FlatList
        horizontal
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
        initialScrollIndex={0}
        keyExtractor={(item, indexV) => `${indexV}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}
        data={cropsSelected}
        renderItem={({ item: crop }: { item: SelectedCropsListState }) => (
          <SatelliteFarHorizontal item={crop} />
        )}
      />
    </View>
  );
};

export default SatelliteSelectedCrops;
