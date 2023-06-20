import {
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from 'native-base';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import colors from '@/ui/theme/colors';

export interface DropDownCellType {
  title: string;
  icon: string;
  color: string;
}
export interface DropDownIteCellType {
  title: string;
  index: number;
  isShow?: boolean;
  items: DropDownCellType[];
  onShow?: (isShowItem: boolean, index: number) => void;
  onPress?: (title: string) => void;
}
const DropDownIteCell = ({
  title,
  isShow,
  items,
  onShow,
  index: indexV,
  onPress,
}: DropDownIteCellType) => {
  return (
    <VStack>
      <Pressable onPress={() => onShow && onShow(!isShow, indexV)}>
        <HStack
          shadow={1}
          borderRadius={5}
          alignItems={'center'}
          justifyContent={'space-between'}
          py={2}
          px={3}
          bgColor={colors.button_color}
        >
          <Text
            fontSize={15}
            fontFamily={'body'}
            fontStyle={'normal'}
            fontWeight={'500'}
            color={'white'}
          >
            {title}
          </Text>
          <Icon
            as={MaterialIcons}
            name={isShow ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={'xl'}
            color={'white'}
          />
        </HStack>
      </Pressable>
      {isShow &&
        items.map((item: DropDownCellType, index: number) => {
          return (
            <Pressable
              onPress={() => onPress && onPress(item.title)}
              key={`${index}`}
              mt={2}
            >
              <HStack
                shadow={1}
                borderRadius={5}
                alignItems={'center'}
                justifyContent={'space-between'}
                py={2}
                px={3}
                bgColor={'white'}
              >
                <View
                  bgColor={item.color}
                  alignItems={'center'}
                  shadow={1}
                  px={2}
                  flex={0.7}
                  py={0.5}
                  borderRadius={5}
                  justifyContent={'center'}
                >
                  <Text
                    fontSize={15}
                    fontFamily={'body'}
                    fontStyle={'normal'}
                    fontWeight={'500'}
                    color={'white'}
                  >
                    {item.title}
                  </Text>
                </View>
                <Image
                  h={'10'}
                  w={'10'}
                  alt=""
                  resizeMode="contain"
                  source={item.icon}
                />
              </HStack>
            </Pressable>
          );
        })}
    </VStack>
  );
};

export default DropDownIteCell;
