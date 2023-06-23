//import arraySupport from 'dayjs/plugin/arraySupport';
//import weekday from 'dayjs/plugin/weekday';
import dayjs from 'dayjs';
import { HStack, Pressable, Text, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

import CardWithShadow from '@/ui/components/CardWithShadow';

//////dayjs.extend(weekday);

type Props = {
  onSelectedDate?: (date: dayjs.Dayjs) => void;
  currentDate: dayjs.Dayjs;
};

const width = Dimensions.get('screen').width;
const WeekCalenderCell = ({
  onSelectedDate,
  currentDate = dayjs(new Date()).startOf('days').utc(true),
}: Props) => {
  let firstDate = dayjs(dayjs().startOf('week').utc(true).toDate());
  const dateArry: dayjs.Dayjs[] = [
    firstDate,
    firstDate.add(1, 'day'),
    firstDate.add(2, 'day'),
    firstDate.add(3, 'day'),
    firstDate.add(4, 'day'),
    firstDate.add(5, 'day'),
    firstDate.add(6, 'day'),
  ];

  return (
    <CardWithShadow borderRadius={5}>
      <VStack mx={3} my={3}>
        <Text
          fontSize={13}
          fontFamily={'body'}
          fontWeight={'500'}
          fontStyle={'normal'}
        >
          This Week
        </Text>
        <HStack>
          {dateArry.map((day: dayjs.Dayjs, index: number) => {
            const isSelected = day.isSame(currentDate);
            return (
              <Pressable
                onPress={() => {
                  console.log('onSelectedDate ==> ', day);
                  onSelectedDate && onSelectedDate(day);
                }}
                key={`${index}`}
                w={width / (dateArry.length - 1) - 17}
                alignItems={'center'}
              >
                <Text
                  fontSize={13}
                  fontFamily={'body'}
                  fontWeight={'500'}
                  fontStyle={'normal'}
                >
                  {day.format('ddd')}
                </Text>
                <View
                  backgroundColor={isSelected ? '#a8c198' : '#FFFFFF'}
                  rounded={'full'}
                  h={'6'}
                  w={'6'}
                  mt={2}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Text
                    fontSize={11}
                    color={!isSelected ? '#a8c198' : '#FFFFFF'}
                    fontFamily={'body'}
                    fontWeight={'500'}
                    fontStyle={'normal'}
                  >
                    {day.format('D')}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </HStack>
      </VStack>
    </CardWithShadow>
  );
};

export default WeekCalenderCell;
