import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { Image as ImageRemote } from 'expo-image';
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
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useWeather } from '@/core/weather';
import colors from '@/ui/theme/colors';

import weatherCodeToString from './weather-icons';
import { DetailType } from './weather-single-detail';

// import relativeTime from 'dayjs/plugin/relativeTime';

//dayjs.extend(relativeTime);
const WeatherDetailScreen = () => {
  const nav = useNavigation();
  const weatherReport = useWeather.use.weatherReport();
  const farmName = useWeather.use.farmName();

  const onWeatherDetail = (title: string) => {
    console.log('ROute', title);
    nav.navigate('WeatherSingleDetail', {
      title: title,
    });
  };

  let indexV = weatherReport
    ? weatherReport.hourly.time.findIndex((v) =>
        dayjs(v)
          .startOf('hour')
          .utc(true)
          .isSame(
            dayjs(weatherReport.current_weather.time).startOf('hour').utc(true)
          )
      )
    : -1;

  let indexWeather = weatherReport
    ? weatherReport.hourly.time.findIndex((v) => {
        return dayjs(v)
          .startOf('hour')
          .utc(true)
          .isSame(dayjs().startOf('hour').utc(true));
      })
    : -1;

  return (
    <View flex={1}>
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
          } else if (index === 1) {
            return (
              <VStack
                bgColor={'rgba(0,0,0,0.5)'}
                mt={2}
                mx={5}
                overflow={'hidden'}
                borderRadius={10}
              >
                <HStack justifyContent={'space-between'} p={3}>
                  <VStack alignItems={'center'} justifyContent={'center'}>
                    {/* <Image
                  alt=""
                  h={8}
                  w={8}
                  source={require('@assets/weather-icon/1.png')}
                  resizeMode="cover"
                /> */}
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
                      {weatherReport &&
                        Math.round(weatherReport.current_weather.windspeed)}
                      Km/h
                    </Text>
                  </VStack>

                  <VStack alignItems={'center'} justifyContent={'center'}>
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
                    <Text
                      color={'white'}
                      fontFamily={'heading'}
                      fontSize={12}
                      fontWeight={'400'}
                    >
                      {weatherReport &&
                        Math.round(
                          indexV >= 0 && weatherReport.hourly.rain.length > 0
                            ? weatherReport.hourly.rain[indexV]
                            : 0
                        )}
                      mm
                    </Text>
                  </VStack>

                  <VStack alignItems={'center'} justifyContent={'center'}>
                    {/* <Image
                  alt=""
                  h={8}
                  w={8}
                  source={require('@assets/weather-icon/1.png')}
                  resizeMode="cover"
                /> */}
                    <Icon
                      as={Entypo}
                      name={'drop'}
                      size={'lg'}
                      color={'blue.700'}
                    />
                    <Text
                      color={'white'}
                      fontFamily={'heading'}
                      fontSize={12}
                      fontWeight={'400'}
                    >
                      {weatherReport &&
                        Math.round(
                          indexV >= 0 &&
                            weatherReport.hourly.cloudcover_700hPa.length > 0
                            ? weatherReport.hourly.cloudcover_700hPa[indexV]
                            : 0
                        )}
                      %
                    </Text>
                  </VStack>
                </HStack>
                <View h={0.3} mb={2} bgColor={'white'} w={'100%'} />
                <HStack p={3}>
                  <FlatList
                    horizontal
                    initialNumToRender={10}
                    initialScrollIndex={indexWeather > 0 ? indexWeather : 0}
                    keyExtractor={(item, index) => `${index}`}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={weatherReport ? weatherReport.hourly.time : []}
                    renderItem={({
                      item,
                      index,
                    }: {
                      item: string;
                      index: number;
                    }) => {
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
                            {dayjs(item)
                              .startOf('hour')
                              .utc(true)
                              .format('h A')}
                          </Text>

                          {weatherReport ? (
                            <ImageRemote
                              style={{
                                height: 20,
                                width: 20,
                                marginVertical: 8,
                              }}
                              source={`https://www.weatherbit.io/static/img/icons/${
                                weatherCodeToString[
                                  weatherReport.hourly.weathercode[index]
                                ]?.icon ?? ''
                              }.png`}
                              placeholder={require('@assets/app-logo.png')}
                              contentFit="cover"
                              transition={1000}
                            />
                          ) : (
                            <Image
                              my={3}
                              alt=""
                              h={5}
                              w={5}
                              source={require('@assets/weather-icon/1.png')}
                              resizeMode="cover"
                            />
                          )}
                          <Text
                            color={'white'}
                            fontFamily={'heading'}
                            fontSize={12}
                            fontWeight={'400'}
                          >
                            {weatherReport &&
                              Math.round(
                                weatherReport.hourly.temperature_2m[index]
                              )}
                            °
                          </Text>
                        </VStack>
                      );
                    }}
                    //estimatedItemSize={300}
                  />
                </HStack>
              </VStack>
            );
          } else if (index === 2) {
            return (
              <VStack
                bgColor={'rgba(0,0,0,0.5)'}
                mx={5}
                mt={5}
                overflow={'hidden'}
                borderRadius={10}
              >
                <FlatList
                  scrollEnabled={false}
                  keyExtractor={(item, indexv) => `${indexv}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={
                    <HStack
                      justifyContent={'space-between'}
                      p={3}
                      alignItems={'center'}
                    >
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
                      <Icon
                        as={Entypo}
                        name={'drop'}
                        size={'lg'}
                        color={'blue.700'}
                      />
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
                      <Icon
                        as={FontAwesome5}
                        name={'wind'}
                        size={'lg'}
                        color={'blue.700'}
                      />
                    </HStack>
                  }
                  data={weatherReport ? weatherReport.daily.time : []}
                  renderItem={({
                    item,
                    indexv,
                  }: {
                    item: string;
                    indexv: number;
                  }) => {
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
                        <Text
                          flex={0.35}
                          color={'white'}
                          fontFamily={'heading'}
                          fontSize={14}
                          fontWeight={'500'}
                        >
                          {dayjs(item).utc(true).format('dddd')}
                        </Text>
                        <Text
                          flex={0.22}
                          color={'white'}
                          fontFamily={'heading'}
                          fontSize={12}
                          fontWeight={'500'}
                        >
                          {Math.round(
                            weatherReport
                              ? weatherReport.daily
                                  ?.precipitation_probability_max[index] ?? 0
                              : 0
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
                          {Math.round(
                            weatherReport
                              ? weatherReport.daily?.rain_sum[index] ?? 0
                              : 0
                          )}
                          mm
                        </Text>
                        <Text
                          flex={0.22}
                          color={'white'}
                          fontFamily={'heading'}
                          fontSize={12}
                          fontWeight={'500'}
                        >
                          {Math.round(
                            weatherReport
                              ? weatherReport.daily?.windspeed_10m_max[index] ??
                                  0
                              : 0
                          )}
                          Km/h
                        </Text>
                      </HStack>
                    );
                  }}
                  //estimatedItemSize={300}
                />
              </VStack>
            );
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
                      <VStack>
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
    </View>
  );

  //return <View flex={1} background={'amber.500'} />;
};

export default WeatherDetailScreen;
