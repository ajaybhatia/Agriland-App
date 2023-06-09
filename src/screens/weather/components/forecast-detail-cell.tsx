import dayjs from 'dayjs';
import { HStack, Text, View } from 'native-base';
import React, { memo } from 'react';
import { I18nManager } from 'react-native';

import type { ForecastModel } from '../models/weather-forecast-models';

type Props = {
  day: string;
  index: number;
  weatherReport: ForecastModel;
};

const ForecastDetailCell = ({ index, day, weatherReport }: Props) => {
  return (
    <HStack
      // borderBottomColor={'white'}
      // borderBottomWidth={0.3}
      borderTopColor={'white'}
      borderTopWidth={0.3}
      justifyContent={'space-between'}
      p={3}
      alignItems={'center'}
    >
      <View flex={0.35}>
        <Text
          w={'100%'}
          textAlign={I18nManager.isRTL ? 'left' : 'right'}
          color={'white'}
          fontFamily={'heading'}
          fontSize={14}
          fontWeight={'500'}
        >
          {dayjs(day).utc(true).format('dddd')}
        </Text>
      </View>
      <View flex={0.21}>
        <Text
          w={'100%'}
          textAlign={I18nManager.isRTL ? 'left' : 'right'}
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
      </View>
      <View flex={0.22}>
        <Text
          w={'100%'}
          textAlign={I18nManager.isRTL ? 'center' : 'right'}
          color={'white'}
          fontFamily={'heading'}
          fontSize={12}
          fontWeight={'500'}
        >
          {Math.round(weatherReport.daily?.rain_sum[index] ?? 0)}
          mm
        </Text>
      </View>
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
};

export default memo(ForecastDetailCell);
