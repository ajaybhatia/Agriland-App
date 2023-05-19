import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { HStack, Icon, Text, View, VStack } from 'native-base';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import type { LocationAddress } from '@/screens/maps-views/model/location-address-model';
import type { ForecastModel } from '@/screens/weather/models/weather-forecast-models';
import weatherCodeToString from '@/screens/weather/weather-icons';
import CardWithShadow from '@/ui/components/CardWithShadow';
import Header from '@/ui/components/Header';

type Props = {
  currentWeather: ForecastModel;
  farmName?: string;
  locationAddress?: LocationAddress;
};

function WeatherCell({
  currentWeather,
  farmName = '',
  locationAddress,
}: Props) {
  let index = currentWeather.hourly.time.findIndex((v) =>
    dayjs(v)
      .startOf('hour')
      .utc(true)
      .isSame(
        dayjs(currentWeather.current_weather.time).startOf('hour').utc(true)
      )
  );
  return (
    <CardWithShadow borderRadius={4} shadow="2" mx={5} bgColor={'#ededed'}>
      <VStack m={2}>
        <Header
          numberOfLines={1}
          title={farmName}
          color={'black'}
          fontSize={11}
          fontWeight={'500'}
        />
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <View pr={2}>
            {/* <Image
              alt=""
              height={'16'}
              width={'16'}
              resizeMode="contain"
              source={require('@assets/weather-icon/8-s.png')}
            /> */}
            <Image
              style={{ height: 30, width: 30 }}
              source={`https://www.weatherbit.io/static/img/icons/${
                weatherCodeToString[currentWeather.current_weather.weathercode]
                  ?.icon ?? ''
              }.png`}
              placeholder={require('@assets/app-logo.png')}
              contentFit="cover"
              transition={1000}
            />
            <Text
              fontWeight={'700'}
              fontSize={15}
              fontStyle={'normal'}
              position={'absolute'}
              top={-10}
              right={-10}
            >
              {Math.round(currentWeather.current_weather.temperature)}°
            </Text>
          </View>
          <VStack>
            <Text color={'black'} fontSize={11} fontWeight={'700'}>
              {locationAddress?.address?.state_district ??
                locationAddress?.address?.city_district ??
                ''}
            </Text>
            <Text color={'black'} fontSize={11} fontWeight={'500'}>
              {/* Thur.13:09 */}
              {dayjs(currentWeather.current_weather.time)
                .utc(true)
                .format('ddd, h:mm A')}
            </Text>
            <Text color={'black'} fontSize={11} fontWeight={'500'}>
              {weatherCodeToString[currentWeather.current_weather.weathercode]
                ?.label ?? ''}
            </Text>
          </VStack>
          <VStack>
            {index >= 0 && (
              <HStack alignItems={'center'}>
                <Icon color={'black'} as={Entypo} name={'drop'} size={3} />
                <Text ml={2} color={'black'} fontSize={11} fontWeight={'500'}>
                  {currentWeather.hourly.cloudcover_700hPa[index]} %
                </Text>
              </HStack>
            )}
            <HStack alignItems={'center'}>
              <Icon
                color={'black'}
                as={Ionicons}
                name={'cloudy-night'}
                size={3}
              />
              <Text ml={2} color={'black'} fontSize={11} fontWeight={'500'}>
                {currentWeather.hourly?.rain[index]} mm
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
                {Math.round(currentWeather.current_weather.windspeed)} kmph
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </CardWithShadow>
  );
}

export default WeatherCell;
