import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import type {
  CropBasicResponse,
  CropCategoryPaginatedResponse,
  CropCategoryResponse,
  FarmResponse,
} from '@/apis/model';
import {
  FlatList,
  Icon,
  Image as ImageBase,
  Pressable,
  VStack,
  View,
} from 'native-base';
import React, { useRef, useState } from 'react';
import {
  useGetApiCropGetCropCategories,
  useGetApiFarmGetFarms,
} from '@/apis/endpoints/api';

import AppLoader from '@/ui/components/AppLoader';
import ChooseCropScreen from './choose-crop-screen';
import type { CropRegisterType } from './add-crop-maps';
import EmptyList from '@/ui/components/EmptyList';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import FarmAddCell from './components/farm-add-cell';
import FarmMapSelectionCell from './components/farm-map-selection-cell';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '@/ui/components/Header';
import { I18nManager } from 'react-native';
import { Image } from 'expo-image';
import Modal from 'react-native-modal';
import colors from '@/ui/theme/colors';

type Props = {
  onPreviousSubmit?: () => void;
  onNextSubmit?: (
    farm: FarmResponse,
    crop: CropBasicResponse,
    cropCategory: CropCategoryResponse
  ) => void;
  cropInfo?: CropRegisterType;
};

function ChooseFarmCropCategory({
  onPreviousSubmit,
  onNextSubmit,
  cropInfo,
}: Props) {
  const ref = useRef();

  const scrollToIndex = (index: number) => {
    console.log('Scroll To ==> ', index);
    ref?.current?.scrollToIndex({
      index: index,
      animated: false,
    });
  };
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
  const [selectedCropCategory, setSelectedCropCategory] = useState<
    CropCategoryResponse | undefined
  >(cropInfo?.cropCategory);
  const [selectedFarm, setSelectedFarm] = useState<FarmResponse | undefined>(
    cropInfo?.farm
  );
  // Apis

  const getFarms = useGetApiFarmGetFarms(
    {
      // skip: moreInfo.skip,
      // take: moreInfo.take,
      sortColumn: 'createdOn',
      sortOrder: 'asc',
    },
    {
      query: {
        onSuccess: (data: FarmResponse[]) => {
          if (data.length > 0) {
            let isScroll = farms.length > 0 ? false : true;
            setFarms(moreInfo.skip <= 0 ? data : [...farms, ...data]);
            if (isScroll && I18nManager.isRTL) {
              setTimeout(() => scrollToIndex(0), 10);
            }
            if (selectedFarm === undefined && data.length > 0) {
              setSelectedFarm(data[0]);
            }
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

  const onCropSelected = (
    crop: CropBasicResponse,
    cropCategory: CropCategoryResponse
  ) => {
    setCropScreenOpen(false);
    onNextSubmit &&
      selectedFarm &&
      onNextSubmit(selectedFarm, crop, cropCategory);
  };

  const onCropSelectionClose = () => {
    setCropScreenOpen(false);
  };

  const onSelectFarm = (farm: FarmResponse) => {
    setSelectedFarm(farm);
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

        <FlatList
          ref={ref}
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 20,
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          extraData={selectedFarm || farms.length}
          keyExtractor={(item, index) => `${index}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={farms}
          initialNumToRender={3}
          ListHeaderComponent={
            <FarmAddCell onPreviousSubmit={onPreviousSubmit} />
          }
          renderItem={({
            item,
            index,
          }: {
            item: FarmResponse;
            index: number;
          }) => (
            <FarmMapSelectionCell
              item={item}
              selectedItem={selectedFarm}
              onSelectFarm={onSelectFarm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            console.log('onEndReached');
            if (
              !getFarms.isLoading &&
              !getFarms.isFetching &&
              moreInfo.take <= farms.length
            ) {
              setMoreInfo({
                take: moreInfo.take,
                skip: moreInfo.skip + moreInfo.take,
              });
            }
          }}
          ListFooterComponent={
            (getFarms.isLoading || getFarms.isFetching) &&
            farms.length > 0 && (
              <View
                alignItems={'center'}
                justifyContent={'center'}
                alignSelf={'center'}
                h={100}
                pr={5}
              >
                <ActivityIndicator size="small" color="#00ff00" />
              </View>
            )
          }
          //estimatedItemSize={300}
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
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          }}
        />
      </VStack>
      <Header title={'Choose Crop Category'} mt={5} mb={2} ml={5} mr={5} />
      <View flex={1} mx={5}>
        <FlatList
          horizontal={false}
          numColumns={2}
          keyExtractor={(item, index) => `${index}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={cropCategories}
          extraData={
            getCropCategories.isLoading ||
            getCropCategories.isFetching ||
            selectedCropCategory
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
              //flex={1}
              w={Dimensions.get('screen').width / 2.5}
              h={150}
              bgColor={'amber.400'}
              flexDirection={'column'}
              margin={2}
              onPress={() => {
                setSelectedCropCategory(item);
                setCropScreenOpen(true);
              }}
            >
              <>
                {item.imageUrl && item.imageUrl !== null ? (
                  <Image
                    style={{ height: 150 }}
                    source={`http://95.111.231.114:88${item.imageUrl}`}
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
                {selectedCropCategory &&
                  selectedCropCategory?.id === item?.id && (
                    <View
                      position={'absolute'}
                      left={0}
                      right={0}
                      top={0}
                      bottom={0}
                      justifyContent={'center'}
                      alignItems={'center'}
                      bgColor={'rgba(0,0,0,0.5)'}
                    >
                      <Icon
                        as={FontAwesome}
                        name={'check'}
                        size={'2xl'}
                        color={'white'}
                      />
                    </View>
                  )}
              </>
            </Pressable>
          )}
          ListFooterComponent={
            (getCropCategories.isLoading || getCropCategories.isFetching) &&
            cropCategories.length > 0 && (
              <View h={50}>
                <ActivityIndicator size="small" color="#00ff00" />
              </View>
            )
          }
          listFooterComponentStyle={{ flexGrow: 1 }}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            console.log('onEndReached');
            if (
              !getCropCategories.isLoading &&
              !getCropCategories.isFetching &&
              moreCategoryInfo.take <= cropCategories.length
            ) {
              setMoreInfo({
                take: moreCategoryInfo.take,
                skip: moreCategoryInfo.skip + moreCategoryInfo.take,
              });
            }
          }}
          //estimatedItemSize={300}
        />
      </View>
      {((farms.length <= 0 && (getFarms.isLoading || getFarms.isFetching)) ||
        (cropCategories.length <= 0 &&
          (getCropCategories.isLoading || getCropCategories.isFetching))) && (
        <AppLoader />
      )}
      <Modal
        coverScreen={true}
        backdropColor="white"
        style={{ margin: 0 }}
        isVisible={isCropScreeenOpen && selectedCropCategory !== undefined}
        onDismiss={() => setCropScreenOpen(false)}
        onModalHide={() => setCropScreenOpen(false)}
      >
        <ChooseCropScreen
          onCropSelected={onCropSelected}
          onCropSelectionClose={onCropSelectionClose}
          cropCategory={selectedCropCategory}
          defaultCrop={cropInfo?.crop}
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
