import { useNavigation } from '@react-navigation/native';
import { FlatList, View, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useGetApiCropGetCultivationDetailsByUserId } from '@/apis/endpoints/api';
import type {
  CultivationDetailResponse,
  FarmCropCultivationResponse,
} from '@/apis/model';
import ListHeader from '@/ui/components/ListHeader';

import TaskActivitesCell from '../home/components/task-activites-cell';
import CodingRequestCrop from './components/coding-request-crop';
import CropAddCell from './components/crop-add-cell';
import CropGrowthCell from './components/crop-growth-cell';
import CropMapSelectionCell from './components/crop-map-selection-cell';
import CropMarketingCell from './components/crop-marketing-cell';

const MyCropsScreen = () => {
  const nav = useNavigation();
  const [crops, setCrops] = useState<CultivationDetailResponse[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<
    CultivationDetailResponse | undefined
  >();
  const addNewCrop = useCallback(() => nav.navigate('AddFarmHomeScreen'), []);
  const [moreCropInfo, setMoreCropInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });

  const onSelectCrop = useCallback(
    (item?: CultivationDetailResponse) => {
      setSelectedCrop(item);
    },
    [setSelectedCrop]
  );

  const onCropCoding = useCallback(() => {
    nav.navigate('CropCodingScreen');
  }, [nav]);

  // get Crops

  const getCrops = useGetApiCropGetCultivationDetailsByUserId({
    query: {
      onSuccess: (data: FarmCropCultivationResponse) => {
        if (data && data?.cultivationDetails) {
          setCrops(
            moreCropInfo.skip <= 0
              ? data.cultivationDetails
              : [...crops, ...data.cultivationDetails]
          );
          if (
            selectedCrop === undefined &&
            data &&
            data?.cultivationDetails &&
            data?.cultivationDetails.length > 0
          ) {
            setSelectedCrop(data?.cultivationDetails[0]);
          } else if (selectedCrop && data?.cultivationDetails.length <= 0) {
            setSelectedCrop(undefined);
          }
        }
      },
      onError(err) {
        console.log('getCrops==> ', err.message);
      },
    },
  });
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
                  renderItem={({
                    item: itemCrop,
                  }: {
                    item: CultivationDetailResponse;
                  }) => (
                    <CropMapSelectionCell
                      item={itemCrop}
                      selectedItem={selectedCrop}
                      onSelectCrop={() => onSelectCrop(itemCrop)}
                    />
                  )}
                  //estimatedItemSize={300}
                />
              </VStack>
            );
          } else if (index === 1 && selectedCrop) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Tasks"
                  ml={5}
                  mr={5}
                  isSeeAllShow={true}
                  btnTitle="See All"
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                />
                <CropGrowthCell item={selectedCrop} />
                <TaskActivitesCell />
              </VStack>
            );
          } else if (index === 2) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Crop request for this crop"
                  ml={5}
                  mr={5}
                  isSeeAllShow={false}
                  btnTitle="See All"
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                />
                <CodingRequestCrop crop={selectedCrop} />
              </VStack>
            );
          } else if (index === 3) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Purchase Orders"
                  ml={5}
                  mr={5}
                  isSeeAllShow={false}
                  btnTitle="See All"
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                />
                <CropMarketingCell />
              </VStack>
            );
          }
          return <View />;
        }}
      />
    </View>
  );
};

export default MyCropsScreen;
