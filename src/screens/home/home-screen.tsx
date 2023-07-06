/* eslint-disable react-native/no-inline-styles */
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import dayjs from 'dayjs';
import { Image as ImageBase } from 'expo-image';
import { FlatList, View, VStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, I18nManager } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  useGetApiAccountFetchUserBasicDetails,
  useGetApiCropGetCultivationDetailsByFarmId,
  useGetApiNotificationGetallunreadnotification,
  usePutApiAccountUpdatefcmtoken,
} from '@/apis/endpoints/api';
import { useGetApiAdBannerGetAdBanners } from '@/apis/endpoints/api';
import type {
  AdBannerResponse,
  CultivationDetailResponse,
  FarmCropCultivationResponse,
  FarmerDetails,
  FarmResponse,
} from '@/apis/model';
import { setUserNameAuth, useAuth } from '@/core';
import { useWeather } from '@/core/weather';
import CardWithShadow from '@/ui/components/CardWithShadow';
import ListHeader from '@/ui/components/ListHeader';
import type { DataValues } from '@/ui/components/step-indicator/StepIndicator';
import colors from '@/ui/theme/colors';

import CropRegisterCell from '../crop/components/crop-register-cell';
import type { LocationAddress } from '../maps-views/model/location-address-model';
import type { ForecastModel } from '../weather/models/weather-forecast-models';
import CompleteProfileCell from './components/complete-profile-cell';
import CropHomeCell from './components/crops-home-cell';
import type { DropDownCellType } from './components/dropdown-item-cell';
import DropDownIteCell from './components/dropdown-item-cell';
import FarmerListCell from './components/farmer-list-cell';
import TaskActivitesCell from './components/task-activites-cell';
import WeatherCell from './components/weather-cell';

function HomeScreen() {
  const setData = useWeather.use.setData();
  const clearWeatherData = useWeather.use.clearData();
  const userInfoo = useAuth.use.userInfos();
  const nav = useNavigation();
  const putToken = usePutApiAccountUpdatefcmtoken();
  const [selectedFarm, setSelectedFarm] = useState<FarmResponse | undefined>();
  const [selectedCrop, setSelectedCrop] = useState<
    CultivationDetailResponse | undefined
  >();
  const [weatherReport, setWeatherReport] = useState<
    ForecastModel | undefined
  >();
  const [currentAddress, setCurrentAddress] = useState<
    LocationAddress | undefined
  >();
  const [tasks] = useState<DataValues[]>([]);
  const [isShowSheets, setShowSheets] = useState<{
    isShow: boolean;
    index: number;
  }>({ index: 0, isShow: false });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // tasks
  // const getCalActivityTasks = useGetApiCropGetcropactivitiesbyfarmid(
  //   {
  //     farmid: selectedFarm?.id ?? '', //'0737bac5-b1a5-453b-a012-afa37fccb199', //
  //     cropid: selectedCrop?.cropDetails?.id ?? '',
  //     noOfDays: 7,
  //   },
  //   {
  //     query: {
  //       enabled: selectedFarm !== undefined,
  //       onSuccess(data: ActivityDetails) {
  //         if (data && data.calendarActivities) {
  //           var mainTempTask: DataValues[] = [];
  //           let mainTask: DataValues[] = data.calendarActivities.map((x) => {
  //             let obj: DataValues = {
  //               title: x?.activityDate ?? '',
  //               subTitle: x?.activityDate ?? '',
  //               list: [x],
  //             };
  //             let index = mainTempTask.findIndex((y) =>
  //               dayjs(y.title)
  //                 .startOf('day')
  //                 .isSame(dayjs(x.activityDate).startOf('day'))
  //             );
  //             if (index >= 0) {
  //               let itemList = mainTempTask[index].list;
  //               mainTempTask[index].list = [...itemList, x];
  //             } else {
  //               mainTempTask = [...mainTempTask, obj];
  //             }
  //             return obj;
  //           });

  //           setTasks(mainTempTask);
  //         }
  //       },
  //     },
  //   }
  // );

  // userInfo
  useGetApiAccountFetchUserBasicDetails({
    query: {
      onSuccess(data: FarmerDetails) {
        console.log('useGetApiAccountFetchUserBasicDetails ==> ', data);

        if (data && data?.displayName && data?.emailId && data?.mobileNumber) {
          setUserNameAuth(data);
        }
      },
    },
  });
  // get crops by farmId
  console.log(selectedFarm?.id ?? '');
  const getCrops = useGetApiCropGetCultivationDetailsByFarmId(
    {
      farmId: selectedFarm?.id ?? '',
    },
    {
      query: {
        enabled: selectedFarm !== undefined,
        onSuccess: (data: FarmCropCultivationResponse) => {
          if (
            data &&
            data?.cultivationDetails &&
            data?.cultivationDetails.length > 0
          ) {
            setSelectedCrop(data?.cultivationDetails[0]);
          }
        },
        onError: (err) => {
          console.log(
            'useGetApiCropGetCultivationDetailsByFarmId ==> ',
            err.message
          );
        },
      },
    }
  );

  const getAdBanners = useGetApiAdBannerGetAdBanners();

  // get unRead Notification Counts

  const getUnreadNotifications =
    useGetApiNotificationGetallunreadnotification();

  const onWeatherForecast = useCallback((lat: number, lng: number) => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,rain,weathercode,windspeed_10m,uv_index,is_day,temperature_1000hPa,temperature_700hPa,relativehumidity_1000hPa,relativehumidity_700hPa,cloudcover_1000hPa,cloudcover_700hPa,windspeed_1000hPa,winddirection_1000hPa&daily=weathercode,rain_sum,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=auto`
      )
      .then((resp) => {
        if (resp.data && (resp.data as ForecastModel)) {
          let response = resp.data as ForecastModel;
          setWeatherReport(response);
          findLocation(lat, lng);
        } else {
          console.log('Not found');
        }
      })
      .catch((e) => {
        console.log('Not found Error ===> ', e);
      });
  }, []);

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

  const onCropDetailScreen = () => {
    nav.navigate('CropDetailScreen');
  };

  const onTaskCalenderDetail = useCallback(() => {
    if (selectedFarm && selectedFarm?.id) {
      nav.navigate('TaskCalenderDetailScreen', {
        farmId: selectedFarm?.id,
      });
    }
  }, [nav, selectedFarm]);

  const onDropDownPress = useCallback(
    (title: string) => {
      if (title === 'Satellite Data') {
        if (userInfoo) {
          if (userInfoo?.farmerPlans?.endDate) {
            if (dayjs().isBefore(dayjs(userInfoo.farmerPlans?.endDate))) {
              nav.navigate('SatelliteSelectedCropsList');
              //  nav.navigate('SateLiteDemoScreen');
            } else {
              nav.navigate('SateLiteDemoScreen');
            }
          } else {
            nav.navigate('SateLiteDemoScreen');
          }
        }
        // first check subscription is active

        //nav.navigate('SateLiteDemoScreen');
      } else if (title === 'Weather Changes') {
        clearWeatherData();
        if (weatherReport && currentAddress && selectedFarm) {
          setData(
            weatherReport,
            I18nManager.isRTL
              ? selectedFarm?.name?.ar ?? ''
              : selectedFarm?.name?.en ?? '',
            currentAddress,
            selectedFarm
          );
        }
        nav.navigate('WeatherDetailScreen');
      } else if (title === 'Crop coding') {
        nav.navigate('CropCodingScreen');
      } else if (title === 'Reserve stations') {
        nav.navigate('StationBookingScreen');
      } else if (title === 'Tests') {
        nav.navigate('TestScreen');
      }
    },
    [
      clearWeatherData,
      currentAddress,
      nav,
      selectedFarm,
      setData,
      userInfoo,
      weatherReport,
    ]
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSelectedFarm]
  );

  // const farmCell = useCallback(() => {
  //   return (
  //     <FarmerListCell
  //       onSelectedFarm={onSelectFarm}
  //       selectedFarm={selectedFarm}
  //     />
  //   );
  // }, []);

  const onSelectCrop = useCallback(
    (item: CultivationDetailResponse) => {
      setSelectedCrop(item);
    },
    [setSelectedCrop]
  );

  const onShowBottomSheet = useCallback(
    (isShowItem: boolean, index: number) => {
      setShowSheets({ index: index, isShow: isShowItem });
    },
    [setShowSheets]
  );

  const onAddCrop = useCallback(() => nav.navigate('CropRegistration'), [nav]);

  const onSeeWeatherDDetail = useCallback(() => {
    if (weatherReport && currentAddress && selectedFarm) {
      setData(
        weatherReport,
        I18nManager.isRTL
          ? selectedFarm?.name?.ar ?? ''
          : selectedFarm?.name?.en ?? '',
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
        initialScrollIndex={0}
        renderItem={({ index }: { item?: number; index: number }) => {
          if (index === 0) {
            return (
              <FarmerListCell
                onSelectedFarm={onSelectFarm}
                selectedFarm={selectedFarm}
              />
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
                  farmName={
                    I18nManager.isRTL
                      ? selectedFarm?.name?.ar ?? ''
                      : selectedFarm?.name?.en ?? ''
                  }
                  locationAddress={currentAddress}
                />
              </VStack>
            );
          } else if (index === 2) {
            return (
              <VStack mt={2} height={120}>
                <FlatList
                  horizontal
                  keyExtractor={(item, vIndex) =>
                    item.fieldId?.toString() + ':' + vIndex.toString()
                  }
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={getCrops.data?.cultivationDetails ?? []}
                  ListHeaderComponent={
                    <CropRegisterCell onAddCrop={onAddCrop} />
                  }
                  renderItem={({
                    item: crop,
                  }: {
                    item: CultivationDetailResponse;
                    index?: number;
                  }) => (
                    <CropHomeCell
                      item={crop}
                      selectedItem={selectedCrop}
                      onSelect={onSelectCrop}
                      onNextScreen={onCropDetailScreen}
                    />
                  )}
                />
              </VStack>
            );
          } else if (index === 3) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title={
                    getUnreadNotifications?.data
                      ? `You Have ${
                          getUnreadNotifications?.data ?? ''
                        } Notifications `
                      : 'You Have Notifications '
                  }
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
          } else if (index === 5 && tasks.length > 0) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Tasks"
                  ml={5}
                  mr={5}
                  isSeeAllShow={true}
                  btnTitle="See All"
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                  onRightIconClick={onTaskCalenderDetail}
                />
                <TaskActivitesCell dataArray={tasks} />
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
                        {/* <VStack
                          mx={3}
                          shadow={1}
                          borderRadius={10}
                          overflow={'hidden'}
                        > */}
                        <CardWithShadow>
                          <ImageBase
                            style={{ height: 150, flex: 1 }}
                            source={`http://95.111.231.114:88${ads.imageUrl}`}
                            // source={ads.imageUrl}
                            placeholder={require('@assets/app-logo.png')}
                            contentFit="cover"
                            transition={1000}
                          />
                        </CardWithShadow>
                        {/* </VStack> */}
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
                icon: require('@assets/crop_coding_home.png'),
              },
              {
                title: 'Reserve stations',
                color: '#ed9393',
                icon: require('@assets/reserve_station_home.png'),
              },
              {
                title: 'Tests',
                color: '#1ebdc3',
                icon: require('@assets/test_home.png'),
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
                  onPress={onDropDownPress}
                />
              </VStack>
            );
          } else if (index === 8) {
            const items: DropDownCellType[] = [
              {
                title: 'Production Supplies',
                color: '#f5b794',
                icon: require('@assets/production_supplies_home.png'),
              },
              {
                title: 'Crop Marketing',
                color: '#ed9393',
                icon: require('@assets/crop_markeing_home.png'),
              },
              {
                title: 'Crop Loan',
                color: '#1ebdc3',
                icon: require('@assets/crop_loan_home.png'),
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
                  onPress={onDropDownPress}
                />
              </VStack>
            );
          } else if (index === 9) {
            const items: DropDownCellType[] = [
              {
                title: 'Weather Changes',
                color: '#f5b794',
                icon: require('@assets/weather_changes_home.png'),
              },
              {
                title: 'Social Media',
                color: '#ed9393',
                icon: require('@assets/social_media_home.png'),
              },
              {
                title: 'Satellite Data',
                color: '#1ebdc3',
                icon: require('@assets/satellite_home.png'),
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
                  onPress={onDropDownPress}
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
