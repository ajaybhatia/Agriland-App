import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { usePostApiFarmerAppGetfarmonautcrops } from '@/apis/endpoints/api';
import type { FarmonautCropModelPaginated, FarmonautFarm } from '@/apis/model';
import { useAuth } from '@/core';
import { AddSubscriptionMoreCrop } from '@/navigation/types';
import AppLoader from '@/ui/components/AppLoader';
import colors from '@/ui/theme/colors';

import SatelliteCropsWithFarmName from './components/satellite-crops-with-farmname';

function SatelliteSelectedCropsList() {
  const userInfoo = useAuth.use.userInfos();
  const nav = useNavigation();
  const getSubScriptionData = usePostApiFarmerAppGetfarmonautcrops();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [farms, setFarms] = useState<FarmonautFarm[]>([]);
  useEffect(() => {
    getAllSubscription(0, 10);
  }, []);

  function getAllSubscription(skip: number, take: number) {
    getSubScriptionData.mutate(
      {
        params: {
          skip: skip,
          take: take,
        },
      },
      {
        onSuccess: (data: FarmonautCropModelPaginated) => {
          setRefreshing(false);
          if (data && data?.farmonautFarms) {
            console.log('getAllSubscription ===> ', data);
            if (data && data.skip === 0) {
              setFarms(data?.farmonautFarms ?? []);
            } else {
              setFarms([...farms, ...data?.farmonautFarms]);
            }
          } else {
            Toast.show({
              type: 'error',
              text1: 'Something went wrong!',
            });
          }
        },
        onError: (er) => {
          setRefreshing(false);
          Toast.show({
            type: 'error',
            text1: er?.message ?? 'Something went wrong!',
          });
        },
      }
    );
  }

  const _onRefresh = () => {
    setRefreshing(true);
    getAllSubscription(0, 10);
  };

  return (
    <View flex={1} backgroundColor={'white'} px={5}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={_onRefresh}
            tintColor="#F8852D"
          />
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={[...farms]}
        contentContainerStyle={{ paddingBottom: 80 }}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({
          item,
          index,
        }: {
          item: FarmonautFarm;
          index: number;
        }) => {
          // console.log(isSelected);
          return <SatelliteCropsWithFarmName item={item} />;
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          console.log('onEndReached');
          if (
            !getSubScriptionData.isLoading &&
            getSubScriptionData.data &&
            getSubScriptionData.data.take &&
            getSubScriptionData.data.skip &&
            getSubScriptionData.data.totalCount &&
            getSubScriptionData.data.take <= farms.length &&
            getSubScriptionData.data.totalCount > farms.length
          ) {
            console.log('onEndReached Start');
            getAllSubscription(
              getSubScriptionData.data.skip + getSubScriptionData.data.take,
              getSubScriptionData.data.take
            );
          }
        }}
      />
      <Button
        //disabled={!selectedCalendarActivity}
        backgroundColor={colors.button_color}
        onPress={() => {
          nav.navigate('ChooseSateliteFarmScreen', {
            screenFrom: AddSubscriptionMoreCrop.BACK,
          });
        }}
        borderRadius={8}
        width={'80%'}
        fontWeight={'normal'}
        fontSize={20}
        overflow={'hidden'}
        alignSelf={'center'}
        position={'absolute'}
        bottom={5}
      >
        {'Add more crops'}
      </Button>
      {getSubScriptionData.isLoading && <AppLoader />}
    </View>
  );
}

export default SatelliteSelectedCropsList;

const styles = StyleSheet.create({
  headerFooterStyle: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
