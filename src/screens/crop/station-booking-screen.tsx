import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, View, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';

import { useGetApiCropGetCrops } from '@/apis/endpoints/api';
import type { CropResponse } from '@/apis/model';
import CounterInput from '@/ui/components/CounterInput';
import ListHeader from '@/ui/components/ListHeader';
import colors from '@/ui/theme/colors';

import AnotherServicesCell from './components/another-services-cell';
import CropAddCell from './components/crop-add-cell';
import CropCalendarCell from './components/crop-calendar-cell';
import CropMapSelectionCell from './components/crop-map-selection-cell';

type Props = {};

const StationBookingScreen = (props: Props) => {
  const nav = useNavigation();
  const [crops, setCrops] = useState<CropResponse[]>([]);
  const [quantity, setQuanitity] = useState<number>(1);
  const [selectedCrop, setSelectedCrop] = useState<CropResponse | undefined>();
  const addNewCrop = useCallback(() => nav.navigate('AddFarmHomeScreen'), []);
  const [moreCropInfo, setMoreCropInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });

  // get Crops

  const getCrops = useGetApiCropGetCrops(
    {
      // skip: moreFarmInfo.skip,
      // take: moreFarmInfo.take,
    },
    {
      query: {
        onSuccess: (data: CropResponse[]) => {
          console.log('data ===> ', data);
          if (data && data.length > 0) {
            setCrops(moreCropInfo.skip <= 0 ? data : [...crops, ...data]);
            if (selectedCrop === undefined && data && data.length > 0) {
              setSelectedCrop(data[0]);
            }
          }
        },
        onError(err) {
          console.log('getCrops==> ', err.message);
        },
      },
    }
  );

  const onSelectCrop = useCallback(
    (item: CropResponse) => {
      setSelectedCrop(item);
    },
    [setSelectedCrop]
  );
  const onNewNumber = useCallback(
    (v: number) => {
      setQuanitity(v);
    },
    [setQuanitity]
  );
  return (
    <View flex={1} backgroundColor={'white'}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item, index }: { item: number; index: number }) => {
          if (index === 0) {
            return (
              <VStack mt={2}>
                <FlatList
                  horizontal
                  initialNumToRender={3}
                  extraData={crops.length || selectedCrop}
                  keyExtractor={(item, indexV) => `${indexV}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={crops}
                  ListHeaderComponent={
                    <CropAddCell onPreviousSubmit={addNewCrop} />
                  }
                  renderItem={({ item: itemCrop }: { item: CropResponse }) => (
                    <CropMapSelectionCell
                      item={itemCrop}
                      selectedItem={selectedCrop}
                      onSelectCrop={onSelectCrop}
                    />
                  )}
                  //estimatedItemSize={300}
                />
              </VStack>
            );
          } else if (index === 1) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Quantity That Needs To Be Stores"
                  ml={5}
                  mr={5}
                  isSeeAllShow={false}
                />
                <View mx={5}>
                  <CounterInput defaultValue={1} onNewNumber={onNewNumber} />
                </View>
              </VStack>
            );
          } else if (index === 2) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Storage Duration "
                  ml={5}
                  mr={5}
                  isSeeAllShow={false}
                />
                <CropCalendarCell />
              </VStack>
            );
          } else if (index === 3) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Another Services "
                  ml={5}
                  mr={5}
                  isSeeAllShow={false}
                />
                <AnotherServicesCell />
              </VStack>
            );
          } else if (index === 4) {
            return (
              <VStack justifyContent={'center'}>
                <Button
                  backgroundColor={colors.button_color}
                  borderRadius={8}
                  width={'80%'}
                  mt={30}
                  fontWeight={'normal'}
                  fontSize={20}
                  overflow={'hidden'}
                  alignSelf={'center'}
                >
                  {'Continue'}
                </Button>
              </VStack>
            );
          }
          return <View />;
        }}
      />
    </View>
  );
};

export default StationBookingScreen;
