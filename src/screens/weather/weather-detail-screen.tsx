import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
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
import { Alert, Dimensions } from 'react-native';
import type { Location } from 'react-native-location';
import RNLocation from 'react-native-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useWeather } from '@/core/weather';
import AppLoader from '@/ui/components/AppLoader';

import type { LocationAddress } from '../maps-views/model/location-address-model';
import WeatherTodayCell from './components/weather-today-cell';
import WeatherWeekCell from './components/weather-week-cell';
import type { ForecastModel } from './models/weather-forecast-models';
import weatherCodeToString from './weather-icons';
import { DetailType } from './weather-single-detail';

// import relativeTime from 'dayjs/plugin/relativeTime';

//dayjs.extend(relativeTime);
const WeatherDetailScreen = () => {
  const nav = useNavigation();
  const setLocationData = useWeather.use.setLocation();
  const weatherReportTest = useWeather.use.weatherReport();
  const [weatherReport, setWeatherReport] = useState<ForecastModel | undefined>(
    weatherReportTest
  );
  const [currentAddress, setCurrentAddress] = useState<
    LocationAddress | undefined
  >();
  const farmName = useWeather.use.farmName();
  const [initLoading, setInitLoading] = useState<boolean>(true);

  const onWeatherDetail = (title: string) => {
    console.log('ROute', title);
    nav.navigate('WeatherSingleDetail', {
      title: title,
    });
  };
  // request location permission
  function reQuestPermission() {
    console.log('START REQUEST');

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    })
      .then((granted) => {
        if (granted) {
          requestCurrentLocation();
        } else {
          setInitLoading(false);
          Alert.alert('Warning', 'Permission not granted.');
        }
      })
      // eslint-disable-next-line handle-callback-err
      .catch((err) => {
        Alert.alert('Warning', 'Permission request fail.');
        setInitLoading(false);
      });
  }

  function requestCurrentLocation() {
    RNLocation.configure({
      distanceFilter: undefined, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'highAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 10000, // Milliseconds
      // iOS Only
      activityType: 'other',

      headingFilter: 1, // Degrees
      headingOrientation: 'portrait',
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: true,
    });
    RNLocation.getLatestLocation({ timeout: 40000 }).then(
      (latestLocation: Location | null) => {
        if (
          latestLocation &&
          latestLocation != null &&
          latestLocation?.latitude &&
          latestLocation?.longitude
        ) {
          console.log('Location found');
          setLocationData(latestLocation);
          onWeatherForecast(
            latestLocation?.latitude,
            latestLocation?.longitude
          );
        } else {
          setInitLoading(false);
          Alert.alert('Warning', 'Not able find your current location');
        }
      }
    );
  }

  const onWeatherForecast = (lat: number, lng: number) => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,rain,weathercode,windspeed_10m,uv_index,is_day,temperature_1000hPa,temperature_700hPa,relativehumidity_1000hPa,relativehumidity_700hPa,cloudcover_1000hPa,cloudcover_700hPa,windspeed_1000hPa,winddirection_1000hPa&daily=weathercode,rain_sum,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=auto`
      )
      .then((resp) => {
        setInitLoading(false);
        if (resp.data && (resp.data as ForecastModel)) {
          let response = resp.data as ForecastModel;
          setWeatherReport(response);
          findLocation(lat, lng);
        } else {
          setInitLoading(false);
          console.log('Not found');
        }
      })
      .catch((e) => {
        setInitLoading(false);
        console.log('Not found Error ===> ', e);
      });
  };

  const findLocation = (lat: number, lng: number) => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      )
      .then((resp) => {
        if (resp.data && (resp.data as LocationAddress)) {
          let response = resp.data as LocationAddress;
          setCurrentAddress(response);
        } else {
          console.log('Address Not found');
        }
      })
      .catch((e) => {
        console.log('Address Not found Error ===> ', e);
      });
  };

  useEffect(() => {
    if (weatherReport) {
      setTimeout(() => {
        setInitLoading(false);
      }, 10);
    } else {
      reQuestPermission();
    }
  }, []);

  return (
    <View flex={1}>
      {!initLoading ? (
        <>
          <Image
            alt=""
            position={'absolute'}
            left={0}
            minH={Dimensions.get('screen').height}
            w={Dimensions.get('screen').width}
            right={0}
            top={0}
            bottom={0}
            source={require('@assets/weather_bg.png')}
            resizeMode="cover"
          />
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
                      {farmName && farmName !== ''
                        ? farmName
                        : currentAddress?.address?.state_district ??
                          currentAddress?.address?.city_district ??
                          ''}
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
                return (
                  <WeatherTodayCell
                    bgColor={'rgba(256,256,256,0.4)'}
                    weatherReport={weatherReport}
                  />
                );
              } else if (index === 2 && weatherReport) {
                return (
                  <WeatherWeekCell
                    bgColor={'rgba(256,256,256,0.4)'}
                    weatherReport={weatherReport}
                  />
                );
              } else if (index === 3) {
                return (
                  <HStack
                    bgColor={'rgba(256,256,256,0.4)'}
                    mx={5}
                    mt={5}
                    justifyContent={'center'}
                    overflow={'hidden'}
                    py={3}
                    borderRadius={10}
                  >
                    {[
                      {
                        name: DetailType.Pressure,
                        img: require('@assets/pressure.png'),
                      },
                      {
                        name: DetailType.Humidity,
                        img: require('@assets/humidity.png'),
                      },
                      {
                        name: DetailType.Clouds,
                        img: require('@assets/clouds.png'),
                      },
                      {
                        name: DetailType.Wind,
                        img: require('@assets/wind_speed.png'),
                      },
                      {
                        name: DetailType.Light,
                        img: require('@assets/light_intensity.png'),
                      },
                    ].map((v, indexS) => {
                      return (
                        <Pressable
                          key={`${indexS}`}
                          flex={0.19}
                          mx={1.5}
                          onPress={() => onWeatherDetail(v.name)}
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
                              <Image
                                alt=""
                                w={6}
                                h={6}
                                source={v.img}
                                resizeMode="contain"
                              />
                              {/* <Icon
                                as={
                                  DetailType.Pressure === v.name
                                    ? FontAwesome5
                                    : DetailType.Humidity === v.name ||
                                      DetailType.Clouds === v.name
                                    ? MaterialCommunityIcons
                                    : DetailType.Wind === v.name
                                    ? FontAwesome5
                                    : MaterialIcons
                                }
                                name={
                                  DetailType.Pressure === v.name
                                    ? 'temperature-high'
                                    : DetailType.Humidity === v.name
                                    ? 'air-humidifier'
                                    : DetailType.Clouds === v.name
                                    ? 'cloud'
                                    : DetailType.Wind === v.name
                                    ? 'wind'
                                    : 'wb-twighlight'
                                }
                                size={'lg'}
                                color={'white'}
                              /> */}
                            </View>
                            <Text
                              color={'white'}
                              fontFamily={'heading'}
                              fontSize={10}
                              textAlign={'center'}
                              fontWeight={'200'}
                            >
                              {v.name}
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
                    backgroundColor={'white'}
                    onPress={() => nav.navigate('WeatherChangesScreen')}
                    borderRadius={8}
                    width={'80%'}
                    mt={30}
                    fontWeight={'bold'}
                    fontSize={20}
                    overflow={'hidden'}
                    alignSelf={'center'}
                    _text={{
                      color: '#0058b1',
                    }}
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
