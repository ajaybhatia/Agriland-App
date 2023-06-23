import { Image as NImage } from 'expo-image';
import { HStack, Icon, Image, Text, View } from 'native-base';
import React from 'react';
import { I18nManager } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import type { FarmerCropCalendarActivity } from '@/apis/model';

type Props = {
  isSelect: boolean;
  item?: FarmerCropCalendarActivity;
};

const TodayTaskListCell = ({ isSelect, item }: Props) => {
  return (
    <View
      borderTopLeftRadius={'full'}
      borderBottomLeftRadius={'full'}
      borderTopRightRadius={5}
      borderBottomRightRadius={5}
      my={3}
      backgroundColor={'white'}
      shadow={1}
    >
      <HStack p={3} alignItems={'center'}>
        {/* <Image
          alt=""
          h={'10'}
          w={'10'}
          resizeMode={'cover'}
          borderRadius={'full'}
          source={require('@assets/app-logo.png')}
        /> */}
        <NImage
          style={{ height: 55, width: 55, borderRadius: 25 }}
          source={item?.imageUrl ?? 'http://'}
          placeholder={require('@assets/app-logo.png')}
          contentFit="cover"
          transition={1000}
        />
        <Image
          alt=""
          h={'10'}
          mx={2}
          w={'10'}
          resizeMode={'cover'}
          borderRadius={'full'}
          source={require('@assets/app-logo.png')}
        />
        <Text
          fontSize={14}
          w={'50%'}
          numberOfLines={3}
          fontFamily={'body'}
          fontWeight={'500'}
          fontStyle={'normal'}
        >
          {I18nManager.isRTL
            ? (item && item?.activityDesc?.ar) ?? item?.activityName?.ar ?? ''
            : (item && item?.activityDesc?.en) ?? item?.activityName?.en ?? ''}
        </Text>
        <Icon
          mx={3}
          as={MaterialIcons}
          name={isSelect ? 'check-box' : 'check-box-outline-blank'}
          size={'2xl'}
          color={'black'}
        />
      </HStack>
    </View>
  );
};

export default TodayTaskListCell;
