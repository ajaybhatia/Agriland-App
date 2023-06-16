//import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { HStack, Pressable, Text, VStack } from 'native-base';
import React from 'react';

import type { ViewNotificationResponse } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';
import colors from '@/ui/theme/colors';

//dayjs.extend(utc);
dayjs.extend(relativeTime);

type Props = {
  item: ViewNotificationResponse;
  onViewPress?: (item: ViewNotificationResponse) => void;
};

const NoticationCell = ({ item, onViewPress }: Props) => {
  console.log('NoticationCell===> ', item?.msgCreatedOn);
  return (
    <CardWithShadow
      borderColor={colors.BORDER_COLOR_DARK}
      borderWidth={item?.isRead ? 0.5 : 1}
      shadow="1"
      borderRadius={5}
    >
      <Pressable onPress={() => onViewPress && onViewPress(item)}>
        <HStack my={2} alignItems={'center'}>
          {/* <Image
          alt=""
          ml={3}
          h={30}
          w={30}
          resizeMode={'cover'}
          source={require('@assets/app-logo.png')}
        /> */}
          <VStack mx={3} w={'93%'}>
            <Text
              w={'100%'}
              fontFamily={'heading'}
              fontWeight={'500'}
              mr={10}
              fontStyle={'normal'}
              fontSize={13}
            >
              {item?.messageTitle ?? ''}
            </Text>
            <Text
              w={'100%'}
              fontFamily={'heading'}
              fontWeight={'200'}
              mr={10}
              fontStyle={'normal'}
              fontSize={12}
            >
              {item?.messageBody ?? ''}
            </Text>
            <Text
              alignSelf={'flex-end'}
              fontFamily={'heading'}
              fontWeight={'100'}
              fontStyle={'normal'}
              fontSize={12}
            >
              {dayjs(item?.msgCreatedOn).utc().fromNow()}
            </Text>
          </VStack>
        </HStack>
      </Pressable>
    </CardWithShadow>
  );
};

export default NoticationCell;
