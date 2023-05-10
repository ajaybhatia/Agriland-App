import { HStack, Icon, Text, VStack } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  isOpen: boolean;
};

const CustomDropCells = ({ isOpen }: Props) => {
  return (
    <VStack>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <Text>Services</Text>
        <Icon
          as={MaterialIcons}
          name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={'lg'}
          color={'black'}
        />
      </HStack>
    </VStack>
  );
};

export default CustomDropCells;
