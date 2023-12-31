import { FlatList, Text, View } from 'native-base';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { useGetApiSubscriptionGetSubscriptionPlans } from '@/apis/endpoints/api';
import type {
  SubscriptionModel,
  SubscriptionPlanListModel,
  SubscriptionPlanPaginatedResponse,
} from '@/apis/model';
import AppLoader from '@/ui/components/AppLoader';

import SubscriptionsCell from './components/subscription-cell';

const SubscriptionBundleScreen = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionModel[]>([]);
  const [moreInfo, setMoreInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 10,
    skip: 0,
  });

  const getSubscriptions = useGetApiSubscriptionGetSubscriptionPlans(
    {
      skip: moreInfo.skip,
      take: moreInfo.take,
      sortColumn: 'createdOn',
      sortOrder: 'desc',
    },
    {
      query: {
        onSuccess: (data: SubscriptionPlanPaginatedResponse) => {
          console.log('getSubscriptions=> ', data.skip);
          if (
            data &&
            data.subscriptionPlanResponse &&
            data.subscriptionPlanResponse?.length > 0
          ) {
            console.log(
              'getSubscriptions=> ',
              data.skip && data.skip > 0 ? 'more add' : 'single add'
            );
            setSubscriptions(
              data.skip && data.skip > 0
                ? [...subscriptions, ...data.subscriptionPlanResponse]
                : data.subscriptionPlanResponse
            );
          } else {
            Toast.show({
              type: 'error',
              text1: 'Something went wrong!',
            });
          }
        },
        onError: (err) => {
          console.log('data error ===> ', err.message);
          Toast.show({
            type: 'error',
            text1: err.message,
          });
        },
      },
    }
  );

  const ListFooter = useCallback(() => {
    //View to set in Footer
    return (
      <View style={styles.headerFooterStyle}>
        {getSubscriptions.fetchStatus === 'fetching' &&
          subscriptions.length > 0 && (
            <ActivityIndicator size="small" color="#00ff00" />
          )}
      </View>
    );
  }, [getSubscriptions, subscriptions]);

  return (
    <View flex={1}>
      {getSubscriptions.fetchStatus !== 'fetching' &&
      subscriptions.length <= 0 ? (
        <View flex={1} justifyContent={'center'} alignItems={'center'}>
          <Text>no subscription found</Text>
        </View>
      ) : (
        <FlatList
          horizontal={false}
          keyExtractor={(item, index) => `${index}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={subscriptions}
          // estimatedItemSize={150}
          renderItem={({ item }: { item: SubscriptionPlanListModel }) => (
            <SubscriptionsCell
              // titleColor={
              //   colors[Math.floor(Math.random() * (colors.length - 1)) + 1]
              // }
              item={item}
            />
          )}
          ListFooterComponent={ListFooter}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (
              getSubscriptions.data &&
              getSubscriptions.data.take !== undefined &&
              getSubscriptions.data.skip !== undefined &&
              getSubscriptions.data.take !== null &&
              getSubscriptions.data.skip !== null &&
              getSubscriptions.data.totalCount !== undefined
            ) {
              if (
                getSubscriptions.fetchStatus !== 'fetching' &&
                !getSubscriptions.isFetching &&
                getSubscriptions.data.take <= subscriptions.length &&
                getSubscriptions.data.totalCount > subscriptions.length
              ) {
                console.log(
                  'onEndReached Start',
                  getSubscriptions.data.skip + moreInfo.take
                );
                setMoreInfo({
                  take: moreInfo.take,
                  skip: getSubscriptions.data.skip + moreInfo.take,
                });
              }
            }
          }}
        />
      )}

      {getSubscriptions.fetchStatus === 'fetching' &&
        subscriptions.length <= 0 && <AppLoader />}
    </View>
  );
};

export default SubscriptionBundleScreen;

const styles = StyleSheet.create({
  headerFooterStyle: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
