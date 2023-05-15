import { useNavigation } from '@react-navigation/native';
import { FlatList, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';

import { useGetApiFarmGetFarms } from '@/apis/endpoints/api';
import type { FarmResponse } from '@/apis/model';
import colors from '@/ui/theme/colors';

import FarmAddCell from '../crop/components/farm-add-cell';
import FarmMapSelectionCell from '../crop/components/farm-map-selection-cell';
import LightChartCell from './components/light-chart-cell';
import WeatherTodayCell from './components/weather-today-cell';
import WeatherWeekCell from './components/weather-week-cell';

const WeatherChangesScreen = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const nav = useNavigation();
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<FarmResponse | undefined>();
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
      skip: moreFarmInfo.skip,
      take: moreFarmInfo.take,
    },
    {
      query: {
        onSuccess: (data: FarmResponse[]) => {
          if (data.length > 0) {
            setFarms(moreFarmInfo.skip <= 0 ? data : [...farms, ...data]);
            if (selectedFarm === undefined && data.length > 0) {
              setSelectedFarm(data[0]);
            }
          }
        },
      },
    }
  );
  return (
    <View flex={1} backgroundColor={'white'}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }: { item: number; index: number }) => {
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
                  extraData={selectedFarm}
                  keyExtractor={(item, index) => `${index}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={farms}
                  ListHeaderComponent={<FarmAddCell />}
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
                      // onSelectFarm={onSelectFarm}
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
          } else if (index === 1) {
            return <WeatherTodayCell />;
          } else if (index === 2) {
            return <WeatherWeekCell />;
          } else if (index === 3) {
            return <LightChartCell title="Light Intensity" />;
          } else if (index === 4) {
            return <LightChartCell title="Wind Speed" />;
          } else if (index === 5) {
            return <LightChartCell title="Clouds" />;
          } else if (index === 6) {
            return <LightChartCell title="Humidity" />;
          } else if (index === 7) {
            return <LightChartCell title="Pressure" />;
          } else {
            return <View />;
          }
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
