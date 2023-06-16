import { FlatList, View } from 'native-base';
import React from 'react';

import SubscriptionsCell from './components/subscription-cell';

type Props = {};

const SubscriptionBundleScreen = (props: Props) => {
  const coloors: string[] = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FF4599',
    '#00B3E6',
  ];
  return (
    <View flex={1}>
      <FlatList
        horizontal={false}
        keyExtractor={(item, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={coloors}
        initialNumToRender={3}
        renderItem={({ item, index }: { item: string; index: number }) => (
          <SubscriptionsCell titleColor={item} />
        )}
      />
    </View>
  );
};

export default SubscriptionBundleScreen;
