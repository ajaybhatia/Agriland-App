import { HStack, Icon, Image, Text, View, VStack } from 'native-base';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CardWithShadow from '@/ui/components/CardWithShadow';
import Header from '@/ui/components/Header';

type Props = {};

function WeatherCell({}: Props) {
  return (
    <CardWithShadow borderRadius={4} shadow="2" mx={5} bgColor={'#ededed'}>
      <VStack m={2}>
        <Header
          numberOfLines={1}
          title={'El-Amal Farm'}
          color={'black'}
          fontSize={11}
          fontWeight={'500'}
        />
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <View pr={2}>
            <Image
              alt=""
              height={'16'}
              width={'16'}
              resizeMode="contain"
              source={require('@assets/weather-icon/8-s.png')}
            />
            <Text
              fontWeight={'700'}
              fontSize={15}
              fontStyle={'normal'}
              position={'absolute'}
              top={1}
              right={1}
            >
              21°
            </Text>
          </View>
          <VStack>
            <Text color={'black'} fontSize={11} fontWeight={'700'}>
              Cairo
            </Text>
            <Text color={'black'} fontSize={11} fontWeight={'500'}>
              Thur.13:09
            </Text>
            <Text color={'black'} fontSize={11} fontWeight={'500'}>
              Sunny
            </Text>
          </VStack>
          <VStack>
            <HStack alignItems={'center'}>
              <Icon color={'black'} as={Entypo} name={'drop'} size={3} />
              <Text ml={2} color={'black'} fontSize={11} fontWeight={'500'}>
                60%
              </Text>
            </HStack>
            <HStack alignItems={'center'}>
              <Icon
                color={'black'}
                as={Ionicons}
                name={'cloudy-night'}
                size={3}
              />
              <Text ml={2} color={'black'} fontSize={11} fontWeight={'500'}>
                30%
              </Text>
            </HStack>
            <HStack alignItems={'center'}>
              <Icon
                color={'black'}
                as={MaterialCommunityIcons}
                name={'soundcloud'}
                size={3}
              />
              <Text ml={2} color={'black'} fontSize={11} fontWeight={'500'}>
                10 kmph
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </CardWithShadow>
  );
}

export default WeatherCell;
