import { HStack, Pressable, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

import type { FarmResponse } from '@/apis/model';
import BodyTitle from '@/ui/components/BodyTitle';
import Header from '@/ui/components/Header';
import colors from '@/ui/theme/colors';

type Props = {
  item: FarmResponse;
};
const width = Dimensions.get('window').width;
export default function FarmMapSelectionCell({ item }: Props) {
  return (
    <Pressable
      bgColor={colors.BACKGROUND_CELL_COLOR}
      h={100}
      mx={3}
      w={width / 2 + width / 5}
      borderRadius={20}
      py={2}
      px={4}
      justifyContent={'center'}
    >
      <VStack>
        <Header
          title={item?.name ?? 'Title'}
          fontSize={13}
          fontWeight={'semibold'}
          color="#FFF"
        />
        <HStack alignItems={'center'}>
          <BodyTitle
            title="Area"
            fontSize={11}
            fontWeight={'100'}
            color="#FFF"
          />
          <Header
            ml={2}
            title={item?.address ?? ' Area here...'}
            fontSize={12}
            fontWeight={'400'}
            color="#FFF"
          />
        </HStack>
        <BodyTitle
          title="Farm Crops"
          fontSize={11}
          fontWeight={'100'}
          color="#FFF"
        />
        <Header
          title={item?.city ?? 'crops here'}
          fontSize={12}
          fontWeight={'400'}
          color="#FFF"
        />
      </VStack>
    </Pressable>
  );
}
