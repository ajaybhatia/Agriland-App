import { HStack, Image, Text, VStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import type { DrawerSubOptionObj } from '@/navigation/tab-navigator';

type Props = {
  item: DrawerSubOptionObj;
  index: number;
  onPress: (item: DrawerSubOptionObj) => void;
};

export default function DrawerOptions({ item, index, onPress }: Props) {
  return (
    <VStack
      ml={'0.5'}
      mr={'0.5'}
      // borderTopWidth={0.5}
      // borderColor={'rgba(0,0,0,0.2)'}
    >
      <TouchableOpacity onPress={() => onPress(item)}>
        <HStack pl={'5'} py={12.1} pr={'1.5'} alignItems={'center'}>
          <HStack alignItems={'center'}>
            {item?.icon && (
              <Image
                resizeMode="contain"
                alt=""
                source={item.icon}
                w={22}
                h={22}
              />
              // <Icon as={item?.as ?? MaterialIcons} name={item.icon} size={18} />
            )}
            <Text ml={'3'} fontWeight="200" fontSize={14}>
              {item?.label ?? ''}
            </Text>
          </HStack>
        </HStack>
      </TouchableOpacity>
    </VStack>
  );
}
