import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Icon, Pressable, VStack } from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { BORDER_COLOR_DARK } from '../theme/colors';
import BodyTitle from './BodyTitle';
import Header from './Header';

// import utc from 'dayjs/plugin/utc';

// dayjs.extend(utc);

type Props = {
  title?: string;
  onDateSelected?: (date: Date) => void;
  defaultDate?: Date;
};

export default function CalendarView({
  title,
  onDateSelected,
  defaultDate,
}: Props) {
  const [itemDate, setItemDate] = useState<Date>(
    defaultDate ? defaultDate : new Date()
  );
  const [isShow, setShow] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (event.type === 'dismissed') {
      // Alert.alert(
      //   'picker was dismissed',
      //   undefined,
      //   [
      //     {
      //       text: 'great',
      //     },
      //   ],
      //   { cancelable: true }
      // );
      return;
    }

    if (event.type === 'neutralButtonPressed') {
      setItemDate(new Date(0));
      onDateSelected && onDateSelected(new Date(0));
    } else {
      setItemDate(selectedDate ?? new Date());
      onDateSelected && onDateSelected(selectedDate ?? new Date());
    }
  };
  return (
    <VStack mt={3}>
      {title && (
        <Header title={title} fontWeight={'700'} fontSize={17} mb={2} />
      )}
      <Pressable
        onPress={() => setShow(true)}
        borderWidth={2}
        borderColor={BORDER_COLOR_DARK}
        borderRadius={15}
        bgColor={'white'}
        py={4}
        px={3}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <BodyTitle
          numberOfLines={1}
          title={`${dayjs(itemDate).format('MMMM DD, YYYY')}`}
          fontSize={12}
          fontWeight={200}
        />

        <Icon
          as={MaterialIcons}
          name={'calendar-today'}
          size={'lg'}
          color={BORDER_COLOR_DARK}
        />
      </Pressable>

      {isShow && (
        <DateTimePicker
          testID="dateTimePicker"
          // timeZoneOffsetInMinutes={tzOffsetInMinutes}
          // minuteInterval={interval}
          // maximumDate={maximumDate}
          // minimumDate={minimumDate}
          value={defaultDate ?? new Date()}
          mode={'date'}
          // is24Hour
          display={'calendar'}
          onChange={onChange}
          // textColor={textColor || undefined}
          // accentColor={accentColor || undefined}
          // neutralButton={{label: neutralButtonLabel}}
          // negativeButton={{label: 'Cancel', textColor: 'red'}}
          // disabled={disabled}
        />
      )}
    </VStack>
  );
}
