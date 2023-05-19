import dayjs from 'dayjs';
import { Image as ImageRemote } from 'expo-image';
import { Text, VStack } from 'native-base';
import React, { memo } from 'react';

import weatherCodeToString from '../weather-icons';

type Props = {
  time: string;
  weathercode: number;
  temperature_2m: number;
};

const WeatherHorizontalTime = ({
  temperature_2m,
  weathercode,
  time,
}: Props) => {
  return (
    <VStack alignItems={'center'} justifyContent={'center'} mr={3}>
      <Text
        color={'white'}
        fontFamily={'heading'}
        fontSize={12}
        fontWeight={'400'}
      >
        {dayjs(time).startOf('hour').utc(true).format('h A')}
      </Text>
      <ImageRemote
        style={{ height: 20, width: 20, marginVertical: 8 }}
        source={`https://www.weatherbit.io/static/img/icons/${
          weatherCodeToString[weathercode]?.icon ?? ''
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
        {Math.round(temperature_2m)}°
      </Text>
    </VStack>
  );
};

export default memo(WeatherHorizontalTime);
