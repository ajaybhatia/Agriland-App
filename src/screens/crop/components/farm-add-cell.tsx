import { HStack, Icon, Pressable, Text } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '@/ui/theme/colors';

type Props = {};
const width = Dimensions.get('window').width;
export default function FarmAddCell({}: Props) {
  return (
    <Pressable
      bgColor={colors.BACKGROUND_CELL_COLOR}
      justifyContent={'center'}
      alignItems={'center'}
      h={100}
      mr={2}
      w={width / 2 + width / 5}
      borderRadius={20}
    >
      <HStack alignItems={'center'} px={5}>
        <Text color={'#FFF'}>Add another farm</Text>
        <Icon
          ml={1}
          as={MaterialCommunityIcons}
          name={'plus'}
          size={'lg'}
          color={'#FFF'}
        />
      </HStack>
    </Pressable>
  );
}
