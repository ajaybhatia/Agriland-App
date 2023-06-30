import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FlatList, View, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  useGetApiCropGetcropactivitiesbyfarmid,
  useGetApiCropGetCultivationDetailsByFarmId,
} from '@/apis/endpoints/api';
import type {
  ActivityDetails,
  CultivationDetailResponse,
  FarmCropCultivationResponse,
  FarmerCropCalendarActivity,
} from '@/apis/model';
import type { AuthStackParamList } from '@/navigation/types';
import AppLoader from '@/ui/components/AppLoader';
import ListHeader from '@/ui/components/ListHeader';
import type { DataValues } from '@/ui/components/step-indicator/StepIndicator';

import CropGrowthCell from '../crop/components/crop-growth-cell';
import CropHomeCell from '../home/components/crops-home-cell';
import TaskActivitesCell from '../home/components/task-activites-cell';
import TodayTaskListCell from './components/today-task-list-cell';
import WeekCalenderCell from './components/week-calender-cell';

dayjs.extend(utc);
type Props = {};

const TaskCalenderDetailScreen = (props: Props) => {
  const [selectedCrop, setSelectedCrop] = useState<
    CultivationDetailResponse | undefined
  >();
  const route =
    useRoute<RouteProp<AuthStackParamList, 'TaskCalenderDetailScreen'>>();
  const [crops, setCrops] = useState<CultivationDetailResponse[]>([]);
  const [currentDate, setCurrentSelected] = useState<dayjs.Dayjs>(
    dayjs(new Date()).startOf('days').utc(true)
  );
  const [moreInfo, setMoreInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 10,
    skip: 0,
  });

  const [tasksCurrent, setCurrentTasks] = useState<DataValues[]>([]);
  const [tasksOld, setOldTasks] = useState<DataValues[]>([]);
  const [tasks, setTasks] = useState<DataValues[]>([]);
  // getCrops
  // const getCrops = useGetApiCropGetCultivationDetailsByUserId(
  //   {
  //     skip: moreInfo.skip,
  //     take: moreInfo.take,
  //   },
  //   {
  //     query: {
  //       onSuccess: (data: FarmCropModelPaginated) => {
  //         console.log('getCrops ==> ', data);
  //         if (data && data?.farmCrops && data?.farmCrops.length > 0) {
  //           setCrops(data.farmCrops);
  //           if (selectedCrop === undefined) {
  //             setSelectedCrop(data?.farmCrops[0]);
  //           }
  //         }
  //       },
  //     },
  //   }
  // );

  const getCrops = useGetApiCropGetCultivationDetailsByFarmId(
    {
      farmId: route?.params?.farmId ?? '',
    },
    {
      query: {
        onSuccess: (data: FarmCropCultivationResponse) => {
          if (
            data &&
            data?.cultivationDetails &&
            data?.cultivationDetails.length > 0
          ) {
            setCrops(data?.cultivationDetails);
            if (selectedCrop === undefined) {
              setSelectedCrop(data?.cultivationDetails[0]);
            }
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
  // tasks
  console.log('getCalActivityTasks ==> ', route?.params?.farmId ?? '');

  const getCalActivityTasks = useGetApiCropGetcropactivitiesbyfarmid(
    {
      farmid: route?.params?.farmId ?? '', // '0737bac5-b1a5-453b-a012-afa37fccb199', //
      cropid: selectedCrop?.cropDetails?.id ?? '',
      noOfDays: 7,
    },
    {
      query: {
        onSuccess(data: ActivityDetails) {
          if (data) {
            var mainTempTask: DataValues[] = [];
            var mainTempPendingTask: DataValues[] = [];
            if (data && data.calendarActivities) {
              data.calendarActivities.map((x) => {
                let obj: DataValues = {
                  title: x?.activityDate ?? '',
                  subTitle: x?.activityDate ?? '',
                  list: [x],
                };
                let index = mainTempTask.findIndex((y) =>
                  dayjs(y.title)
                    .startOf('day')
                    .isSame(dayjs(x.activityDate).startOf('day'))
                );
                if (index >= 0) {
                  let itemList = mainTempTask[index].list;
                  mainTempTask[index].list = [...itemList, x];
                } else {
                  mainTempTask = [...mainTempTask, obj];
                }
                return obj;
              });
            }
            if (data && data?.pendingActivities) {
              data.pendingActivities.map((x) => {
                let obj: DataValues = {
                  title: x?.activityDate ?? '',
                  subTitle: x?.activityDate ?? '',
                  list: [x],
                };
                let index = mainTempPendingTask.findIndex((y) =>
                  dayjs(y.title)
                    .startOf('day')
                    .isSame(dayjs(x.activityDate).startOf('day'))
                );
                if (index >= 0) {
                  let itemList = mainTempPendingTask[index].list;
                  mainTempPendingTask[index].list = [...itemList, x];
                } else {
                  mainTempPendingTask = [...mainTempPendingTask, obj];
                }
                return obj;
              });
            }

            calculateTaskAccordingToDate(
              mainTempTask,
              mainTempPendingTask,
              currentDate
            );
            setCurrentTasks(mainTempTask);
            setOldTasks(mainTempPendingTask);
          }
        },
      },
    }
  );
  const calculateTaskAccordingToDate = (
    mainTempTask: DataValues[],
    mainTempPendingTask: DataValues[],
    date: dayjs.Dayjs
  ) => {
    if (date.isBefore(dayjs(new Date()).startOf('day'))) {
      console.log('Before', date, ' == ', date.startOf('day'));
      setTasks(
        mainTempPendingTask.filter((x) =>
          date.isSame(dayjs(x.title).utc().startOf('day'))
        )
      );
    } else {
      console.log('Equal after', date, ' === ', mainTempTask.length);
      setTasks(
        mainTempTask.filter((x) => {
          return date.isSame(dayjs(x.title).utc().startOf('day'));
        })
      );
    }
  };

  const onSelectedDate = useCallback(
    (date: dayjs.Dayjs) => {
      setCurrentSelected(date);
      calculateTaskAccordingToDate(tasksCurrent, tasksOld, date);
    },
    [tasksCurrent, tasksOld]
  );

  const onSelectCrop = useCallback(
    (item: CultivationDetailResponse) => {
      setSelectedCrop(item);
    },
    [setSelectedCrop]
  );

  return (
    <View flex={1} backgroundColor={'white'}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        initialScrollIndex={0}
        renderItem={({ item, index }: { item: number; index: number }) => {
          if (index === 0 && crops.length > 0) {
            return (
              <VStack mt={2} height={120}>
                <FlatList
                  horizontal
                  keyExtractor={(item, index) => `${index}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={crops}
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: CultivationDetailResponse;
                    index: number;
                  }) => (
                    <CropHomeCell
                      item={item}
                      selectedItem={selectedCrop}
                      onSelect={onSelectCrop}
                    />
                  )}
                />
              </VStack>
            );
          } else if (index === 1) {
            return (
              <WeekCalenderCell
                onSelectedDate={onSelectedDate}
                currentDate={currentDate}
              />
            );
          } else if (index === 2) {
            // let dataCurrent = tasksCurrent.filter((x) =>
            //   dayjs(new Date())
            //     .utc()
            //     .startOf('day')
            //     .isSame(dayjs(x.title).utc().startOf('day'))
            // );
            // let curentTaskList =
            //   dataCurrent.length > 0 ? dataCurrent[0].list : [];
            let curentTaskList = [];
            if (curentTaskList.length > 0) {
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
                    data={curentTaskList}
                    renderItem={({
                      item: currentData,
                      index,
                    }: {
                      item: FarmerCropCalendarActivity;
                      index: number;
                    }) => (
                      <TodayTaskListCell
                        isSelect={index === 0}
                        item={currentData}
                      />
                    )}
                  />
                </VStack>
              );
            } else {
              return <View />;
            }
          } else if (index === 3 && selectedCrop) {
            return (
              <VStack my={5}>
                <CropGrowthCell
                  item={selectedCrop}
                  cultivationMonth={
                    getCalActivityTasks?.data?.cultivationMonths ?? 0
                  }
                />
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
                <TaskActivitesCell dataArray={tasks} />
              </VStack>
            );
          }
          return <View />;
        }}
      />
      {getCalActivityTasks.isLoading && <AppLoader />}
    </View>
  );
};

export default TaskCalenderDetailScreen;
