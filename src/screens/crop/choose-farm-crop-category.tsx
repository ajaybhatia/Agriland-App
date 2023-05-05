import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { Image as ImageBase, Pressable, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import Modal from 'react-native-modal';

import {
  useGetApiCropGetCropCategories,
  useGetApiFarmGetFarms,
} from '@/apis/endpoints/api';
import type {
  CropCategoryPaginatedResponse,
  CropCategoryResponse,
  FarmResponse,
} from '@/apis/model';
import AppLoader from '@/ui/components/AppLoader';
import EmptyList from '@/ui/components/EmptyList';
import Header from '@/ui/components/Header';
import colors from '@/ui/theme/colors';

import ChooseCropScreen from './choose-crop-screen';
import FarmAddCell from './components/farm-add-cell';
import FarmMapSelectionCell from './components/farm-map-selection-cell';

type Props = {
  onPreviousSubmit?: () => void;
};

function ChooseFarmCropCategory({ onPreviousSubmit }: Props) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [isCropScreeenOpen, setCropScreenOpen] = useState<boolean>(false);
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [cropCategories, setCropCategories] = useState<CropCategoryResponse[]>(
    []
  );
  const [moreInfo, setMoreInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });
  const [moreCategoryInfo, setMoreCategoryInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });
  // Apis

  const getFarms = useGetApiFarmGetFarms(
    {
      skip: moreInfo.skip,
      take: moreInfo.take,
    },
    {
      query: {
        onSuccess: (data: FarmResponse[]) => {
          if (data.length > 0) {
            setFarms(moreInfo.skip <= 0 ? data : [...farms, ...data]);
          }
        },
      },
    }
  );

  const getCropCategories = useGetApiCropGetCropCategories(
    {
      skip: moreCategoryInfo.skip,
      take: moreCategoryInfo.take,
    },
    {
      query: {
        onSuccess: (data: CropCategoryPaginatedResponse) => {
          if (
            data.cropCategoryResponses &&
            data.cropCategoryResponses.length > 0
          ) {
            setCropCategories(
              moreCategoryInfo.skip <= 0
                ? data.cropCategoryResponses
                : [...cropCategories, ...data.cropCategoryResponses]
            );
          }
        },
      },
    }
  );

  const onCropSelected = () => {
    console.log('crop Selected');
    setCropScreenOpen(false);
  };

  const onCropSelectionClose = () => {
    setCropScreenOpen(false);
  };

  return (
    <View
      position={'absolute'}
      left={0}
      right={0}
      bottom={0}
      top={0}
      backgroundColor={'white'}
    >
      <VStack pb={5}>
        <Header title={'Choose A Farm'} mt={5} mb={2} ml={5} mr={5} />
        <FlashList
          horizontal
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={farms}
          ListHeaderComponent={
            <FarmAddCell onPreviousSubmit={onPreviousSubmit} />
          }
          renderItem={({
            item,
            index,
          }: {
            item: FarmResponse;
            index: number;
          }) => <FarmMapSelectionCell item={item} />}
          estimatedItemSize={300}
        />
        <ExpandingDot
          data={farms}
          expandingDotWidth={8}
          scrollX={scrollX}
          inActiveDotOpacity={0.3}
          dotStyle={styles.dotStyle}
          activeDotColor={colors.button_color}
          containerStyle={{
            bottom: 0,
          }}
        />
      </VStack>
      <Header title={'Choose Crop Category'} mt={5} mb={2} ml={5} mr={5} />
      <View flex={1} mx={5}>
        <FlashList
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={cropCategories}
          extraData={
            getCropCategories.isLoading || getCropCategories.isFetching
          }
          // eslint-disable-next-line react/no-unstable-nested-components
          ListEmptyComponent={() =>
            cropCategories.length <= 0 &&
            !getCropCategories.isLoading &&
            !getCropCategories.isFetching ? (
              <EmptyList value={'Crop Category not found'} />
            ) : null
          }
          renderItem={({
            item,
            index,
          }: {
            item: CropCategoryResponse;
            index: number;
          }) => (
            <Pressable
              borderRadius={10}
              overflow={'hidden'}
              flex={1}
              h={150}
              bgColor={'amber.400'}
              flexDirection={'column'}
              margin={2}
              onPress={() => setCropScreenOpen(true)}
            >
              {item.imageUrl && item.imageUrl !== null ? (
                <Image
                  style={{ height: 150 }}
                  source={item.imageUrl}
                  placeholder={require('@assets/app-logo.png')}
                  contentFit="cover"
                  transition={1000}
                />
              ) : (
                <ImageBase
                  alt=""
                  h={150}
                  resizeMode={'cover'}
                  source={require('@assets/app-logo.png')}
                />
              )}
            </Pressable>
          )}
          estimatedItemSize={300}
        />
      </View>
      {((farms.length <= 0 && (getFarms.isLoading || getFarms.isFetching)) ||
        (cropCategories.length <= 0 &&
          (getCropCategories.isLoading || getCropCategories.isFetching))) && (
        <AppLoader />
      )}
      <Modal
        coverScreen={true}
        statusBarTranslucent={true}
        style={{ margin: 0 }}
        isVisible={isCropScreeenOpen}
        onDismiss={() => setCropScreenOpen(false)}
        onModalHide={() => setCropScreenOpen(false)}
      >
        <ChooseCropScreen
          onCropSelected={onCropSelected}
          onCropSelectionClose={onCropSelectionClose}
          farmId={farms.length > 0 ? farms[0]?.id ?? '' : ''}
        />
      </Modal>
    </View>
  );
}

export default ChooseFarmCropCategory;

const styles = StyleSheet.create({
  dotStyle: {
    width: 8,
    height: 8,
    backgroundColor: colors.button_color,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
