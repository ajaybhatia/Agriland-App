import { FlashList } from '@shopify/flash-list';
import { View } from 'native-base';
import React from 'react';

import Header from '@/ui/components/Header';

import FarmAddCell from './components/farm-add-cell';
import FarmMapSelectionCell from './components/farm-map-selection-cell';

type Props = {};

function ChooseFarmCropCategory({}: Props) {
  return (
    <View flex={1}>
      <Header title={'Choose a farm'} mt={2} mb={2} ml={5} mr={5} />
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={[...Array(10).keys()]}
        ListHeaderComponent={<FarmAddCell />}
        renderItem={({ item, index }: { item: number; index: number }) => (
          <FarmMapSelectionCell />
        )}
        estimatedItemSize={300}
      />
    </View>
  );
}

export default ChooseFarmCropCategory;
