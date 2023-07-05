import { useNavigation } from '@react-navigation/native';
import { Button, HStack, Text, View, VStack } from 'native-base';
import React, { memo } from 'react';
import { I18nManager } from 'react-native';

import { useGetApiSubscriptionGetSubscriptionFeaturesBySubscriptionId } from '@/apis/endpoints/api';
import type { SubscriptionPlanListModel } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';

type Props = {
  titleColor?: string;
  item: SubscriptionPlanListModel;
};

const SubscriptionsCell = ({ titleColor = '#FFB399', item }: Props) => {
  const nav = useNavigation();

  const { data } = useGetApiSubscriptionGetSubscriptionFeaturesBySubscriptionId(
    {
      Id: item?.id ?? '',
    }
  );

  return (
    <View mt={5}>
      <CardWithShadow
        borderColor={titleColor}
        borderWidth={1}
        mx={8}
        overflow={'visible'}
      >
        <VStack alignItems={'center'} px={3}>
          <View bgColor={titleColor} borderRadius={10} mt={-4}>
            <Text
              fontSize={'md'}
              fontFamily={'body'}
              fontWeight={'500'}
              fontStyle={'normal'}
              color={'white'}
              px={5}
              py={2}
            >
              {I18nManager.isRTL ? item?.name?.ar ?? '' : item?.name?.en ?? ''}
            </Text>
          </View>

          <HStack mt={5} alignItems={'center'}>
            <Text
              fontSize={'3xl'}
              fontFamily={'body'}
              fontWeight={'600'}
              fontStyle={'normal'}
              color={titleColor}
            >
              {item?.pricePerYear ?? 0}{' '}
            </Text>
            <Text
              fontSize={'xl'}
              fontFamily={'body'}
              fontWeight={'500'}
              fontStyle={'normal'}
              color={titleColor}
            >
              EGP
            </Text>
          </HStack>
          {/* <Text
            fontSize={11}
            fontFamily={'body'}
            fontWeight={'200'}
            mt={3}
            fontStyle={'normal'}
          >
            i, the owner of the far, also
          </Text> */}
          <HStack alignItems={'center'} w={'96%'} mt={3} flexWrap={'wrap'}>
            {data?.subscriptionFeatureResponse?.map((v, index: number) => {
              return (
                <HStack
                  alignItems={'center'}
                  key={`${index}`}
                  w={'48%'}
                  pl={(index + 1) % 2 === 0 ? 2 : 0}
                  my={1}
                >
                  <View
                    h={2}
                    w={2}
                    borderRadius={'full'}
                    bgColor={titleColor}
                  />
                  <Text
                    ml={2}
                    fontSize={11}
                    fontFamily={'body'}
                    fontWeight={'200'}
                    fontStyle={'normal'}
                  >
                    {I18nManager.isRTL
                      ? v?.featureNames?.ar ?? ''
                      : v?.featureNames?.en ?? ''}
                  </Text>
                </HStack>
              );
            })}
          </HStack>

          <Button
            onPress={() => {
              nav.navigate('SateliteDetailSubscriptionScreen', {
                amount: Number(item?.pricePerYear ?? '0'),
                planid: item?.id ?? '',
                packageType: I18nManager.isRTL
                  ? item?.name?.ar ?? ''
                  : item?.name?.en ?? '',
              });
            }}
            backgroundColor={titleColor}
            borderRadius={8}
            w={'1/2'}
            mt={'6'}
            mb={6}
            fontWeight={'normal'}
            fontSize={20}
          >
            {'Subscribe'}
          </Button>
        </VStack>
      </CardWithShadow>
    </View>
  );
};

export default memo(SubscriptionsCell);
