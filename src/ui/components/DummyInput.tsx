import { Icon, Pressable, Text, View, VStack } from 'native-base';
import type { ColorType } from 'native-base/lib/typescript/components/types';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { BORDER_COLOR_DARK } from '../theme/colors';

type Props = {
  onOpen?: () => void;
  value: String;
  mt?: number;
  color?: ColorType;
  defaultValue?: String;
  isInvalid?: boolean;
  errors?: any;
};

function DummyInput({
  onOpen,
  mt = 2,
  color = '#a9a9a9',
  value = '',
  defaultValue,
  errors,
  isInvalid,
}: Props) {
  console.log(errors, ' === ', isInvalid);
  return (
    <VStack>
      <Pressable
        onPress={() => onOpen && onOpen()}
        mt={mt}
        borderWidth={2}
        borderColor={BORDER_COLOR_DARK}
        borderRadius={15}
      >
        <View
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text
            numberOfLines={1}
            color={value === '' ? color : '#000'}
            fontSize={'xs'}
            ml={3}
            py={4}
          >
            {value === '' ? defaultValue : value}
          </Text>
          <Icon
            mr={3}
            as={MaterialIcons}
            name={'arrow-drop-down'}
            size={'2xl'}
            color={'amber.600'}
          />
        </View>
      </Pressable>
      {isInvalid && errors && (
        <Text mt={2} color={'#CC5500'} fontSize={12}>
          {errors}
        </Text>
      )}
    </VStack>
  );
}

export default DummyInput;
