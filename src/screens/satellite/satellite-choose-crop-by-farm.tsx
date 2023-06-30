import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, FlatList, View } from 'native-base';
import React, { useCallback, useState } from 'react';
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
  const [moreInfo, setMoreInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 10,
    skip: 0,
  });
  const route =
    useRoute<RouteProp<AuthStackParamList, 'SatelliteChooseCropByFarm'>>();

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
      if (
        userInfoo?.farmonautCropsAvailable &&
        userInfoo?.allowedArea &&
        item?.alowedArea
      ) {
        if (
          userInfoo?.farmonautCropsAvailable >= cropsSelected.length &&
          userInfoo?.allowedArea >= item?.alowedArea
        ) {
          setSatelliteCropData(item);
        } else {
          alertExceedSelected(
            userInfoo?.farmonautCropsAvailable < cropsSelected.length
              ? `you cannot select crops more than your plan.`
              : `You cannot select area ore than ${userInfoo?.allowedArea}`
          );
        }
      } else {
        alertExceedSelected(`you cannot select this crop.`);
      }
    },
    [cropsSelected, userInfoo]
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
                  cropsSelected.filter(
                    (x) => x?.cropDetails?.id === item?.cropDetails?.id
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
      {cropsSelected.length > 0 && (
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
