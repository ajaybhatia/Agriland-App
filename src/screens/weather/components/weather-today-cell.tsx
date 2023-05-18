import dayjs from 'dayjs';
import { Image as ImageRemote } from 'expo-image';
import { HStack, Icon, ScrollView, Text, View, VStack } from 'native-base';
import * as React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import type { ForecastModel } from '../models/weather-forecast-models';
import weatherCodeToString from '../weather-icons';

type Props = {
  weatherReport: ForecastModel;
};
const WeatherTodayCell = ({ weatherReport }: Props) => {
  const scrollRef = React.useRef();
  let indexV = weatherReport.hourly.time.findIndex((v) => {
    return dayjs(v)
      .startOf('hour')
      .utc(true)
      .isSame(
        dayjs(weatherReport.current_weather.time).startOf('hour').utc(true)
      );
  });

  let indexWeather = weatherReport.hourly.time.findIndex((v) => {
    return dayjs(v)
      .startOf('hour')
      .utc(true)
      .isSame(dayjs().startOf('hour').utc(true));
  });
  return (
    <VStack
      bgColor={'rgba(0,0,0,0.5)'}
      overflow={'hidden'}
      borderRadius={10}
      mx={5}
      my={3}
    >
      <HStack justifyContent={'space-between'} p={3}>
        <VStack alignItems={'center'} justifyContent={'center'}>
          <Icon
            as={FontAwesome5}
            name={'wind'}
            size={'lg'}
            color={'blue.700'}
          />
          <Text
            color={'white'}
            fontFamily={'heading'}
            fontSize={12}
            fontWeight={'400'}
          >
            {Math.round(weatherReport.current_weather.windspeed)}Km/h
          </Text>
        </VStack>

        <VStack alignItems={'center'} justifyContent={'center'}>
          <Icon
            as={MaterialCommunityIcons}
            name={'cloud'}
            size={'lg'}
            color={'blue.700'}
          />
          <Text
            color={'white'}
            fontFamily={'heading'}
            fontSize={12}
            fontWeight={'400'}
          >
            {Math.round(
              indexV >= 0 && weatherReport.hourly.rain.length > 0
                ? weatherReport.hourly.rain[indexV]
                : 0
            )}
            mm
          </Text>
        </VStack>

        <VStack alignItems={'center'} justifyContent={'center'}>
          <Icon as={Entypo} name={'drop'} size={'lg'} color={'blue.700'} />
          <Text
            color={'white'}
            fontFamily={'heading'}
            fontSize={12}
            fontWeight={'400'}
          >
            {Math.round(
              indexV >= 0 && weatherReport.hourly.cloudcover_700hPa.length > 0
                ? weatherReport.hourly.cloudcover_700hPa[indexV]
                : 0
            )}
            %
          </Text>
        </VStack>
      </HStack>
      <View h={0.3} mb={2} bgColor={'white'} w={'100%'} />
      <ScrollView
        horizontal
        ref={scrollRef}
        contentOffset={{ x: indexWeather > 0 ? indexWeather * 41 : 0, y: 0 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <HStack p={3}>
          {weatherReport.hourly.time.map((v, index) => {
            return (
              <VStack
                key={`${index}`}
                alignItems={'center'}
                justifyContent={'center'}
                mr={3}
              >
                <Text
                  color={'white'}
                  fontFamily={'heading'}
                  fontSize={12}
                  fontWeight={'400'}
                >
                  {dayjs(v).startOf('hour').utc(true).format('h A')}
                </Text>
                {/* <Image
                        my={3}
                        alt=""
                        h={5}
                        w={5}
                        source={require('@assets/weather-icon/1.png')}
                        resizeMode="cover"
                      /> */}
                <ImageRemote
                  style={{ height: 20, width: 20, marginVertical: 8 }}
                  source={`https://www.weatherbit.io/static/img/icons/${
                    weatherCodeToString[weatherReport.hourly.weathercode[index]]
                      ?.icon ?? ''
                  }.png`}
                  placeholder={require('@assets/app-logo.png')}
                  contentFit="cover"
                  transition={1000}
                />
                <Text
                  color={'white'}
                  fontFamily={'heading'}
                  fontSize={12}
                  fontWeight={'400'}
                >
                  {Math.round(weatherReport.hourly.temperature_2m[index])}°
                </Text>
              </VStack>
            );
          })}
        </HStack>
      </ScrollView>
    </VStack>
  );
};
export default WeatherTodayCell;
