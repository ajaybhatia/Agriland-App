import dayjs from 'dayjs';
import { View } from 'native-base';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

import CardWithShadow from '@/ui/components/CardWithShadow';

const CropCalendarCell = () => {
  const [selected, setSelected] = useState(dayjs().format('YYYY-MM-DD'));
  console.log('selected ===> ', selected);
  return (
    <CardWithShadow mx={5}>
      <View shadow={2} overflow={'hidden'} borderRadius={10}>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
        />
      </View>
    </CardWithShadow>
  );
};

export default CropCalendarCell;
