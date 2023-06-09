import dayjs from 'dayjs';
import arraySupport from 'dayjs/plugin/arraySupport';
import weekday from 'dayjs/plugin/weekday';
import { HStack, Pressable, Text, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';

import CardWithShadow from '@/ui/components/CardWithShadow';

dayjs.extend(weekday);
dayjs.extend(arraySupport);

type Props = {};

const width = Dimensions.get('screen').width;
const WeekCalenderCell = (props: Props) => {
  const [currentDate, setCurrentSelected] = useState<string>(dayjs().format());
  let firstDate = dayjs().startOf('week').format();
  const dateArry: string[] = [
    firstDate,
    dayjs(firstDate).add(1, 'day').format(),
    dayjs(firstDate).add(2, 'day').format(),
    dayjs(firstDate).add(3, 'day').format(),
    dayjs(firstDate).add(4, 'day').format(),
    dayjs(firstDate).add(5, 'day').format(),
    dayjs(firstDate).add(6, 'day').format(),
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
          {dateArry.map((day: string, index: number) => {
            const isSelected = dayjs(day)
              .startOf('day')
              .isSame(dayjs(currentDate).startOf('day'));
            return (
              <Pressable
                onPress={() => setCurrentSelected(day)}
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
                  {dayjs(day).format('ddd')}
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
                    {dayjs(day).format('D')}
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
