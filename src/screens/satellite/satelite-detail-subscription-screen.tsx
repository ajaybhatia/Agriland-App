import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, FlatList, View, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { usePostApiFarmerAppCreatefarmersubscription } from '@/apis/endpoints/api';
import type { UserPaymentInfoResponse } from '@/apis/model';
import client from '@/config/react-query/client';
import type { AuthStackParamList } from '@/navigation/types';
import ListHeader from '@/ui/components/ListHeader';

import type { CardPayment } from '../payments/add-card-payment';
import AddpaymentCell from '../payments/components/add-payment-cell';
import CardCell from '../payments/components/card-cell';
import BundleSubscriptionDetailsCell from './components/bundle-subscription-details-cell';

type Props = {};

const SateliteDetailSubscriptionScreen = (props: Props) => {
  const route =
    useRoute<
      RouteProp<AuthStackParamList, 'SateliteDetailSubscriptionScreen'>
    >();
  const nav = useNavigation();
  const [card, setCard] = useState<CardPayment | undefined>();

  const addSubscription = usePostApiFarmerAppCreatefarmersubscription();

  const onAddCard = useCallback(
    (cardInfo: CardPayment) => {
      setCard(cardInfo);
    },
    [setCard]
  );

  const payNow = (cardInfo: CardPayment) => {
    let dates = cardInfo.expireDate.split('/');
    console.log('payNow==> ', {
      cardExpiryMonth: dates[0],
      cardExpiryYear: dates[1],
      cardNumber: cardInfo.cardNumber.replace(/ /g, ''),
      cvv: cardInfo.cvv,
      creditCardName: cardInfo.name,
      orderAmount: route?.params?.amount ?? 0,
      planId: route?.params?.planid ?? '',
    });
    addSubscription.mutate(
      {
        data: {
          cardExpiryMonth: dates[0],
          cardExpiryYear: dates[1],
          cardNumber: cardInfo.cardNumber.replace(/ /g, ''),
          cvv: cardInfo.cvv,
          creditCardName: cardInfo.name,
          orderAmount: route?.params?.amount ?? 0,
          planId: route?.params?.planid ?? '',
        },
      },
      {
        onSuccess: (data: UserPaymentInfoResponse) => {
          // {
          //   "gateWayCode": "APPROVED",
          //   "errorMessage": "",
          //   "status": "SUCCESS"
          // }
          if (
            data &&
            data.gateWayCode &&
            data.status &&
            data.gateWayCode === 'APPROVED' &&
            data.status === 'SUCCESS'
          ) {
            fetchProfileApi();
          } else {
            Toast.show({
              type: 'error',
              text1: data?.errorMessage ?? 'Something went wrong!',
            });
          }
        },
        onError(error) {
          console.log('error farm ==> ', error);
          Toast.show({
            type: 'error',
            text1: error.message,
          });
        },
      }
    );
  };

  const fetchProfileApi = () => {
    client
      .invalidateQueries({
        queryKey: ['/api/Account/fetchUserBasicDetails'],
      })
      .then((item) => {
        nav.navigate('ChooseSateliteFarmScreen');
      })
      .catch((e) => {
        Toast.show({
          type: 'error',
          text1: e.message,
        });
      });
  };

  const buySubScription = useCallback(() => {
    if (card) {
      payNow(card);
    } else {
      Alert.alert('Warning!', 'Please add card for payment');
    }
  }, [card]);

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
                <BundleSubscriptionDetailsCell
                  amount={`${route?.params?.amount ?? 0}`}
                  packageType={route?.params?.packageType ?? ''}
                />
              </VStack>
            );
          } else if (index === 1 && card) {
            return (
              <VStack mt={3}>
                <ListHeader title="Choose a payment method" ml={5} mr={5} />
                <CardCell cardInfo={card} />
              </VStack>
            );
          } else if (index === 2) {
            return (
              <VStack mt={3}>
                <AddpaymentCell onAddCard={onAddCard} cardInfo={card} />
              </VStack>
            );
          }
          return <View />;
        }}
      />
      <View position={'absolute'} left={0} bottom={10} right={0}>
        <Button
          // onPress={() => nav.navigate('ChooseSateliteFarmScreen')}
          isLoading={addSubscription.isLoading}
          onPress={buySubScription}
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
