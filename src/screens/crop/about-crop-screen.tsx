import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  Button,
  HStack,
  Radio,
  ScrollView,
  Stack,
  View,
  VStack,
} from 'native-base';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import type { CalendarModel, FarmCropsDetailResponse } from '@/apis/model';
import {
  setRegisterCalendarActivityData,
  useRegisterFarm,
} from '@/core/register-farm';
import BodyTitle from '@/ui/components/BodyTitle';
import CalendarView from '@/ui/components/CalendarView';
import ChooseCalendarActivityDropDown from '@/ui/components/ChooseCalendarActivityDropDown';
import CounterInput from '@/ui/components/CounterInput';
import Header from '@/ui/components/Header';
import colors from '@/ui/theme/colors';

dayjs.extend(utc);

type Props = {
  cropRequest?: FarmCropsDetailResponse;
  onNext?: (cropRequest: FarmCropsDetailResponse) => void;
};

export default function AboutCropScreen({ cropRequest, onNext }: Props) {
  const selectedCalendarActivity =
    useRegisterFarm.use.selectedCalendarActivity();
  const [myCropRequest, setMyCropRequest] = useState<FarmCropsDetailResponse>(
    cropRequest
      ? cropRequest
      : {
          harvestDate: dayjs(new Date()).utc().format(),
          sowingDate: dayjs(new Date()).utc().format(),
          quantity: 1,
          typeOfIrrigation: 1,
        }
  );

  const { t } = useTranslation();
  const onSowingDate = (date: Date) => {
    setMyCropRequest((r) => {
      const v = {
        ...r,
        sowingDate: dayjs(date).utc().format(),
      };
      return v;
    });
  };
  const onHarvestDate = (date: Date) => {
    setMyCropRequest((r) => {
      const v = {
        ...r,
        harvestDate: dayjs(date).utc().format(),
      };
      return v;
    });
  };
  const onNewNumber = (v: number) => {
    setMyCropRequest((r) => {
      const vx = {
        ...r,
        quantity: v,
      };
      return vx;
    });
  };

  const onSelectedActivity = useCallback((item: CalendarModel) => {
    setRegisterCalendarActivityData(item);
  }, []);

  return (
    <View
      position={'absolute'}
      left={0}
      right={0}
      bottom={0}
      top={0}
      backgroundColor={'white'}
    >
      <ScrollView>
        <VStack pb={5} mx={5}>
          <HStack alignItems={'center'}>
            <Header
              title={'Enter The Quantity Of Crop'}
              fontWeight={'700'}
              fontSize={17}
            />
            <BodyTitle
              numberOfLines={1}
              title="(tons)"
              fontSize={12}
              ml={3}
              fontWeight={300}
            />
          </HStack>
          <CounterInput
            defaultValue={cropRequest?.quantity ?? 1}
            onNewNumber={onNewNumber}
          />

          <CalendarView
            title="Sowing Date"
            onDateSelected={onSowingDate}
            defaultDate={
              myCropRequest?.sowingDate
                ? dayjs(myCropRequest?.sowingDate).local().toDate()
                : new Date()
            }
          />
          <CalendarView
            title="Harvest Date"
            onDateSelected={onHarvestDate}
            defaultDate={
              myCropRequest?.harvestDate
                ? dayjs(myCropRequest?.harvestDate).local().toDate()
                : new Date()
            }
          />

          <ChooseCalendarActivityDropDown
            onSelected={onSelectedActivity}
            defaultSelected={selectedCalendarActivity}
          />
          <Header
            title={'Type Of Irrigation'}
            fontWeight={'700'}
            fontSize={17}
            mt={3}
          />
          <Radio.Group
            name="exampleGroup"
            defaultValue="1"
            accessibilityLabel="pick a size"
            value={`${myCropRequest?.typeOfIrrigation ?? 1}`}
            onChange={(nextValue) => {
              setMyCropRequest((r) => {
                const v = {
                  ...r,
                  typeOfIrrigation: Number(nextValue),
                };
                return v;
              });
            }}
          >
            <Stack
              mt={3}
              direction={{
                base: 'row',
                md: 'row',
              }}
              alignItems={{
                base: 'flex-start',
                md: 'center',
              }}
              space={4}
              w="75%"
              maxW="300px"
            >
              <Radio value="1" colorScheme="red" size="sm" my={1}>
                New
              </Radio>
              <Radio value="0" colorScheme="red" size="sm" my={1}>
                Traditional
              </Radio>
            </Stack>
          </Radio.Group>

          <Button
            //disabled={!selectedCalendarActivity}
            backgroundColor={colors.button_color}
            onPress={() => {
              if (selectedCalendarActivity) {
                onNext && onNext(myCropRequest);
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Please Add Calendar ID',
                });
              }
            }}
            borderRadius={8}
            width={'80%'}
            mt={30}
            fontWeight={'normal'}
            fontSize={20}
            overflow={'hidden'}
            alignSelf={'center'}
          >
            {t('save')}
          </Button>
        </VStack>
      </ScrollView>
    </View>
  );
}
