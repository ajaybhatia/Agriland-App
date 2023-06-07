import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import axios from 'axios';
import { Image as ImageBase } from 'expo-image';
import { FlatList, View, VStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  useGetApiFarmGetFarms,
  usePutApiAccountUpdatefcmtoken,
} from '@/apis/endpoints/api';
import { useGetApiAdBannerGetAdBanners } from '@/apis/endpoints/api';
import type { AdBannerResponse, FarmResponse } from '@/apis/model';
import { useWeather } from '@/core/weather';
import ListHeader from '@/ui/components/ListHeader';
import colors from '@/ui/theme/colors';

import FarmAddCell from '../crop/components/farm-add-cell';
import FarmMapSelectionCell from '../crop/components/farm-map-selection-cell';
import type { LocationAddress } from '../maps-views/model/location-address-model';
import type { ForecastModel } from '../weather/models/weather-forecast-models';
import CompleteProfileCell from './components/complete-profile-cell';
import CropHomeCell from './components/crops-home-cell';
import type { DropDownCellType } from './components/dropdown-item-cell';
import DropDownIteCell from './components/dropdown-item-cell';
import TaskActivitesCell from './components/task-activites-cell';
import WeatherCell from './components/weather-cell';

function HomeScreen() {
  const setData = useWeather.use.setData();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const nav = useNavigation();
  const putToken = usePutApiAccountUpdatefcmtoken();
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<FarmResponse | undefined>();
  const [weatherReport, setWeatherReport] = useState<
    ForecastModel | undefined
  >();
  const [currentAddress, setCurrentAddress] = useState<
    LocationAddress | undefined
  >();
  const [isShowSheets, setShowSheets] = useState<{
    isShow: boolean;
    index: number;
  }>({ index: 0, isShow: false });
  const [moreFarmInfo, setMoreFarmInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });

  useEffect(() => {
    const getToken = async () => {
      // Register the device with FCM
      await messaging().registerDeviceForRemoteMessages();

      // Get the token
      const token = await messaging().getToken();
      console.log('token ==> ', token);
      putToken.mutate({
        params: {
          fcmToken: token,
        },
      });
    };

    getToken();
  }, []);

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

  const getAdBanners = useGetApiAdBannerGetAdBanners();
  const onWeatherForecast = (lat: number, lng: number) => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,rain,weathercode,windspeed_10m,uv_index,is_day,temperature_1000hPa,temperature_700hPa,relativehumidity_1000hPa,relativehumidity_700hPa,cloudcover_1000hPa,cloudcover_700hPa,windspeed_1000hPa,winddirection_1000hPa&daily=weathercode,rain_sum,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=auto`
      )
      .then((resp) => {
        if (resp.data && (resp.data as ForecastModel)) {
          let response = resp.data as ForecastModel;
          console.log('onWeatherForecast ===> ', response.current_weather);
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
          console.log('Address Found ===> ', response.address);
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

  const onSelectFarm = useCallback(
    (item: FarmResponse) => {
      setSelectedFarm(item);
      if (item.coordinates && item.coordinates.length > 0) {
        onWeatherForecast(
          item.coordinates[0]?.lat ?? 0.0,
          item.coordinates[0]?.lng ?? 0.0
        );
      }
    },
    [setSelectedFarm]
  );

  const onShowBottomSheet = useCallback(
    (isShowItem: boolean, index: number) => {
      setShowSheets({ index: index, isShow: isShowItem });
    },
    [setShowSheets]
  );

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
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
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
                  keyExtractor={(item, indexV) => `${indexV}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={farms}
                  ListHeaderComponent={
                    <FarmAddCell onPreviousSubmit={addNewFarm} />
                  }
                  renderItem={({ item: farm }: { item: FarmResponse }) => (
                    <FarmMapSelectionCell
                      item={farm}
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
          } else if (
            index === 6 &&
            getAdBanners.data?.adBannerResponses &&
            getAdBanners.data?.adBannerResponses.filter((v) => v.isActive)
              ?.length > 0
          ) {
            return (
              <VStack>
                <FlatList
                  horizontal
                  pagingEnabled
                  initialNumToRender={3}
                  keyExtractor={(item, indexV) => `${indexV}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  // contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={getAdBanners.data?.adBannerResponses.filter(
                    (v) => v.isActive
                  )}
                  renderItem={({ item: ads }: { item: AdBannerResponse }) => {
                    return (
                      <VStack mt={3} mb={2} w={Dimensions.get('screen').width}>
                        <VStack
                          mx={3}
                          shadow={1}
                          borderRadius={10}
                          overflow={'hidden'}
                        >
                          <ImageBase
                            style={{ height: 150, flex: 1 }}
                            source={`http://95.111.231.114:88${ads.imageUrl}`}
                            // source={ads.imageUrl}
                            placeholder={require('@assets/app-logo.png')}
                            contentFit="contain"
                            transition={1000}
                          />
                        </VStack>
                      </VStack>
                    );
                  }}
                  //estimatedItemSize={300}
                />
              </VStack>
            );
          } else if (index === 7) {
            const items: DropDownCellType[] = [
              {
                title: 'Crop coding',
                color: '#f5b794',
                icon: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
              },
              {
                title: 'Reserve stations',
                color: '#ed9393',
                icon: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
              },
              {
                title: 'Tests',
                color: '#1ebdc3',
                icon: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
              },
            ];
            return (
              <VStack mt={3} mx={3}>
                <DropDownIteCell
                  title="Services"
                  items={items}
                  index={index}
                  isShow={isShowSheets.isShow && index === isShowSheets.index}
                  onShow={onShowBottomSheet}
                />
              </VStack>
            );
          } else if (index === 8) {
            const items: DropDownCellType[] = [
              {
                title: 'Production Supplies',
                color: '#f5b794',
                icon: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
              },
              {
                title: 'Crop Marketing',
                color: '#ed9393',
                icon: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
              },
              {
                title: 'Crop Loan',
                color: '#1ebdc3',
                icon: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
              },
            ];
            return (
              <VStack mt={3} mx={3}>
                <DropDownIteCell
                  title="Agriculture market"
                  items={items}
                  index={index}
                  isShow={isShowSheets.isShow && index === isShowSheets.index}
                  onShow={onShowBottomSheet}
                />
              </VStack>
            );
          } else if (index === 9) {
            const items: DropDownCellType[] = [
              {
                title: 'Weather Changes',
                color: '#f5b794',
                icon: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
              },
              {
                title: 'Social Media',
                color: '#ed9393',
                icon: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
              },
              {
                title: 'Satelite Data',
                color: '#1ebdc3',
                icon: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
              },
            ];
            return (
              <VStack mt={3} mx={3}>
                <DropDownIteCell
                  title="Information center"
                  items={items}
                  index={index}
                  isShow={isShowSheets.isShow && index === isShowSheets.index}
                  onShow={onShowBottomSheet}
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
