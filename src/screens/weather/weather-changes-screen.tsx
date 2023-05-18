import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import dayjs from 'dayjs';
import { FlatList, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';

import { useGetApiFarmGetFarms } from '@/apis/endpoints/api';
import type { FarmResponse } from '@/apis/model';
import { useWeather } from '@/core/weather';
import colors from '@/ui/theme/colors';

import FarmAddCell from '../crop/components/farm-add-cell';
import FarmMapSelectionCell from '../crop/components/farm-map-selection-cell';
import LightChartCell from './components/light-chart-cell';
import WeatherTodayCell from './components/weather-today-cell';
import WeatherWeekCell from './components/weather-week-cell';
import type { ForecastModel } from './models/weather-forecast-models';
import type { HourlyWeather } from './weather-single-detail';

const WeatherChangesScreen = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const nav = useNavigation();
  const weatherReports = useWeather.use.weatherReport();
  const selectedFarms = useWeather.use.selectedFarm();
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<FarmResponse | undefined>();
  const [moreFarmInfo, setMoreFarmInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });
  const [isLoadingData, setLoadingData] = useState<boolean>(false);

  const [weatherReport, setWeatherReport] = useState<ForecastModel | undefined>(
    weatherReports
  );
  interface ListGraph {
    title: string;
    value: HourlyWeather[];
  }

  const [historyReport, setHistoryReport] = useState<ListGraph[]>([]);

  // get Farm APis

  const getFarms = useGetApiFarmGetFarms(
    {
      // skip: moreFarmInfo.skip,
      // take: moreFarmInfo.take,
    },
    {
      query: {
        onSuccess: (data: FarmResponse[]) => {
          console.log('Farm onSuccess ===> ', data.length);
          if (data.length > 0) {
            setFarms(moreFarmInfo.skip <= 0 ? data : [...farms, ...data]);
            if (selectedFarm === undefined && data.length > 0) {
              setSelectedFarm(selectedFarms ? selectedFarms : data[0]);
              if (selectedFarms && selectedFarms.coordinates) {
                onWeatherHistory(
                  selectedFarms.coordinates[0]?.lat ?? 0.0,
                  selectedFarms.coordinates[0]?.lng ?? 0.0
                );
              } else if (
                data[0].coordinates &&
                data[0].coordinates?.length > 0
              ) {
                onWeatherHistory(
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

  const onSelectFarm = (item: FarmResponse) => {
    setSelectedFarm(item);
    if (item.coordinates && item.coordinates.length > 0) {
      setLoadingData(true);
      onWeatherForecast(
        item.coordinates[0]?.lat ?? 0.0,
        item.coordinates[0]?.lng ?? 0.0
      );
      onWeatherHistory(
        item.coordinates[0]?.lat ?? 0.0,
        item.coordinates[0]?.lng ?? 0.0
      );
    }
  };

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
        } else {
          console.log('Not found');
        }
      })
      .catch((e) => {
        console.log('Not found Error ===> ', e);
      });
  };

  const onWeatherHistory = (lat: number, lng: number) => {
    axios
      .get(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}&start_date=${dayjs()
          .subtract(1, 'month')
          .format('YYYY-MM-DD')}&end_date=${dayjs().format(
          'YYYY-MM-DD'
        )}&hourly=relativehumidity_2m,surface_pressure,rain,cloudcover,windspeed_10m`
      )
      .then(async (resp) => {
        if (resp.data && resp.data) {
          let response = resp.data;
          var surfacePressureArray: HourlyWeather[] = [];
          var humidityArray: HourlyWeather[] = [];
          var cloudsArray: HourlyWeather[] = [];
          var windArray: HourlyWeather[] = [];
          var lightArray: HourlyWeather[] = [];
          var currentdate: string = '';
          await response.hourly.time.map((time, index) => {
            let surface_pressure =
              response.hourly.surface_pressure[index] !== undefined &&
              response.hourly.surface_pressure[index] !== null &&
              response.hourly.surface_pressure[index]
                ? response.hourly.surface_pressure[index]
                : 0;

            let relativehumidity_2m =
              response.hourly.relativehumidity_2m[index] !== undefined &&
              response.hourly.relativehumidity_2m[index] !== null &&
              response.hourly.relativehumidity_2m[index]
                ? response.hourly.relativehumidity_2m[index]
                : 0;

            let rain =
              response.hourly.rain[index] !== undefined &&
              response.hourly.rain[index] !== null &&
              response.hourly.rain[index]
                ? response.hourly.rain[index]
                : 0;

            let windspeed_10m =
              response.hourly.windspeed_10m[index] !== undefined &&
              response.hourly.windspeed_10m[index] !== null &&
              response.hourly.windspeed_10m[index]
                ? response.hourly.windspeed_10m[index]
                : 0;

            let cloudcover =
              response.hourly.cloudcover[index] !== undefined &&
              response.hourly.cloudcover[index] !== null &&
              response.hourly.cloudcover[index]
                ? response.hourly.cloudcover[index]
                : 0;

            if (currentdate === '') {
              currentdate = time;
              surfacePressureArray = [
                ...surfacePressureArray,
                { time: time, value: surface_pressure },
              ];
              humidityArray = [
                ...humidityArray,
                { time: time, value: relativehumidity_2m },
              ];
              cloudsArray = [...cloudsArray, { time: time, value: rain }];
              windArray = [...windArray, { time: time, value: windspeed_10m }];
              lightArray = [...lightArray, { time: time, value: cloudcover }];
            } else if (
              currentdate !== '' &&
              !dayjs(time)
                .startOf('day')
                .utc(true)
                .isSame(dayjs(currentdate).startOf('day').utc(true))
            ) {
              // is diffrent date
              currentdate = time;
              surfacePressureArray = [
                ...surfacePressureArray,
                { time: time, value: surface_pressure },
              ];
              humidityArray = [
                ...humidityArray,
                { time: time, value: relativehumidity_2m },
              ];
              cloudsArray = [...cloudsArray, { time: time, value: rain }];
              windArray = [...windArray, { time: time, value: windspeed_10m }];
              lightArray = [...lightArray, { time: time, value: cloudcover }];
            }
          });
          const arr = [
            { title: 'Light Intensity', value: lightArray },
            { title: 'Wind Speed', value: windArray },
            { title: 'Clouds', value: cloudsArray },
            { title: 'Humidity', value: humidityArray },
            { title: 'Pressure', value: surfacePressureArray },
          ];
          setHistoryReport(arr);
        } else {
          console.log('Not found');
        }
      })
      .catch((e) => {
        console.log('Not found Error ===> ', e);
      });
  };

  return (
    <View flex={1} backgroundColor={'white'}>
      <FlatList
        data={[0, 1, 2, ...historyReport]}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }: { item: ListGraph; index: number }) => {
          if (index === 0) {
            return (
              <VStack mt={2} pb={5}>
                <FlatList
                  horizontal
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                      useNativeDriver: false,
                    }
                  )}
                  extraData={selectedFarm || farms.length}
                  keyExtractor={(item, index) => `${index}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={farms}
                  initialNumToRender={3}
                  ListHeaderComponent={
                    <FarmAddCell
                      onPreviousSubmit={() => nav.navigate('AddFarmHomeScreen')}
                    />
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
          } else if (index === 1 && weatherReport) {
            return <WeatherTodayCell weatherReport={weatherReport} />;
          } else if (index === 2 && weatherReport) {
            return <WeatherWeekCell weatherReport={weatherReport} />;
          } else {
            return (
              <LightChartCell title={item.title} historyReport={item.value} />
            );
          }
          // else if (index === 3) {
          //   return (
          //     <LightChartCell
          //       title="Light Intensity"
          //       historyReport={route.params.weatherReport}
          //     />
          //   );
          // } else if (index === 4) {
          //   return (
          //     <LightChartCell
          //       title="Wind Speed"
          //       weatherReport={route.params.weatherReport}
          //     />
          //   );
          // } else if (index === 5) {
          //   return (
          //     <LightChartCell
          //       title="Clouds"
          //       weatherReport={route.params.weatherReport}
          //     />
          //   );
          // } else if (index === 6) {
          //   return (
          //     <LightChartCell
          //       title="Humidity"
          //       weatherReport={route.params.weatherReport}
          //     />
          //   );
          // } else if (index === 7) {
          //   return (
          //     <LightChartCell
          //       title="Pressure"
          //       weatherReport={route.params.weatherReport}
          //     />
          //   );
          // }
          // else {
          //   return <View />;
          // }
        }}
      />
    </View>
  );
};

export default WeatherChangesScreen;

const styles = StyleSheet.create({
  dotStyle: {
    width: 8,
    height: 8,
    backgroundColor: colors.button_color,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
