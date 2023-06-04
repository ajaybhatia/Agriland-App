import { Image } from 'expo-image';
import { HStack, Icon, Pressable, Text, View, VStack } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
}
const DropDownIteCell = ({
  title,
  isShow,
  items,
  onShow,
  index: indexV,
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
            <View key={`${index}`} mt={2}>
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
                  style={{ height: 40, width: 40 }}
                  source={item.icon}
                  placeholder={require('@assets/app-logo.png')}
                  contentFit="cover"
                  transition={1000}
                />
              </HStack>
            </View>
          );
        })}
    </VStack>
  );
};

export default DropDownIteCell;
