import dayjs from 'dayjs';
import { HStack, Icon, Text, VStack } from 'native-base';
import * as React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import type { ForecastModel } from '../models/weather-forecast-models';

type Props = {
  weatherReport: ForecastModel;
};
const WeatherWeekCell = ({ weatherReport }: Props) => {
  return (
    <VStack
      bgColor={'rgba(0,0,0,0.5)'}
      mx={5}
      my={3}
      overflow={'hidden'}
      borderRadius={10}
    >
      <HStack justifyContent={'space-between'} p={3} alignItems={'center'}>
        <Text
          color={'white'}
          fontFamily={'heading'}
          fontSize={14}
          fontWeight={'500'}
        >
          Today
        </Text>
        {/* <Image
                alt=""
                h={8}
                w={8}
                source={require('@assets/weather-icon/1.png')}
                resizeMode="cover"
              /> */}

        {/* <Image
                alt=""
                h={8}
                w={8}
                source={require('@assets/weather-icon/1.png')}
                resizeMode="cover"
              /> */}
        <Icon as={Entypo} name={'drop'} size={'lg'} color={'blue.700'} />
        {/* <Image
                alt=""
                h={8}
                w={8}
                source={require('@assets/weather-icon/1.png')}
                resizeMode="cover"
              /> */}
        <Icon
          as={MaterialCommunityIcons}
          name={'cloud'}
          size={'lg'}
          color={'blue.700'}
        />
        <Icon as={FontAwesome5} name={'wind'} size={'lg'} color={'blue.700'} />
      </HStack>
      {weatherReport.daily.time.map((day, index) => {
        return (
          <HStack
            key={`${index}`}
            // borderBottomColor={'white'}
            // borderBottomWidth={0.3}
            borderTopColor={'white'}
            borderTopWidth={0.3}
            justifyContent={'space-between'}
            p={3}
            alignItems={'center'}
          >
            <Text
              flex={0.35}
              color={'white'}
              fontFamily={'heading'}
              fontSize={14}
              fontWeight={'500'}
            >
              {dayjs(day).utc(true).format('dddd')}
            </Text>
            <Text
              flex={0.22}
              color={'white'}
              fontFamily={'heading'}
              fontSize={12}
              fontWeight={'500'}
            >
              {Math.round(
                weatherReport.daily?.precipitation_probability_max[index] ?? 0
              )}
              %
            </Text>
            <Text
              flex={0.22}
              color={'white'}
              fontFamily={'heading'}
              fontSize={12}
              fontWeight={'500'}
            >
              {Math.round(weatherReport.daily?.rain_sum[index] ?? 0)}
              mm
            </Text>
            <Text
              flex={0.22}
              color={'white'}
              fontFamily={'heading'}
              fontSize={12}
              fontWeight={'500'}
            >
              {Math.round(weatherReport.daily?.windspeed_10m_max[index] ?? 0)}
              Km/h
            </Text>
          </HStack>
        );
      })}
    </VStack>
  );
};
export default WeatherWeekCell;
