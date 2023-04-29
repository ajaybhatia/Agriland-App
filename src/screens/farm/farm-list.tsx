import { FlashList } from '@shopify/flash-list';
import { HStack, Icon, Pressable, Text, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { usePostApiFarmCreateUpdateFarm } from '@/apis/endpoints/api';
import type { FarmRequest } from '@/apis/model';
import CustomButton from '@/ui/components/CustomButton';
import Header from '@/ui/components/Header';

import type { FarmInfoModal } from '../maps-views/add-farm-crop-maps';
import FarmListCell from './components/farm-list-cell';

type Props = {
  addMoreFarm?: () => void;
  onNextStep?: () => void;
  onEditStep?: (farmInfo: FarmRequest & FarmInfoModal) => void;
  farmRequest?: FarmRequest & FarmInfoModal;
};
const FarmList = ({
  addMoreFarm,
  onEditStep,
  onNextStep,
  farmRequest,
}: Props) => {
  const { t } = useTranslation();
  const [farmInfo, setFarmInfo] = useState<FarmRequest & FarmInfoModal[]>(
    farmRequest ? [farmRequest] : []
  );
  // add farm APi

  const addFarmApi = usePostApiFarmCreateUpdateFarm();

  function apiSubmitAddFarm(isAddNew: boolean) {
    addFarmApi.mutate(
      {
        data: {
          name: farmRequest?.name,
          coordinates: farmRequest?.coordinates,
          governorateFieldId: farmRequest?.governorateFieldId,
          cityId: farmRequest?.cityId,
          villageId: farmRequest?.villageId,
          address: farmRequest?.address,
          organization: farmRequest?.organization,
        },
      },
      {
        onSuccess(data) {
          if (data) {
            if (isAddNew) {
              onFarmAddMore && onFarmAddMore();
            } else {
              onNextStep && onNextStep();
            }
          } else {
            Toast.show({
              type: 'error',
              text1: 'Something went wrong!',
            });
          }
        },
        onError(error) {
          Toast.show({
            type: 'error',
            text1: error.message,
          });
        },
      }
    );
  }

  function onFarmEdit() {
    onEditStep && onEditStep(farmRequest!);
  }

  function onFarmAddMore() {
    addMoreFarm && addMoreFarm();
  }

  return (
    <View style={styles.fullscreen} px={5}>
      <Header
        title={t('farm-data-review')}
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
        contentContainerStyle={{ paddingBottom: 120 }}
        data={farmInfo}
        renderItem={({
          item,
          index,
        }: {
          item: FarmRequest & FarmInfoModal;
          index: number;
        }) => <FarmListCell farmInfo={item} />}
        estimatedItemSize={300}
      />
      <VStack position={'absolute'} bottom={10} left={0} right={0}>
        <CustomButton
          isLoading={addFarmApi.isLoading}
          mt={2}
          onPress={() => apiSubmitAddFarm(false)}
          width={'80%'}
          title={t('save')}
        />

        <Pressable
          onPress={() => !addFarmApi.isLoading && apiSubmitAddFarm(true)}
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
            {!addFarmApi.isLoading ? (
              <>
                <Text color={'amber.600'} fontWeight={'normal'} fontSize={16}>
                  {t('save-and-add-new-farm')}
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

export default FarmList;

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
