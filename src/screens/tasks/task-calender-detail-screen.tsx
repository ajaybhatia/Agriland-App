import { FlatList, View, VStack } from 'native-base';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useGetApiCropGetCultivationDetailsByUserId } from '@/apis/endpoints/api';
import type {
  CultivationDetailResponse,
  FarmCropCultivationResponse,
} from '@/apis/model';
import ListHeader from '@/ui/components/ListHeader';

import CropGrowthCell from '../crop/components/crop-growth-cell';
import CropHomeCell from '../home/components/crops-home-cell';
import TaskActivitesCell from '../home/components/task-activites-cell';
import TodayTaskListCell from './components/today-task-list-cell';
import WeekCalenderCell from './components/week-calender-cell';

type Props = {};

const TaskCalenderDetailScreen = (props: Props) => {
  const [selectedCrop, setSelectedCrop] = useState<
    CultivationDetailResponse | undefined
  >();
  // getCrops
  const getCrops = useGetApiCropGetCultivationDetailsByUserId({
    query: {
      onSuccess: (data: FarmCropCultivationResponse) => {
        if (
          data &&
          data?.cultivationDetails &&
          data?.cultivationDetails.length > 0
        ) {
          setSelectedCrop(data?.cultivationDetails[0]);
        }
      },
    },
  });

  return (
    <View flex={1} backgroundColor={'white'}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        initialScrollIndex={0}
        renderItem={({ item, index }: { item: number; index: number }) => {
          if (
            index === 0 &&
            getCrops.data?.cultivationDetails &&
            getCrops.data?.cultivationDetails.length > 0
          ) {
            return (
              <VStack mt={2} height={120}>
                <FlatList
                  horizontal
                  keyExtractor={(item, index) => `${index}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={getCrops.data?.cultivationDetails ?? []}
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: CultivationDetailResponse;
                    index: number;
                  }) => (
                    <CropHomeCell
                      item={item}
                      // selectedItem={selectedCrop}
                      // onSelect={onSelectCrop}
                    />
                  )}
                />
              </VStack>
            );
          } else if (index === 1) {
            return <WeekCalenderCell />;
          } else if (index === 2) {
            return (
              <VStack mt={3} mx={5}>
                <ListHeader
                  title="Today Tasks"
                  btnTitle="See All"
                  isSeeAllShow={false}
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                />
                <FlatList
                  keyExtractor={(item, index) => `${index}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={[1, 2]}
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: number;
                    index: number;
                  }) => <TodayTaskListCell isSelect={index === 0} />}
                />
              </VStack>
            );
          } else if (index === 3) {
            return (
              <VStack my={5}>
                <CropGrowthCell item={selectedCrop} />
              </VStack>
            );
          } else if (index === 4) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="The Following Tasks"
                  ml={5}
                  mr={5}
                  isSeeAllShow={false}
                  btnTitle="See All"
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                  // onRightIconClick={onTaskCalenderDetail}
                />
                <TaskActivitesCell />
              </VStack>
            );
          }
          return <View />;
        }}
      />
    </View>
  );
};

export default TaskCalenderDetailScreen;
