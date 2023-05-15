import { ActivityIndicator, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { HStack, Icon, Pressable, Text, VStack, View } from 'native-base';

import CropListCell from './components/crop-list-cell';
import type { CropRegisterType } from './add-crop-maps';
import CustomButton from '@/ui/components/CustomButton';
import { FlashList } from '@shopify/flash-list';
import Header from '@/ui/components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import Toast from 'react-native-toast-message';
import { usePostApiCropCreateCultivationDetails } from '@/apis/endpoints/api';
import { useTranslation } from 'react-i18next';

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
  const navigation = useNavigation();

  // add farm APi

  const addCropApi = usePostApiCropCreateCultivationDetails();

  function apiSubmitAddFarm(isAddNew: boolean) {
    addCropApi.mutate(
      {
        data: [
          {
            cropId: cropRequest?.crop?.id,
            farmId: cropRequest?.farm?.id,
            area: cropRequest?.cropArea?.area ?? null,
            coordinates: cropRequest?.userLocation?.map((v) => {
              return {
                lat: v.latitude,
                lng: v.longitude,
              };
            }),
            harvestDate: cropRequest?.cropArea?.harvestDate,
            sowingDate: cropRequest?.cropArea?.sowingDate,
            quantity: cropRequest?.cropArea?.quantity,
            typeOfIrrigation: cropRequest?.cropArea?.typeOfIrrigation,
          },
        ],
      },
      {
        onSuccess(data) {
          console.log('onSuccess ==> ', data);
          if (data) {
            Toast.show({
              type: 'error',
              text1: 'successfully added',
            });
            if (isAddNew) {
              onCropAddMore && onCropAddMore();
            } else {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    {
                      name: 'App',
                    },
                  ],
                })
              );
            }
          } else {
            Toast.show({
              type: 'error',
              text1: 'Something went wrong!',
            });
          }
        },
        onError(error) {
          console.log('onError ==> ', error);
          Toast.show({
            type: 'error',
            text1: error.message,
          });
        },
      }
    );
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