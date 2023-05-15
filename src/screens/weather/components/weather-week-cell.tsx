import { HStack, Image, Text, VStack } from 'native-base';
import * as React from 'react';

const WeatherWeekCell = () => {
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
        <Image
          alt=""
          h={8}
          w={8}
          source={require('@assets/weather-icon/1.png')}
          resizeMode="cover"
        />

        <Image
          alt=""
          h={8}
          w={8}
          source={require('@assets/weather-icon/1.png')}
          resizeMode="cover"
        />
        <Image
          alt=""
          h={8}
          w={8}
          source={require('@assets/weather-icon/1.png')}
          resizeMode="cover"
        />
      </HStack>
      {[
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        "'Sunday",
      ].map((day, index) => {
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
              {day}
            </Text>
            <Text
              flex={0.22}
              color={'white'}
              fontFamily={'heading'}
              fontSize={12}
              fontWeight={'500'}
            >
              30%
            </Text>
            <Text
              flex={0.22}
              color={'white'}
              fontFamily={'heading'}
              fontSize={12}
              fontWeight={'500'}
            >
              0mm
            </Text>
            <Text
              flex={0.22}
              color={'white'}
              fontFamily={'heading'}
              fontSize={12}
              fontWeight={'500'}
            >
              500Km/h
            </Text>
          </HStack>
        );
      })}
    </VStack>
  );
};
export default WeatherWeekCell;
