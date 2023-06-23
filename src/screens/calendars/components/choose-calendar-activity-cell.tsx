import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Pressable, Text } from 'native-base';
import React from 'react';
import { I18nManager } from 'react-native';

import type { CalendarModel } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';
import colors from '@/ui/theme/colors';

dayjs.extend(relativeTime);
type Props = {
  item?: CalendarModel;
  onSelected?: (item: CalendarModel) => void;
  selectedActivity?: CalendarModel;
};

const ChooseCalendarActivityCell = ({
  item,
  onSelected,
  selectedActivity,
}: Props) => {
  return (
    <CardWithShadow
      borderColor={
        selectedActivity && selectedActivity.id === item?.id
          ? colors.BORDER_COLOR_DARK
          : '#FFF'
      }
      borderWidth={1}
    >
      <Pressable p={3} onPress={() => onSelected && item && onSelected(item)}>
        <Text
          fontSize={13}
          fontFamily={'body'}
          fontStyle={'normal'}
          fontWeight={'500'}
        >
          {I18nManager.isRTL
            ? item?.calendarName?.ar ?? ''
            : item?.calendarName?.en ?? ''}
        </Text>
        <Text
          fontSize={10}
          mt={2}
          fontFamily={'body'}
          fontStyle={'normal'}
          fontWeight={'100'}
        >
          {dayjs(item?.createdOn).format('MMMM D, YYYY')}
        </Text>
      </Pressable>
    </CardWithShadow>
  );
};

export default ChooseCalendarActivityCell;
