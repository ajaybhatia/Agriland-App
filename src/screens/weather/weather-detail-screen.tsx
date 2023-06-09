import { useNavigation } from '@react-navigation/native';
import {
  Button,
  FlatList,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useWeather } from '@/core/weather';
import AppLoader from '@/ui/components/AppLoader';
import colors from '@/ui/theme/colors';

import WeatherTodayCell from './components/weather-today-cell';
import WeatherWeekCell from './components/weather-week-cell';
import weatherCodeToString from './weather-icons';
import { DetailType } from './weather-single-detail';

// import relativeTime from 'dayjs/plugin/relativeTime';

//dayjs.extend(relativeTime);
const WeatherDetailScreen = () => {
  const nav = useNavigation();
  const weatherReport = useWeather.use.weatherReport();
  const farmName = useWeather.use.farmName();
  const [initLoading, setInitLoading] = useState<boolean>(true);

  const onWeatherDetail = (title: string) => {
    console.log('ROute', title);
    nav.navigate('WeatherSingleDetail', {
      title: title,
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setInitLoading(false);
    }, 10);
  }, []);

  return (
    <View flex={1}>
      {!initLoading ? (
        <>
          <View
            flex={1}
            position={'absolute'}
            left={0}
            right={0}
            top={0}
            bottom={0}
          >
            <Image
              alt=""
              flex={1}
              source={require('@assets/weather_bg.png')}
              resizeMode="cover"
            />
          </View>
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={[1, 2, 3, 4, 5]}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item, index }: { item: number; index: number }) => {
              if (index === 0) {
                return (
                  <VStack alignItems={'center'} mt={10}>
                    <Text
                      fontFamily={'heading'}
                      fontSize={'xl'}
                      fontWeight={'700'}
                      color={'white'}
                    >
                      {farmName}
                    </Text>
                    {weatherReport && weatherReport.current_weather && (
                      <Text
                        fontFamily={'heading'}
                        fontSize={'6xl'}
                        fontWeight={'700'}
                        color={'white'}
                      >
                        {Math.round(weatherReport.current_weather.temperature)}°
                      </Text>
                    )}
                    {weatherReport && weatherReport.current_weather && (
                      <Text
                        fontFamily={'heading'}
                        fontSize={'xs'}
                        fontWeight={'500'}
                        color={'white'}
                      >
                        {weatherCodeToString[
                          weatherReport.current_weather?.weathercode ?? 0
                        ]?.label ?? ''}
                      </Text>
                    )}
                  </VStack>
                );
              } else if (index === 1 && weatherReport) {
                return <WeatherTodayCell weatherReport={weatherReport} />;
              } else if (index === 2 && weatherReport) {
                return <WeatherWeekCell weatherReport={weatherReport} />;
              } else if (index === 3) {
                return (
                  <HStack
                    bgColor={'rgba(0,0,0,0.5)'}
                    mx={5}
                    mt={5}
                    justifyContent={'center'}
                    overflow={'hidden'}
                    py={3}
                    borderRadius={10}
                  >
                    {[
                      DetailType.Pressure,
                      DetailType.Humidity,
                      DetailType.Clouds,
                      DetailType.Wind,
                      DetailType.Light,
                    ].map((v, indexS) => {
                      return (
                        <Pressable
                          key={`${indexS}`}
                          flex={0.19}
                          mx={1.5}
                          onPress={() => onWeatherDetail(v)}
                        >
                          <VStack alignItems={'center'}>
                            <View
                              borderColor={'rgb(256,256,256)'}
                              borderWidth={1}
                              h={10}
                              w={10}
                              alignItems={'center'}
                              justifyContent={'center'}
                              overflow={'hidden'}
                              borderRadius={10}
                            >
                              {/* <Image
                        alt=""
                        flex={1}
                        source={require('@assets/weather_bg.png')}
                        resizeMode="cover"
                      /> */}
                              <Icon
                                as={
                                  DetailType.Pressure === v
                                    ? FontAwesome5
                                    : DetailType.Humidity === v ||
                                      DetailType.Clouds === v
                                    ? MaterialCommunityIcons
                                    : DetailType.Wind === v
                                    ? FontAwesome5
                                    : MaterialIcons
                                }
                                name={
                                  DetailType.Pressure === v
                                    ? 'temperature-high'
                                    : DetailType.Humidity === v
                                    ? 'air-humidifier'
                                    : DetailType.Clouds === v
                                    ? 'cloud'
                                    : DetailType.Wind === v
                                    ? 'wind'
                                    : 'wb-twighlight'
                                }
                                size={'lg'}
                                color={'white'}
                              />
                            </View>
                            <Text
                              color={'white'}
                              fontFamily={'heading'}
                              fontSize={10}
                              textAlign={'center'}
                              fontWeight={'200'}
                            >
                              {v}
                            </Text>
                          </VStack>
                        </Pressable>
                      );
                    })}
                  </HStack>
                );
              } else if (index === 4) {
                return (
                  <Button
                    backgroundColor={colors.button_color}
                    onPress={() => nav.navigate('WeatherChangesScreen')}
                    borderRadius={8}
                    width={'80%'}
                    mt={30}
                    fontWeight={'normal'}
                    fontSize={20}
                    overflow={'hidden'}
                    alignSelf={'center'}
                  >
                    {'View Details'}
                  </Button>
                );
              } else {
                return <View />;
              }
            }}
            //estimatedItemSize={300}
          />

          <Pressable
            position={'absolute'}
            onPress={() => nav.goBack()}
            left={2}
            top={2}
            p={5}
          >
            <Icon
              as={MaterialCommunityIcons}
              name={'arrow-u-right-top'}
              size={'lg'}
              color={'white'}
            />
          </Pressable>
        </>
      ) : (
        <AppLoader />
      )}
    </View>
  );

  //return <View flex={1} background={'amber.500'} />;
};

export default WeatherDetailScreen;
