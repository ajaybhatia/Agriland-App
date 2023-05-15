import { HStack, Image, ScrollView, Text, View, VStack } from 'native-base';
import * as React from 'react';

const WeatherTodayCell = () => {
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
          <Image
            alt=""
            h={8}
            w={8}
            source={require('@assets/weather-icon/1.png')}
            resizeMode="cover"
          />
          <Text
            color={'white'}
            fontFamily={'heading'}
            fontSize={12}
            fontWeight={'400'}
          >
            7Km/h
          </Text>
        </VStack>

        <VStack alignItems={'center'} justifyContent={'center'}>
          <Image
            alt=""
            h={8}
            w={8}
            source={require('@assets/weather-icon/1.png')}
            resizeMode="cover"
          />
          <Text
            color={'white'}
            fontFamily={'heading'}
            fontSize={12}
            fontWeight={'400'}
          >
            0mm
          </Text>
        </VStack>

        <VStack alignItems={'center'} justifyContent={'center'}>
          <Image
            alt=""
            h={8}
            w={8}
            source={require('@assets/weather-icon/1.png')}
            resizeMode="cover"
          />
          <Text
            color={'white'}
            fontFamily={'heading'}
            fontSize={12}
            fontWeight={'400'}
          >
            60%
          </Text>
        </VStack>
      </HStack>
      <View h={0.3} mb={2} bgColor={'white'} w={'100%'} />
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <HStack p={3}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v, index) => {
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
                  now
                </Text>
                <Image
                  my={3}
                  alt=""
                  h={5}
                  w={5}
                  source={require('@assets/weather-icon/1.png')}
                  resizeMode="cover"
                />
                <Text
                  color={'white'}
                  fontFamily={'heading'}
                  fontSize={12}
                  fontWeight={'400'}
                >
                  22°
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
