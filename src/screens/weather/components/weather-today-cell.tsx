import dayjs from 'dayjs';
import { FlatList, HStack, Icon, Text, View, VStack } from 'native-base';
import type { ILinearGradientProps } from 'native-base/lib/typescript/components/primitives/Box/types';
import type {
  ColorType,
  ResponsiveValue,
} from 'native-base/lib/typescript/components/types';
import * as React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import type { ForecastModel } from '../models/weather-forecast-models';
import WeatherHorizontalTime from './weather-horizontal-time';

type Props = {
  weatherReport: ForecastModel;
  iconColor?: ResponsiveValue<IColors | (string & {})>;
  bgColor?: ResponsiveValue<ColorType | (string & {}) | ILinearGradientProps>;
};
const WeatherTodayCell = ({ weatherReport, bgColor, iconColor }: Props) => {
  let indexV = weatherReport.hourly.time.findIndex((v) => {
    return dayjs(v)
      .startOf('hour')
      .utc(true)
      .isSame(dayjs().startOf('hour').utc(true));
  });
  let weatherReportTime =
    indexV <= 0
      ? weatherReport.hourly.time
      : weatherReport.hourly.time.slice(
          indexV,
          weatherReport.hourly.time.length
        );
  let weatherReportCode =
    indexV <= 0
      ? weatherReport.hourly.weathercode
      : weatherReport.hourly.weathercode.slice(
          indexV,
          weatherReport.hourly.weathercode.length
        );

  let weatherReportTemperature =
    indexV <= 0
      ? weatherReport.hourly.temperature_2m
      : weatherReport.hourly.temperature_2m.slice(
          indexV,
          weatherReport.hourly.temperature_2m.length
        );
  return (
    <VStack
      bgColor={bgColor ? bgColor : 'rgba(0,0,0,0.5)'}
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
            color={iconColor ? iconColor : 'blue.700'}
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
            color={iconColor ? iconColor : 'blue.700'}
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
          <Icon
            as={Entypo}
            name={'drop'}
            size={'lg'}
            color={iconColor ? iconColor : 'blue.700'}
          />
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
      <FlatList
        horizontal
        // initialScrollIndex={0}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
        data={weatherReportTime}
        renderItem={({ item, index }: { item: string; index: number }) => (
          <WeatherHorizontalTime
            temperature_2m={weatherReportTemperature[index]}
            weathercode={weatherReportCode[index]}
            time={item}
          />
        )}
        //estimatedItemSize={300}
      />
    </VStack>
  );
};
export default React.memo(WeatherTodayCell);
