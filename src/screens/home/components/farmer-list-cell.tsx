import { useNavigation } from '@react-navigation/native';
import { FlatList, VStack } from 'native-base';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, I18nManager, StyleSheet } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';

import { useGetApiFarmGetFarms } from '@/apis/endpoints/api';
import type { FarmResponse, FarmsPaginatedResponse } from '@/apis/model';
import FarmAddCell from '@/screens/crop/components/farm-add-cell';
import FarmMapSelectionCell from '@/screens/crop/components/farm-map-selection-cell';
import colors from '@/ui/theme/colors';

type Props = {
  selectedFarm?: FarmResponse;
  onSelectedFarm?: (selectedFarm: FarmResponse) => void;
  onLoading?: (isLoading: boolean) => void;
};

const FarmerListCell = ({ selectedFarm, onSelectedFarm, onLoading }: Props) => {
  const refFarmer = useRef();
  const nav = useNavigation();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [moreFarmInfo, setMoreFarmInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 10,
    skip: 0,
  });

  const scrollToIndex = (index: number) => {
    refFarmer?.current?.scrollToIndex({
      index: index,
      animated: false,
    });
  };

  // navigation
  const addNewFarm = useCallback(() => nav.navigate('AddFarmHomeScreen'), []);

  // getFarms

  const getFarms = useGetApiFarmGetFarms(
    {
      skip: moreFarmInfo.skip,
      take: moreFarmInfo.take,
      sortColumn: 'createdOn',
      sortOrder: 'desc',
    },
    {
      query: {
        onSuccess: (data: FarmsPaginatedResponse) => {
          //console.log(data);
          if (data && data.farms && data.farms.length > 0) {
            let isScroll = farms.length > 0 ? false : true;
            setFarms(
              moreFarmInfo.skip <= 0 ? data.farms : [...farms, ...data.farms]
            );

            if (selectedFarm === undefined && data.farms.length > 0) {
              onSelectedFarm && onSelectedFarm(data.farms[0]);
            }
            if (isScroll && I18nManager.isRTL) {
              console.log('I18nManager===> ', I18nManager.isRTL);
              setTimeout(() => scrollToIndex(0), 200);
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
    onLoading && onLoading(getFarms.isLoading);
  }, [getFarms.isLoading, onLoading]);

  return (
    <VStack mt={2} pb={5}>
      <FlatList
        ref={refFarmer}
        horizontal
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
        initialScrollIndex={0}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        extraData={farms.length || selectedFarm}
        keyExtractor={(item, indexV) => `${indexV}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}
        data={farms}
        ListHeaderComponent={<FarmAddCell onPreviousSubmit={addNewFarm} />}
        renderItem={({ item: farm }: { item: FarmResponse }) => (
          <FarmMapSelectionCell
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
  );
};

// function arePropsEqual(prevProps: Props, nextProps: Props) {
//   return prevProps.selectedFarm === nextProps.selectedFarm;
// }

//export default memo(FarmerListCell, arePropsEqual);

export default memo(FarmerListCell);

const styles = StyleSheet.create({
  dotStyle: {
    width: 8,
    height: 8,
    backgroundColor: colors.button_color,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
