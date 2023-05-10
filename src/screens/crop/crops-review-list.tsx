import { FlashList } from '@shopify/flash-list';
import { HStack, Icon, Pressable, Text, View, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { usePostApiCropCreateCultivationDetails } from '@/apis/endpoints/api';
import CustomButton from '@/ui/components/CustomButton';
import Header from '@/ui/components/Header';

import type { CropRegisterType } from './add-crop-maps';
import CropListCell from './components/crop-list-cell';

type Props = {
  addMoreCrop?: () => void;
  onNextStep?: () => void;
  onEditStep?: (farmInfo: CropRegisterType) => void;
  cropRequest?: CropRegisterType;
};
const CropsReviewList = ({
  addMoreCrop,
  onEditStep,
  onNextStep,
  cropRequest,
}: Props) => {
  const { t } = useTranslation();

  // add farm APi

  const addCropApi = usePostApiCropCreateCultivationDetails();

  function apiSubmitAddFarm(isAddNew: boolean) {
    onCropAddMore && onCropAddMore();
    // addCropApi.mutate(
    //   {
    //     data: [
    //       {
    //         cropId: cropRequest?.crop?.id,
    //         farmId: cropRequest?.farm?.id,
    //         area: cropRequest?.cropArea?.area ?? null,
    //         coordinates: cropRequest?.userLocation?.map((v) => {
    //           return {
    //             lat: v.latitude,
    //             lng: v.longitude,
    //           };
    //         }),
    //         harvestDate: cropRequest?.cropArea?.harvestDate,
    //         sowingDate: cropRequest?.cropArea?.sowingDate,
    //         quantity: cropRequest?.cropArea?.quantity,
    //         typeOfIrrigation: cropRequest?.cropArea?.typeOfIrrigation,
    //       },
    //     ],
    //   },
    //   {
    //     onSuccess(data) {
    //       console.log('onSuccess ==> ', data);
    //       if (data) {
    //         if (isAddNew) {
    //           onCropAddMore && onCropAddMore();
    //         } else {
    //           onNextStep && onNextStep();
    //           Toast.show({
    //             type: 'error',
    //             text1: 'successfully added',
    //           });
    //         }
    //       } else {
    //         Toast.show({
    //           type: 'error',
    //           text1: 'Something went wrong!',
    //         });
    //       }
    //     },
    //     onError(error) {
    //       console.log('onError ==> ', error);
    //       Toast.show({
    //         type: 'error',
    //         text1: error.message,
    //       });
    //     },
    //   }
    // );
  }

  function onFarmEdit() {
    onEditStep && onEditStep(cropRequest!);
  }

  function onCropAddMore() {
    addMoreCrop && addMoreCrop();
  }

  return (
    <View style={styles.fullscreen} px={5}>
      <Header
        title={t('Crop Data Review')}
        mt={2}
        mb={2}
        btnTitle={t('edit')}
        iconName="edit"
        as={MaterialIcons}
        iconSize={'md'}
        onRightIconClick={onFarmEdit}
      />
      <FlashList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        keyExtractor={(item, index) => `${index}`}
        data={cropRequest ? [cropRequest] : []}
        renderItem={({
          item,
          index,
        }: {
          item: CropRegisterType;
          index: number;
        }) => <CropListCell cropInfo={item} />}
        estimatedItemSize={300}
      />
      <VStack position={'absolute'} bottom={10} left={0} right={0}>
        <CustomButton
          isLoading={addCropApi.isLoading}
          mt={2}
          onPress={() => apiSubmitAddFarm(false)}
          width={'80%'}
          title={t('save')}
        />

        <Pressable
          onPress={() => !addCropApi.isLoading && apiSubmitAddFarm(true)}
          mt={5}
          backgroundColor={'#FFF'}
          width={'80%'}
          alignSelf={'center'}
          borderColor={'amber.600'}
          borderWidth={1}
          borderRadius={10}
          overflow={'hidden'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <HStack alignItems={'center'} py={2}>
            {!addCropApi.isLoading ? (
              <>
                <Text color={'amber.600'} fontWeight={'normal'} fontSize={16}>
                  {'Save And Add New Crop'}
                </Text>
                <Icon
                  ml={2}
                  as={MaterialCommunityIcons}
                  name={'plus-circle'}
                  size={'lg'}
                  color={'amber.600'}
                />
              </>
            ) : (
              <ActivityIndicator size="small" color="#00ff00" />
            )}
          </HStack>
        </Pressable>
      </VStack>
    </View>
  );
};

export default CropsReviewList;

const styles = StyleSheet.create({
  fullscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});
