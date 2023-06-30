import { Image } from 'expo-image';
import {
  HStack,
  Image as ImageBase,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import { I18nManager } from 'react-native';

import type { CultivationDetailResponse } from '@/apis/model';

type Props = {
  item: CultivationDetailResponse;
  cultivationMonth?: number;
};
type CropItems = {
  date: string;
  image: string;
};
const CropGrowthCell = ({ item }: Props) => {
  console.log('growth ==> ', item);
  const arrayItems: CropItems[] = [
    {
      date: '1st Month',
      image: require('@assets/crop_growth1.png'),
    },
    {
      date: '2nd Month',
      image: require('@assets/crop_growth2.png'),
    },
    {
      date: '3rd Month',
      image: require('@assets/crop_growth3.png'),
    },
    {
      date: '4th Month',
      image: require('@assets/crop_growth4.png'),
    },
    {
      date: '5th Month',
      image: require('@assets/crop_growth5.png'),
    },
    {
      date: '6th Month',
      image: require('@assets/crop_growth5.png'),
    },
  ];
  return (
    <View shadow={1} bgColor={'white'} mx={5} borderRadius={5}>
      <VStack>
        <HStack p={2} alignItems={'center'}>
          <View w={10} h={10} rounded={'full'} overflow={'hidden'}>
            <Image
              style={{ flex: 1, height: 20 }}
              source={`http://95.111.231.114:85${
                item?.cropDetails?.imageUrl ?? ''
              }`}
              placeholder={require('@assets/app-logo.png')}
              contentFit="cover"
              transition={1000}
            />
          </View>
          <Text
            ml={2}
            fontFamily={'body'}
            fontSize={14}
            fontStyle={'normal'}
            fontWeight={'500'}
          >
            {I18nManager.isRTL
              ? item?.cropDetails?.name?.ar ?? ''
              : item?.cropDetails?.name?.en ?? ''}
          </Text>
        </HStack>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {arrayItems.map((cropItem: CropItems, index: number) => {
            return (
              <VStack
                key={`${index}`}
                alignItems={'center'}
                justifyContent={'flex-end'}
                mr={2}
              >
                {/* <Image
                  style={{ width: 40, height: 40 }}
                  source={cropItem.image}
                  placeholder={require('@assets/app-logo.png')}
                  contentFit="cover"
                  transition={1000}
                /> */}
                <ImageBase
                  //h={12}
                  w={12}
                  alt=""
                  resizeMode="contain"
                  source={cropItem.image}
                />
                <Text
                  fontFamily={'body'}
                  fontSize={11}
                  mt={1}
                  mb={1}
                  fontStyle={'normal'}
                  fontWeight={'200'}
                  color={'gray.500'}
                >
                  {cropItem.date}
                </Text>
              </VStack>
            );
          })}
        </ScrollView>
      </VStack>
    </View>
  );
};

export default CropGrowthCell;
