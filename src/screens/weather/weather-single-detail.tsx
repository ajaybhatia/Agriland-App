import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  Divider,
  HStack,
  Icon,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useWeather } from '@/core/weather';
import type { AuthStackParamList } from '@/navigation/types';
import AppLoader from '@/ui/components/AppLoader';
import CardWithShadow from '@/ui/components/CardWithShadow';

export enum DetailType {
  Pressure = 'Pressure',
  Humidity = 'Humidity',
  Clouds = 'Clouds',
  Wind = 'Wind Speed',
  Light = 'Light Intensity',
}
export interface HourlyWeather {
  time: string;
  value: number;
}
const WeatherSingleDetail = () => {
  const nav = useNavigation();
  const [isLoading, setLoading] = useState<boolean>(false);
  const weatherReport = useWeather.use.weatherReport();
  const [historyReport, setHistoryReport] = useState<HourlyWeather[]>([]);
  const route =
    useRoute<RouteProp<AuthStackParamList, 'WeatherSingleDetail'>>();

  const onWeatherForecast = (lat: number, lng: number) => {
    setLoading(true);
    axios
      .get(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}&start_date=${dayjs()
          .subtract(1, 'month')
          .format('YYYY-MM-DD')}&end_date=${dayjs()
          .subtract(1, 'day')
          .format(
            'YYYY-MM-DD'
          )}&hourly=relativehumidity_2m,surface_pressure,rain,cloudcover,windspeed_10m`
      )
      .then(async (resp) => {
        if (resp.data && resp.data) {
          let response = resp.data;
          var hoursArray: HourlyWeather[] = [];
          var currentdate: string = '';
          let title = route.params?.title ?? 'Detail';
          await response.hourly.time.map((time, index) => {
            var surface_pressure = 0;
            if (DetailType.Pressure === title) {
              surface_pressure =
                response.hourly.surface_pressure[index] !== undefined &&
                response.hourly.surface_pressure[index] !== null &&
                response.hourly.surface_pressure[index]
                  ? response.hourly.surface_pressure[index]
                  : 0;
            } else if (DetailType.Humidity === title) {
              surface_pressure =
                response.hourly.relativehumidity_2m[index] !== undefined &&
                response.hourly.relativehumidity_2m[index] !== null &&
                response.hourly.relativehumidity_2m[index]
                  ? response.hourly.relativehumidity_2m[index]
                  : 0;
            } else if (DetailType.Clouds === title) {
              surface_pressure =
                response.hourly.rain[index] !== undefined &&
                response.hourly.rain[index] !== null &&
                response.hourly.rain[index]
                  ? response.hourly.rain[index]
                  : 0;
            } else if (DetailType.Wind === title) {
              surface_pressure =
                response.hourly.windspeed_10m[index] !== undefined &&
                response.hourly.windspeed_10m[index] !== null &&
                response.hourly.windspeed_10m[index]
                  ? response.hourly.windspeed_10m[index]
                  : 0;
            } else if (DetailType.Light === title) {
              surface_pressure =
                response.hourly.cloudcover[index] !== undefined &&
                response.hourly.cloudcover[index] !== null &&
                response.hourly.cloudcover[index]
                  ? response.hourly.cloudcover[index]
                  : 0;
            }
            if (currentdate === '') {
              currentdate = time;
              hoursArray = [
                ...hoursArray,
                { time: time, value: surface_pressure },
              ];
            } else if (
              currentdate !== '' &&
              !dayjs(time)
                .startOf('day')
                .utc(true)
                .isSame(dayjs(currentdate).startOf('day').utc(true))
            ) {
              // is diffrent date
              currentdate = time;
              hoursArray = [
                ...hoursArray,
                { time: time, value: surface_pressure },
              ];
            }
          });
          setHistoryReport(hoursArray);
          setLoading(false);
        } else {
          console.log('Not found');
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log('Not found Error ===> ', e);
      });
  };

  useEffect(() => {
    nav.setOptions({ title: route.params?.title ?? 'Detail' });
    weatherReport &&
      onWeatherForecast(
        weatherReport.latitude ?? 0.0,
        weatherReport.longitude ?? 0.0
      );
  }, [route, weatherReport]);
  // eslint-disable-next-line react/no-unstable-nested-components
  const ConditionCell = () => {
    return (
      <HStack my={2} alignItems={'center'}>
        <Icon as={MaterialIcons} name={'clear'} size={'lg'} color={'black'} />
        <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
        <VStack>
          <Text fontWeight={'600'} fontFamily={'heading'} fontSize={13}>
            Excellent growing conditions
          </Text>
          <Text fontWeight={'200'} fontFamily={'body'} fontSize={11}>
            Tomatoes,potatoes,beans,cauliflower pumpkin
          </Text>
        </VStack>
      </HStack>
    );
  };
  return (
    <View flex={1}>
      {!isLoading ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* <VStack flex={1} mx={5} mb={3}>
        <Text fontWeight={'200'} fontFamily={'heading'} fontSize={12}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </VStack> */}
          {historyReport && historyReport.length > 0 && (
            <CardWithShadow>
              <View shadow={1} py={2}>
                <ScrollView
                  horizontal={true}
                  // contentOffset={{ x: 10000, y: 0 }} // i needed the scrolling to start from the end not the start
                  showsHorizontalScrollIndicator={false} // to hide scroll bar
                >
                  <LineChart
                    data={{
                      labels: historyReport.map(
                        (v: HourlyWeather, index: number) => {
                          return dayjs(v.time).utc(true).format('DD MMM');
                        }
                      ),
                      datasets: [
                        {
                          data: historyReport.map((v: HourlyWeather) => {
                            return v.value;
                          }),
                          strokeWidth: 5,
                          color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
                        },
                      ],
                    }}
                    width={historyReport.length * 40} // from react-native
                    height={220}
                    // yAxisLabel="$"
                    // yAxisSuffix="k"
                    yLabelsOffset={30}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      //backgroundColor: '#FFF',
                      propsForBackgroundLines: {
                        strokeDasharray: '',
                      },
                      barPercentage: 0.5,
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      useShadowColorFromDataset: false, // optional
                      propsForVerticalLabels: {
                        fontSize: 8,
                        alignmentBaseline: 'after-edge',
                      },
                      propsForHorizontalLabels: {
                        fontSize: 8,
                      },
                      style: {
                        backgroundColor: 'green',
                        alignSelf: 'flex-start',
                        marginLeft: 10,
                      },
                      propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                      },
                    }}
                    transparent
                    verticalLabelRotation={0}
                    withVerticalLabels
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                    }}
                  />
                </ScrollView>
              </View>
            </CardWithShadow>
          )}
          {/* <VStack flex={1} mx={5} mt={5}>
        {[1, 2, 3].map((item: number, index: number) => {
          return <ConditionCell key={`${index}`} />;
        })}
      </VStack> */}
        </ScrollView>
      ) : (
        <AppLoader />
      )}
    </View>
  );
};

export default WeatherSingleDetail;
