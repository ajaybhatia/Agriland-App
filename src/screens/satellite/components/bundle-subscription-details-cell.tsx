import { HStack, Text, VStack } from 'native-base';
import React from 'react';

import CardWithShadow from '@/ui/components/CardWithShadow';
import colors from '@/ui/theme/colors';

type Props = {};

const BundleSubscriptionDetailsCell = (props: Props) => {
  return (
    <CardWithShadow>
      <VStack overflow={'hidden'}>
        <HStack
          bgColor={'#dce0e7'}
          justifyContent={'space-between'}
          alignItems={'center'}
          px={3}
          py={3}
        >
          <Text
            fontSize={12}
            fontFamily={'body'}
            fontWeight={'600'}
            fontStyle={'normal'}
          >
            BundleSubscriptionDetailsCell
          </Text>
          <Text
            fontSize={12}
            fontFamily={'body'}
            fontWeight={'600'}
            fontStyle={'normal'}
            color={colors.TITLE_COLOR}
          >
            200 EGP
          </Text>
        </HStack>
        <Text
          px={3}
          py={3}
          fontSize={11}
          fontFamily={'body'}
          fontWeight={'400'}
          fontStyle={'normal'}
        >
          BundleSubscriptionDetailsCell
        </Text>
      </VStack>
    </CardWithShadow>
  );
};

export default BundleSubscriptionDetailsCell;
