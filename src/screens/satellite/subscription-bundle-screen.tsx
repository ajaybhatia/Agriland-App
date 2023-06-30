import { FlatList, Text, View } from 'native-base';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { useGetApiSubscriptionGetSubscriptions } from '@/apis/endpoints/api';
import type {
  SubscriptionModel,
  SubscriptionPaginatedResponse,
} from '@/apis/model';
import AppLoader from '@/ui/components/AppLoader';

import SubscriptionsCell from './components/subscription-cell';

type Props = {};

const SubscriptionBundleScreen = (props: Props) => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionModel[]>([]);
  const [moreInfo, setMoreInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 10,
    skip: 0,
  });
  const colors: string[] = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FF4599',
    '#00B3E6',
  ];

  const getSubscriptions = useGetApiSubscriptionGetSubscriptions(
    {
      skip: moreInfo.skip,
      take: moreInfo.take,
      sortColumn: 'createdOn',
      sortOrder: 'desc',
    },
    {
      query: {
        onSuccess: (data: SubscriptionPaginatedResponse) => {
          console.log('getSubscriptions=> ', data.skip);
          if (
            data &&
            data.subscriptionResponse &&
            data.subscriptionResponse?.length > 0
          ) {
            console.log(
              'getSubscriptions=> ',
              data.skip && data.skip > 0 ? 'more add' : 'single add'
            );
            setSubscriptions(
              data.skip && data.skip > 0
                ? [...subscriptions, ...data.subscriptionResponse]
                : data.subscriptionResponse
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
        {getSubscriptions.isLoading && (
          <ActivityIndicator size="small" color="#00ff00" />
        )}
      </View>
    );
  }, [getSubscriptions]);

  console.log('getSubscriptions count ===> ', subscriptions.length);

  return (
    <View flex={1}>
      {!getSubscriptions.isLoading && subscriptions.length < 0 ? (
        <View flex={1} justifyContent={'center'} alignItems={'center'}>
          <Text>no subscription found</Text>
        </View>
      ) : getSubscriptions.isLoading && subscriptions.length < 0 ? (
        <AppLoader />
      ) : (
        <FlatList
          horizontal={false}
          keyExtractor={(item, index) => `${index}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={subscriptions}
          initialNumToRender={4}
          renderItem={({
            item,
            index,
          }: {
            item: SubscriptionModel;
            index: number;
          }) => (
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
              getSubscriptions.data.totalCount !== undefined
            ) {
              if (
                !getSubscriptions.isLoading &&
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
