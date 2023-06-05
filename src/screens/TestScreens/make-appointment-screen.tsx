import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, View, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';

import { useGetApiFarmGetFarms } from '@/apis/endpoints/api';
import type { FarmResponse } from '@/apis/model';
import ListHeader from '@/ui/components/ListHeader';
import colors from '@/ui/theme/colors';

import CropCalendarCell from '../crop/components/crop-calendar-cell';
import FarmAddCell from '../crop/components/farm-add-cell';
import FarmMapSelectionCell from '../crop/components/farm-map-selection-cell';

type Props = {};

const MakeAppointmentScreen = (props: Props) => {
  const nav = useNavigation();
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<FarmResponse | undefined>();
  const [moreFarmInfo, setMoreFarmInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });

  const onSelectFarm = useCallback(
    (item: FarmResponse) => {
      setSelectedFarm(item);
    },
    [setSelectedFarm]
  );

  const addNewFarm = useCallback(() => nav.navigate('AddFarmHomeScreen'), []);

  const getFarms = useGetApiFarmGetFarms(
    {
      // skip: moreFarmInfo.skip,
      // take: moreFarmInfo.take,
    },
    {
      query: {
        onSuccess: (data: FarmResponse[]) => {
          console.log('\n\n\ndata ===> ', data.length, '\n\n\n');
          if (data.length > 0) {
            setFarms(moreFarmInfo.skip <= 0 ? data : [...farms, ...data]);
            if (selectedFarm === undefined && data.length > 0) {
              setSelectedFarm(data[0]);
            }
          }
        },
      },
    }
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
                <ListHeader
                  title="Choose the crop you want to code"
                  ml={5}
                  mr={5}
                  mb={3}
                  mt={3}
                  isSeeAllShow={false}
                />
                <FlatList
                  horizontal
                  initialNumToRender={3}
                  extraData={farms.length || selectedFarm}
                  keyExtractor={(item, indexV) => `${indexV}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={farms}
                  ListHeaderComponent={
                    <FarmAddCell onPreviousSubmit={addNewFarm} />
                  }
                  renderItem={({ item: farm }: { item: FarmResponse }) => (
                    <FarmMapSelectionCell
                      item={farm}
                      selectedItem={selectedFarm}
                      onSelectFarm={onSelectFarm}
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
                  title="Make an appointment"
                  ml={5}
                  mr={5}
                  isSeeAllShow={false}
                />
                <CropCalendarCell />
              </VStack>
            );
          } else if (index === 3) {
            return (
              <VStack justifyContent={'center'} py={3}>
                <Button
                  onPress={() => nav.navigate('StationBookingScreen')}
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

export default MakeAppointmentScreen;
