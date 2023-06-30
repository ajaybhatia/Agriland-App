import { HStack, Icon, Pressable, Text } from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '@/ui/theme/colors';

type Props = {
  onPreviousSubmit?: () => void;
};
export default function FarmAddVerticalCell({ onPreviousSubmit }: Props) {
  return (
    <Pressable
      onPress={onPreviousSubmit}
      bgColor={colors.BACKGROUND_CELL_COLOR}
      justifyContent={'center'}
      alignItems={'center'}
      h={'32'}
      mx={5}
      mt={2}
      borderRadius={20}
    >
      <HStack alignItems={'center'} px={5}>
        <Text color={'#FFF'}>Add Another Farm</Text>
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
