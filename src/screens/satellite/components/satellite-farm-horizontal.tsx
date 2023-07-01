import { FlatList, Text, VStack } from 'native-base';
import React from 'react';
import { I18nManager } from 'react-native';

import type { CultivationDetailResponse } from '@/apis/model';
import type { SelectedCropsListState } from '@/core/satellite-farm';

import SatelliteSelectedCropCell from './satellite-selected-crop-cell';

type Props = {
  item?: SelectedCropsListState;
};

const SatelliteFarHorizontal = ({ item }: Props) => {
  return (
    <VStack>
      <Text
        fontFamily={'body'}
        fontSize={'sm'}
        fontWeight={'500'}
        fontStyle={'normal'}
        maxWidth={150}
        numberOfLines={1}
      >
        {item?.farmname ?? ''}
      </Text>
      <FlatList
        horizontal
        scrollEnabled={false}
        keyExtractor={(item, indexV) => `${indexV}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}
        data={item?.crops ?? []}
        renderItem={({ item: crop }: { item: CultivationDetailResponse }) => (
          <SatelliteSelectedCropCell
            item={crop}
            farmName={item?.farmname ?? ''}
            farmid={item?.farmid ?? ''}
            isSmall={true}
          />
        )}
      />
    </VStack>
  );
};

export default SatelliteFarHorizontal;
