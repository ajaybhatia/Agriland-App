import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { Icon, Pressable, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useGetApiCropGetCropsByCategoryId } from '@/apis/endpoints/api';
import type { CropBasicResponse, CropCategoryResponse } from '@/apis/model';
import AppLoader from '@/ui/components/AppLoader';
import BodyTitle from '@/ui/components/BodyTitle';
import EmptyList from '@/ui/components/EmptyList';
import Header from '@/ui/components/Header';

type Props = {
  onCropSelected?: (
    crop: CropBasicResponse,
    category: CropCategoryResponse
  ) => void;
  onCropSelectionClose?: () => void;
  cropCategory?: CropCategoryResponse;
  defaultCrop?: CropBasicResponse;
};

function ChooseCropScreen({
  onCropSelected,
  onCropSelectionClose,
  cropCategory,
  defaultCrop,
}: Props) {
  const [crops, setCrops] = useState<CropBasicResponse[]>([]);
  const getCrops = useGetApiCropGetCropsByCategoryId(
    {
      id: cropCategory?.id ?? '',
    },
    {
      query: {
        onSuccess: (data: CropBasicResponse[]) => {
          if (data && data.length > 0) {
            setCrops(data);
          }
        },
      },
    }
  );
  return (
    <View flex={1} backgroundColor={'white'}>
      <Header
        title={'Choose A Crop'}
        mt={5}
        mb={2}
        ml={5}
        mr={5}
        iconName={'close'}
        onRightIconClick={onCropSelectionClose}
      />
      <View flex={1} mx={5}>
        <FlashList
          horizontal={false}
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={crops}
          keyExtractor={(item, index) => `${index}`}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListEmptyComponent={() =>
            crops.length <= 0 && !getCrops.isLoading && !getCrops.isFetching ? (
              <EmptyList value={'Crops not found'} />
            ) : null
          }
          renderItem={({
            item,
            index,
          }: {
            item: CropBasicResponse;
            index: number;
          }) => {
            return (
              <Pressable
                overflow={'hidden'}
                flex={1}
                margin={2}
                onPress={() =>
                  onCropSelected &&
                  cropCategory &&
                  onCropSelected(item, cropCategory)
                }
              >
                <VStack justifyContent={'center'} alignItems={'center'}>
                  <View
                    borderRadius={Dimensions.get('screen').width / 4 / 2}
                    flex={1}
                    overflow={'hidden'}
                    p={1}
                    h={Dimensions.get('screen').width / 4}
                    w={Dimensions.get('screen').width / 4}
                    borderColor={item?.colorCode ?? 'blue.200'}
                    borderWidth={2}
                  >
                    <Image
                      style={{ flex: 1 }}
                      source={`http://95.111.231.114:88${item.imageUrl}`}
                      placeholder={require('@assets/app-logo.png')}
                      contentFit="cover"
                      transition={1000}
                    />
                    {defaultCrop && defaultCrop?.id === item?.id && (
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
                  </View>
                  <BodyTitle
                    numberOfLines={1}
                    title={item?.name ?? ''}
                    fontSize={12}
                    fontWeight={300}
                  />
                </VStack>
              </Pressable>
            );
          }}
          estimatedItemSize={300}
        />
      </View>

      {crops.length <= 0 && (getCrops.isLoading || getCrops.isFetching) && (
        <AppLoader />
      )}
    </View>
  );
}

export default ChooseCropScreen;
