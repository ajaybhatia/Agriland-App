import { HStack, Pressable, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

import BodyTitle from '@/ui/components/BodyTitle';
import Header from '@/ui/components/Header';
import colors from '@/ui/theme/colors';

type Props = {};
const width = Dimensions.get('window').width;
export default function FarmMapSelectionCell({}: Props) {
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
          title="Al Aml Farm"
          fontSize={13}
          fontWeight={'semibold'}
          color="#FFF"
        />
        <HStack alignItems={'center'}>
          <BodyTitle
            title="area"
            fontSize={11}
            fontWeight={'normal'}
            color="#FFF"
          />
          <Header
            ml={2}
            title="50 tons"
            fontSize={12}
            fontWeight={'extrabold'}
            color="#FFF"
          />
        </HStack>
        <BodyTitle
          title="farm crops"
          fontSize={11}
          fontWeight={'700'}
          color="#FFF"
        />
        <Header
          title="Orange,Pomegranate"
          fontSize={12}
          fontWeight={'700'}
          color="#FFF"
        />
      </VStack>
    </Pressable>
  );
}
