import { useNavigation } from '@react-navigation/native';
import { FlatList, View, VStack } from 'native-base';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useGetApiFarmerAppGetallfarms } from '@/apis/endpoints/api';
import type { FarmResponse, FarmsPaginatedResponse } from '@/apis/model';
import FarmAddVerticalCell from '@/screens/crop/components/farm-add-vertical-cell';
import FarmMapSelectionVerticalCell from '@/screens/crop/components/farm-map-selection-vertical-cell';

type Props = {
  selectedFarm?: FarmResponse;
  onSelectedFarm?: (selectedFarm: FarmResponse) => void;
  onLoading?: (isLoading: boolean) => void;
  isAutoSelect?: boolean;
};

const FarmerListVerticalCell = ({
  isAutoSelect = true,
  selectedFarm,
  onSelectedFarm,
  onLoading,
}: Props) => {
  const refFarmer = useRef();
  const nav = useNavigation();
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [moreFarmInfo, setMoreFarmInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 10,
    skip: 0,
  });

  // navigation
  const addNewFarm = useCallback(() => nav.navigate('AddFarmHomeScreen'), []);

  // getFarms

  const getFarms = useGetApiFarmerAppGetallfarms(
    {
      skip: moreFarmInfo.skip,
      take: moreFarmInfo.take,
      sortColumn: 'createdOn',
      sortOrder: 'desc',
    },
    {
      query: {
        onSuccess: (data: FarmsPaginatedResponse) => {
          console.log('data ===> ', data.farms?.length ?? -1);
          if (data && data.farms && data.farms.length > 0) {
            setFarms(
              moreFarmInfo.skip <= 0 ? data.farms : [...farms, ...data.farms]
            );

            if (
              selectedFarm === undefined &&
              data.farms.length > 0 &&
              isAutoSelect
            ) {
              onSelectedFarm && onSelectedFarm(data.farms[0]);
            }
          }
        },
        onError: (err) => {
          console.log('data error ===> ', err.message);
        },
      },
    }
  );
  useEffect(() => {
    onLoading &&
      onLoading(getFarms.isLoading || getFarms.fetchStatus === 'fetching');
  }, [getFarms.fetchStatus, getFarms.isLoading, onLoading]);

  const ListFooter = useCallback(() => {
    //View to set in Footer
    return (
      <View style={styles.headerFooterStyle}>
        {getFarms.isLoading && (
          <ActivityIndicator size="small" color="#00ff00" />
        )}
      </View>
    );
  }, [getFarms]);

  return (
    <VStack flex={1}>
      <FlatList
        ref={refFarmer}
        horizontal={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
        initialScrollIndex={0}
        extraData={farms.length || selectedFarm}
        keyExtractor={(item, indexV) => `${indexV}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 250 }}
        ListFooterComponent={ListFooter}
        data={farms}
        ListHeaderComponent={
          <FarmAddVerticalCell onPreviousSubmit={addNewFarm} />
        }
        renderItem={({ item: farm }: { item: FarmResponse }) => (
          <FarmMapSelectionVerticalCell
            item={farm}
            selectedItem={selectedFarm}
            onSelectFarm={onSelectedFarm}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          console.log('onEndReached');
          if (
            !getFarms.isLoading &&
            !getFarms.isFetching &&
            getFarms.data &&
            getFarms.data.take &&
            getFarms.data.skip &&
            getFarms.data.totalCount &&
            getFarms.data.take <= farms.length &&
            getFarms.data.totalCount > farms.length
          ) {
            console.log('onEndReached Start');
            setMoreFarmInfo({
              take: moreFarmInfo.take,
              skip: getFarms.data.skip + moreFarmInfo.take,
            });
          }
        }}
        //estimatedItemSize={300}
      />
    </VStack>
  );
};

export default memo(FarmerListVerticalCell);

const styles = StyleSheet.create({
  headerFooterStyle: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
