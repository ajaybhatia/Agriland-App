import { Button, FlatList, View, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';

import { useGetApiCommonGetCalendars } from '@/apis/endpoints/api';
import type { CalendarModel, CalendarPaginatedResponse } from '@/apis/model';
import AppLoader from '@/ui/components/AppLoader';
import Header from '@/ui/components/Header';
import colors from '@/ui/theme/colors';

import ChooseCalendarActivityCell from './components/choose-calendar-activity-cell';

type Props = {
  onSelected?: (item: CalendarModel) => void;
  onDismiss?: () => void;
  selectedActivity?: CalendarModel;
};

const ChooseCalendarsActivity = ({
  onSelected,
  onDismiss,
  selectedActivity,
}: Props) => {
  const [calendarActivities, setCalendatActivites] = useState<CalendarModel[]>(
    []
  );
  const [moreTasksInfo, setMoreTasksInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 10,
    skip: 0,
  });

  const getTasks = useGetApiCommonGetCalendars(
    {
      skip: moreTasksInfo.skip,
      take: moreTasksInfo.take,
      sortColumn: 'createdOn',
      sortOrder: 'asc',
      q: '',
    },
    {
      query: {
        onSuccess: (data: CalendarPaginatedResponse) => {
          if (
            data &&
            data.calendarResponse &&
            data.calendarResponse.length > 0
          ) {
            setCalendatActivites(
              moreTasksInfo.skip === 0
                ? data.calendarResponse
                : [...calendarActivities, ...data.calendarResponse]
            );
          } else if (moreTasksInfo.skip === 0) {
            setCalendatActivites([]);
          }
        },
      },
    }
  );
  const onSelectedItem = useCallback((item: CalendarModel) => {
    onSelected && onSelected(item);
  }, []);
  return (
    <VStack flex={1} backgroundColor={'white'}>
      <View h={'16'} justifyContent={'center'} mx={5}>
        <Header title="Choose Acitivity" />
      </View>
      <FlatList
        horizontal={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
        initialScrollIndex={0}
        keyExtractor={(item, indexV) => `${indexV}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={calendarActivities}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }: { item: CalendarModel }) => (
          <ChooseCalendarActivityCell
            item={item}
            onSelected={onSelectedItem}
            selectedActivity={selectedActivity}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          console.log('onEndReached');
          if (
            !getTasks.isLoading &&
            !getTasks.isFetching &&
            moreTasksInfo.take <= calendarActivities.length &&
            getTasks.data &&
            getTasks.data?.totalCount &&
            getTasks.data?.totalCount <= calendarActivities.length
          ) {
            console.log('onEndReached Start');
            setMoreTasksInfo({
              take: moreTasksInfo.take,
              skip: moreTasksInfo.skip + moreTasksInfo.take,
            });
          }
        }}
        //estimatedItemSize={300}
      />
      <Button
        backgroundColor={colors.button_color}
        onPress={onDismiss}
        borderRadius={8}
        width={'80%'}
        mt={30}
        fontWeight={'normal'}
        fontSize={20}
        bottom={'5'}
        overflow={'hidden'}
        alignSelf={'center'}
        position={'absolute'}
      >
        {'Dismiss'}
      </Button>
      {getTasks.isLoading && calendarActivities.length <= 0 && <AppLoader />}
    </VStack>
  );
};

export default ChooseCalendarsActivity;
