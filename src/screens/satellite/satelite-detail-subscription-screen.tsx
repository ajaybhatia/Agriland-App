import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, View, VStack } from 'native-base';
import React from 'react';

import ListHeader from '@/ui/components/ListHeader';

import BundleSubscriptionDetailsCell from './components/bundle-subscription-details-cell';

type Props = {};

const SateliteDetailSubscriptionScreen = (props: Props) => {
  const nav = useNavigation();
  return (
    <View flex={1}>
      <FlatList
        horizontal={false}
        keyExtractor={(item, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3]}
        initialNumToRender={3}
        renderItem={({ item, index }: { item: string; index: number }) => {
          if (index === 0) {
            return (
              <VStack mt={3}>
                <ListHeader title="Bundle Details" ml={5} mr={5} />
                <BundleSubscriptionDetailsCell />
              </VStack>
            );
          }
          return <View />;
        }}
      />
      <View position={'absolute'} left={0} bottom={10} right={0}>
        <Button
          onPress={() => nav.navigate('ChooseSateliteFarmScreen')}
          backgroundColor={'black'}
          borderRadius={8}
          width={'80%'}
          mt={30}
          fontWeight={'normal'}
          fontSize={20}
          overflow={'hidden'}
          alignSelf={'center'}
        >
          {'Pay Now'}
        </Button>
      </View>
    </View>
  );
};

export default SateliteDetailSubscriptionScreen;
