import { HStack, Text, View, VStack } from 'native-base';
import React from 'react';

import CardWithShadow from '@/ui/components/CardWithShadow';

import type { CardPayment } from '../add-card-payment';

type Props = {
  cardInfo?: CardPayment;
};

const CardCell = ({ cardInfo }: Props) => {
  return (
    <CardWithShadow>
      <VStack overflow={'hidden'} bgColor={'#c2c3c6'} p={3}>
        <HStack>
          <View h={6} borderRadius={'full'} bgColor={'white'}>
            <View
              backgroundColor={'red.500'}
              h={5}
              w={5}
              borderRadius={'full'}
              m={'0.5'}
            />
          </View>
          <VStack ml={2} w={'88%'}>
            <Text
              fontFamily={'body'}
              fontSize={'md'}
              fontWeight={'400'}
              fontStyle={'normal'}
              color={'white'}
            >
              {cardInfo?.name ?? ''}
            </Text>
            <HStack
              alignItems={'center'}
              justifyContent={'space-between'}
              mt={2}
            >
              <Text
                fontFamily={'body'}
                fontSize={'sm'}
                fontWeight={'400'}
                fontStyle={'normal'}
                color={'white'}
              >
                {'Card Number'}
              </Text>
              <Text
                fontFamily={'body'}
                fontSize={'sm'}
                fontWeight={'400'}
                fontStyle={'normal'}
                color={'white'}
              >
                {cardInfo?.cardNumber ?? ''}
              </Text>
            </HStack>
            <HStack
              alignItems={'center'}
              justifyContent={'space-between'}
              mt={2}
            >
              <Text
                fontFamily={'body'}
                fontSize={'sm'}
                fontWeight={'400'}
                fontStyle={'normal'}
                color={'white'}
              >
                {'EXP Date'}
              </Text>
              <Text
                fontFamily={'body'}
                fontSize={'sm'}
                fontWeight={'400'}
                fontStyle={'normal'}
                color={'white'}
              >
                {cardInfo?.expireDate ?? ''}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </CardWithShadow>
  );
};

export default CardCell;
