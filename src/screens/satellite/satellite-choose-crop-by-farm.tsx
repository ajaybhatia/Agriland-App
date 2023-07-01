import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, FlatList, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';

import { useGetApiFarmerAppGetcultivationdetailsbyfarmId } from '@/apis/endpoints/api';
import type {
  CultivationDetailResponse,
  FarmCropCultivationResponse,
} from '@/apis/model';
import { useAuth } from '@/core';
import { setSatelliteCropData, useSatelliteFarm } from '@/core/satellite-farm';
import type { AuthStackParamList } from '@/navigation/types';
import AppLoader from '@/ui/components/AppLoader';
import EmptyList from '@/ui/components/EmptyList';
import colors from '@/ui/theme/colors';

import SatelliteCropCell from '../crop/components/satellite-crop-cell';

function SatelliteChooseCropByFarm() {
  const nav = useNavigation();
  const userInfoo = useAuth.use.userInfos();
  const [crops, setCrops] = useState<CultivationDetailResponse[]>([]);
  const cropsSelected = useSatelliteFarm.use.satelliteSelectedCrops();
  const [newSelectedCrop, setNewSelectedCrop] = useState<
    CultivationDetailResponse[]
  >([]);
  const [moreInfo, setMoreInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 10,
    skip: 0,
  });
  const route =
    useRoute<RouteProp<AuthStackParamList, 'SatelliteChooseCropByFarm'>>();
  useEffect(() => {
    if (route?.params?.farmId) {
      const farmIndex = cropsSelected.findIndex(
        (x) => x.farmid === route?.params?.farmId
      );
      if (farmIndex >= 0) {
        setNewSelectedCrop(cropsSelected[farmIndex].crops);
      }
    }
  }, []);
  const getCrops = useGetApiFarmerAppGetcultivationdetailsbyfarmId(
    {
      farmId: route?.params?.farmId ?? '',
      skip: moreInfo.skip,
      take: moreInfo.take,
    },
    {
      query: {
        onSuccess: (data: FarmCropCultivationResponse) => {
          if (
            data &&
            data.cultivationDetails &&
            data.cultivationDetails.length > 0
          ) {
            setCrops(data.cultivationDetails);
          }
        },
      },
    }
  );
  const ListFooter = useCallback(() => {
    //View to set in Footer
    return (
      <View style={styles.headerFooterStyle}>
        {getCrops.isLoading && (
          <ActivityIndicator size="small" color="#00ff00" />
        )}
      </View>
    );
  }, [getCrops]);

  const onSelectCrop = useCallback(
    (item: CultivationDetailResponse) => {
      var countOfCrops = 0;
      let countOfCropsMap = cropsSelected.map((x) => {
        countOfCrops = countOfCrops + x.crops.length;
        return {
          it: x.crops,
        };
      });
      if (
        userInfoo?.farmonautCropsAvailable &&
        userInfoo?.allowedArea &&
        item?.alowedArea
      ) {
        if (
          userInfoo?.farmonautCropsAvailable >= countOfCrops &&
          userInfoo?.allowedArea >= item?.alowedArea
        ) {
          setSatelliteCropData({
            crops: item,
            farmid: route?.params?.farmId ?? '',
            farmname: route?.params?.farmName ?? '',
          });
          if (
            newSelectedCrop.filter((x) => x.farmCropId === item.farmCropId)
              .length > 0
          ) {
            setNewSelectedCrop(
              newSelectedCrop.filter((x) => x.farmCropId !== item.farmCropId)
            );
          } else {
            setNewSelectedCrop([...newSelectedCrop, item]);
          }
        } else {
          alertExceedSelected(
            userInfoo?.farmonautCropsAvailable < countOfCrops
              ? `you cannot select crops more than your plan.`
              : `You cannot select area ore than ${userInfoo?.allowedArea}`
          );
        }
      } else {
        alertExceedSelected(`you cannot select this crop.`);
      }
    },
    [
      cropsSelected,
      userInfoo?.farmonautCropsAvailable,
      userInfoo?.allowedArea,
      route?.params?.farmId,
      route?.params?.farmName,
      newSelectedCrop,
    ]
  );

  function alertExceedSelected(error: string) {
    Alert.alert('Warning!', error);
  }

  const onSave = useCallback(() => {
    nav.goBack();
  }, []);

  return (
    <View flex={1} backgroundColor={'white'}>
      <View flex={1} mx={5} justifyContent={'flex-start'}>
        <FlatList
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 70 }}
          // style={{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}
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
          ListFooterComponent={ListFooter}
          renderItem={({
            item,
            index,
          }: {
            item: CultivationDetailResponse;
            index: number;
          }) => {
            // console.log(isSelected);
            return (
              <SatelliteCropCell
                isSelected={
                  newSelectedCrop.filter(
                    (x) => x?.farmCropId === item?.farmCropId
                  ).length > 0
                }
                item={item}
                onSelect={onSelectCrop}
              />
            );
          }}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (
              getCrops.data &&
              getCrops.data.take !== undefined &&
              getCrops.data.skip !== undefined &&
              getCrops.data.totalCount !== undefined
            ) {
              if (
                !getCrops.isLoading &&
                !getCrops.isFetching &&
                getCrops.data.take <= crops.length &&
                getCrops.data.totalCount > crops.length
              ) {
                console.log(
                  'onEndReached Start',
                  getCrops.data.skip + moreInfo.take
                );
                setMoreInfo({
                  take: moreInfo.take,
                  skip: getCrops.data.skip + moreInfo.take,
                });
              }
            }
          }}
        />
      </View>
      {newSelectedCrop.length > 0 && (
        <Button
          backgroundColor={colors.button_color}
          onPress={onSave}
          borderRadius={8}
          width={'80%'}
          fontWeight={'normal'}
          fontSize={20}
          bottom={'5'}
          overflow={'hidden'}
          alignSelf={'center'}
          position={'absolute'}
        >
          {'Save'}
        </Button>
      )}
      {crops.length <= 0 && (getCrops.isLoading || getCrops.isFetching) && (
        <AppLoader />
      )}
    </View>
  );
}

export default SatelliteChooseCropByFarm;

const styles = StyleSheet.create({
  headerFooterStyle: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
