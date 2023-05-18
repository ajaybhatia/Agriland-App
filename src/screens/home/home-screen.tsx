import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import axios from 'axios';
import { FlatList, Image, View, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useGetApiFarmGetFarms } from '@/apis/endpoints/api';
import type { FarmResponse } from '@/apis/model';
import { useWeather } from '@/core/weather';
import ListHeader from '@/ui/components/ListHeader';
import colors from '@/ui/theme/colors';

import FarmAddCell from '../crop/components/farm-add-cell';
import FarmMapSelectionCell from '../crop/components/farm-map-selection-cell';
import type { LocationAddress } from '../maps-views/model/location-address-model';
import type { ForecastModel } from '../weather/models/weather-forecast-models';
import CompleteProfileCell from './components/complete-profile-cell';
import CropHomeCell from './components/crops-home-cell';
import TaskActivitesCell from './components/task-activites-cell';
import WeatherCell from './components/weather-cell';

function HomeScreen() {
  const setData = useWeather.use.setData();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const nav = useNavigation();
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<FarmResponse | undefined>();
  const [weatherReport, setWeatherReport] = useState<
    ForecastModel | undefined
  >();
  const [currentAddress, setCurrentAddress] = useState<
    LocationAddress | undefined
  >();
  const [moreFarmInfo, setMoreFarmInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });

  // get Farm APis

  const getFarms = useGetApiFarmGetFarms(
    {
      // skip: moreFarmInfo.skip,
      // take: moreFarmInfo.take,
    },
    {
      query: {
        onSuccess: (data: FarmResponse[]) => {
          console.log('\n\n\ndata ===> ', data.length, '\n\n\n');
          if (data.length > 0) {
            setFarms(moreFarmInfo.skip <= 0 ? data : [...farms, ...data]);
            if (selectedFarm === undefined && data.length > 0) {
              setSelectedFarm(data[0]);
              if (data[0].coordinates && data[0].coordinates?.length > 0) {
                onWeatherForecast(
                  data[0].coordinates[0]?.lat ?? 0.0,
                  data[0].coordinates[0]?.lng ?? 0.0
                );
              }
            }
          }
        },
      },
    }
  );

  const onWeatherForecast = (lat: number, lng: number) => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,rain,weathercode,windspeed_10m,uv_index,is_day,temperature_1000hPa,temperature_700hPa,relativehumidity_1000hPa,relativehumidity_700hPa,cloudcover_1000hPa,cloudcover_700hPa,windspeed_1000hPa,winddirection_1000hPa&daily=weathercode,rain_sum,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=auto`
      )
      .then((resp) => {
        if (resp.data && (resp.data as ForecastModel)) {
          let response = resp.data as ForecastModel;
          console.log(response.current_weather);
          setWeatherReport(response);
          findLocation(lat, lng);
        } else {
          console.log('Not found');
        }
      })
      .catch((e) => {
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

  const onNotificationDetail = () => {
    nav.navigate('NotificationsDetails');
  };

  const onSelectFarm = (item: FarmResponse) => {
    setSelectedFarm(item);
    if (item.coordinates && item.coordinates.length > 0) {
      onWeatherForecast(
        item.coordinates[0]?.lat ?? 0.0,
        item.coordinates[0]?.lng ?? 0.0
      );
    }
  };

  const addNewFarm = useCallback(() => nav.navigate('AddFarmHomeScreen'), []);
  const onSeeWeatherDDetail = useCallback(() => {
    if (weatherReport && currentAddress && selectedFarm) {
      setData(
        weatherReport,
        selectedFarm?.name ?? '',
        currentAddress,
        selectedFarm
      );
      nav.navigate('WeatherDetailScreen');
    }
  }, [weatherReport, currentAddress, selectedFarm, nav, setData]);
  return (
    <View flex={1} backgroundColor={'white'}>
      <FlatList
        data={[1, 2]}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }: { item: number; index: number }) => {
          if (index === 0) {
            return (
              <VStack mt={2} pb={5}>
                <FlatList
                  horizontal
                  initialNumToRender={3}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                      useNativeDriver: false,
                    }
                  )}
                  extraData={farms.length || selectedFarm}
                  keyExtractor={(item, index) => `${index}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={farms}
                  ListHeaderComponent={
                    <FarmAddCell onPreviousSubmit={addNewFarm} />
                  }
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: FarmResponse;
                    index: number;
                  }) => (
                    <FarmMapSelectionCell
                      item={item}
                      selectedItem={selectedFarm}
                      onSelectFarm={onSelectFarm}
                    />
                  )}
                  //estimatedItemSize={300}
                />
                <ExpandingDot
                  data={farms}
                  expandingDotWidth={8}
                  scrollX={scrollX}
                  inActiveDotOpacity={0.3}
                  dotStyle={styles.dotStyle}
                  activeDotColor={colors.button_color}
                  containerStyle={{
                    bottom: 0,
                  }}
                />
              </VStack>
            );
          } else if (
            index === 1 &&
            weatherReport &&
            weatherReport.current_weather
          ) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Weather"
                  ml={5}
                  mr={5}
                  btnTitle="See All"
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                  onRightIconClick={onSeeWeatherDDetail}
                />
                <WeatherCell
                  currentWeather={weatherReport}
                  farmName={selectedFarm?.name ?? ''}
                  locationAddress={currentAddress}
                />
              </VStack>
            );
          } else if (index === 2) {
            return (
              <VStack mt={2} height={120}>
                <FlashList
                  horizontal
                  estimatedItemSize={120}
                  extraData={selectedFarm}
                  keyExtractor={(item, index) => `${index}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={[1, 2, 3, 4]}
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: number;
                    index: number;
                  }) => <CropHomeCell />}
                />
              </VStack>
            );
          } else if (index === 3) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="You Have 3 Notifications "
                  ml={5}
                  mr={5}
                  numberOfLines={1}
                  color={colors.TITLE_COLOR}
                  fontSize={14}
                  btnTitle="See All"
                  iconLeftName="notifications"
                  asLeft={MaterialIcons}
                  iconLeftSize={'lg'}
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                  onRightIconClick={onNotificationDetail}
                />
              </VStack>
            );
          } else if (index === 4) {
            return <CompleteProfileCell />;
          } else if (index === 5) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Tasks"
                  ml={5}
                  mr={5}
                  isSeeAllShow={false}
                  btnTitle="See All"
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                />
                <TaskActivitesCell />
              </VStack>
            );
          } else if (index === 6) {
            return (
              <VStack
                mt={3}
                backgroundColor={'amber.400'}
                mx={5}
                borderRadius={10}
                overflow={'hidden'}
              >
                <Image
                  alt=""
                  resizeMode="contain"
                  h={150}
                  flex={1}
                  source={require('@assets/app-logo.png')}
                />
              </VStack>
            );
          } else if (index === 6) {
            return (
              <VStack
                mt={3}
                backgroundColor={'amber.400'}
                mx={5}
                borderRadius={10}
                overflow={'hidden'}
              >
                <Image
                  alt=""
                  resizeMode="contain"
                  h={150}
                  flex={1}
                  source={require('@assets/app-logo.png')}
                />
              </VStack>
            );
          }
          return <View />;
        }}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  dotStyle: {
    width: 8,
    height: 8,
    backgroundColor: colors.button_color,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
