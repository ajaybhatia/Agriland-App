import { Pressable, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { I18nManager } from 'react-native';
import Modal from 'react-native-modal';

import type { CalendarModel } from '@/apis/model';
import ChooseCalendarsActivity from '@/screens/calendars/choose-calendars-activity';

import { BORDER_COLOR_DARK } from '../theme/colors';
import BodyTitle from './BodyTitle';
import Header from './Header';

type Props = {
  onSelected?: (item: CalendarModel) => void;
  defaultSelected?: CalendarModel;
};

const ChooseCalendarActivityDropDown = ({
  defaultSelected,
  onSelected,
}: Props) => {
  const [isCalendarActivityOpen, setCalendarActivityOpen] =
    useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<
    CalendarModel | undefined
  >(defaultSelected);
  const onDismissActivityCalendar = useCallback(() => {
    setCalendarActivityOpen(false);
  }, []);

  const onSelectedActivityCalendar = useCallback((item: CalendarModel) => {
    setCalendarActivityOpen(false);
    setSelectedActivity(item);
    onSelected && onSelected(item);
  }, []);
  return (
    <VStack>
      <Header
        title={'Calendar Activity'}
        fontWeight={'700'}
        fontSize={17}
        mt={3}
      />
      <Pressable
        onPress={() => setCalendarActivityOpen(true)}
        borderWidth={2}
        mt={2}
        borderColor={BORDER_COLOR_DARK}
        borderRadius={15}
        bgColor={'white'}
        py={4}
        px={3}
        flexDirection={'row'}
        alignItems={'center'}
      >
        <BodyTitle
          numberOfLines={1}
          title={
            I18nManager.isRTL
              ? selectedActivity?.calendarName?.ar ?? 'Choose Activity'
              : selectedActivity?.calendarName?.en ?? 'Choose Activity'
          }
          fontSize={12}
          fontWeight={200}
        />
      </Pressable>
      <Modal
        coverScreen={true}
        backdropColor="white"
        style={{ margin: 0 }}
        isVisible={isCalendarActivityOpen}
        onDismiss={onDismissActivityCalendar}
        onModalHide={onDismissActivityCalendar}
      >
        <ChooseCalendarsActivity
          onSelected={onSelectedActivityCalendar}
          onDismiss={onDismissActivityCalendar}
          selectedActivity={selectedActivity}
        />
      </Modal>
    </VStack>
  );
};

export default ChooseCalendarActivityDropDown;
