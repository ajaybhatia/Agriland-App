import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { Pressable, View, VStack } from 'native-base';
import React, { useState } from 'react';

import { useGetApiCropGetCropById } from '@/apis/endpoints/api';
import type { CropBasicResponse, FarmCropsResponse } from '@/apis/model';
import AppLoader from '@/ui/components/AppLoader';
import BodyTitle from '@/ui/components/BodyTitle';
import EmptyList from '@/ui/components/EmptyList';
import Header from '@/ui/components/Header';

type Props = {
  onCropSelected?: () => void;
  onCropSelectionClose?: () => void;
  Id: string;
};

function ChooseCropScreen({ onCropSelected, onCropSelectionClose, Id }: Props) {
  const [crops, setCrops] = useState<CropBasicResponse[]>([]);
  const getCrops = useGetApiCropGetCropById(
    {
      id: Id,
    },
    {
      query: {
        onSuccess: (data: FarmCropsResponse) => {
          console.log('data ===> ', data);
          if (data.cropDetails && data.cropDetails.length > 0) {
            setCrops(data.cropDetails);
          }
        },
      },
    }
  );
  return (
    <View flex={1} backgroundColor={'white'} mt={10}>
      <Header
        title={'Choose A Crop'}
        mt={10}
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
          }) => (
            <Pressable
              overflow={'hidden'}
              flex={1}
              flexDirection={'column'}
              margin={2}
              onPress={onCropSelected}
            >
              <VStack justifyContent={'center'} alignItems={'center'}>
                <View
                  rounded={'full'}
                  flex={1}
                  overflow={'hidden'}
                  p={1}
                  h={100}
                  borderColor={'blue.200'}
                  borderWidth={2}
                >
                  <Image
                    style={{ height: 100 }}
                    source={item.imageUrl}
                    //placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                  />
                </View>
                <BodyTitle
                  numberOfLines={1}
                  title="Pepper"
                  fontSize={12}
                  fontWeight={300}
                />
              </VStack>
            </Pressable>
          )}
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
