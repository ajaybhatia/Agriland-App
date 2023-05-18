import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { FlatList, HStack, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useGetApiFarmGetFarms } from '@/apis/endpoints/api';
import type { FarmResponse } from '@/apis/model';
import BodyTitle from '@/ui/components/BodyTitle';
import ListHeader from '@/ui/components/ListHeader';
import colors from '@/ui/theme/colors';

import CropRegisterCell from '../crop/components/crop-register-cell';
import FarmAddCell from '../crop/components/farm-add-cell';
import FarmMapSelectionCell from '../crop/components/farm-map-selection-cell';
import CropHomeCell from '../home/components/crops-home-cell';
import TaskActivitesCell from '../home/components/task-activites-cell';
import WeatherCell from '../home/components/weather-cell';
import SoilTestType from '../soilTest/components/soil-test-type';
import FarmDetailCell from './components/farm-detail-cell';

function FarmDetailScreen() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const nav = useNavigation();
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [cropSelected, setCropSelected] = useState<number>(0);
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
      // skip: moreFarmInfo.skip,
      // take: moreFarmInfo.take,
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

  const onCropSelect = (v: number) => {
    setCropSelected(v);
  };

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
            return (
              <VStack mt={2} height={135}>
                <FlashList
                  horizontal
                  estimatedItemSize={120}
                  extraData={selectedFarm}
                  keyExtractor={(item, index) => `${index}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={[1, 2, 3, 4]}
                  ListHeaderComponent={<CropRegisterCell />}
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: number;
                    index: number;
                  }) => (
                    <CropHomeCell
                      isSelected={cropSelected === index}
                      onSelect={() => onCropSelect(index)}
                    />
                  )}
                />
              </VStack>
            );
          } else if (index === 2 && selectedFarm) {
            return (
              <VStack mt={3}>
                <FarmDetailCell item={selectedFarm} />
              </VStack>
            );
          } else if (index === 3) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Weather"
                  ml={5}
                  mr={5}
                  btnTitle="See All"
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                />
                <WeatherCell />
              </VStack>
            );
          } else if (index === 4) {
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
          } else if (index === 5) {
            return (
              <VStack mt={3}>
                <HStack mb={3} alignItems={'center'} ml={5}>
                  <ListHeader
                    title="Soil Test"
                    fontSize={15}
                    fontWeight={'700'}
                    isSeeAllShow={false}
                  />
                  <BodyTitle
                    numberOfLines={1}
                    title="(Choose One Of The Following Tests)"
                    fontSize={12}
                    fontWeight={'300'}
                    ml={3}
                  />
                </HStack>
                <FlashList
                  horizontal
                  estimatedItemSize={120}
                  extraData={selectedFarm}
                  keyExtractor={(item, index) => `${index}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: number;
                    index: number;
                  }) => <SoilTestType />}
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

export default FarmDetailScreen;

const styles = StyleSheet.create({
  dotStyle: {
    width: 8,
    height: 8,
    backgroundColor: colors.button_color,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
