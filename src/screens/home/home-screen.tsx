import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { FlatList, Image, Pressable, Text, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useGetApiFarmGetFarms } from '@/apis/endpoints/api';
import type { FarmResponse } from '@/apis/model';
import ListHeader from '@/ui/components/ListHeader';
import colors from '@/ui/theme/colors';

import FarmAddCell from '../crop/components/farm-add-cell';
import FarmMapSelectionCell from '../crop/components/farm-map-selection-cell';
import CompleteProfileCell from './components/complete-profile-cell';
import CropHomeCell from './components/crops-home-cell';
import TaskActivitesCell from './components/task-activites-cell';
import WeatherCell from './components/weather-cell';

function HomeScreen() {
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

  const onNotificationDetail = () => {
    nav.navigate('NotificationsDetails');
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
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Weather"
                  ml={5}
                  mr={5}
                  btnTitle="See All"
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                  onRightIconClick={() => nav.navigate('WeatherDetailScreen')}
                />
                <WeatherCell />
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
          return (
            <Pressable onPress={() => nav.navigate('title2')} py={4}>
              <Text>{item}</Text>
            </Pressable>
          );
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
