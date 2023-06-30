import { HStack, Text, VStack } from 'native-base';
import React from 'react';

import CardWithShadow from '@/ui/components/CardWithShadow';
import colors from '@/ui/theme/colors';

type Props = {
  amount: string;
  packageType: string;
};

const BundleSubscriptionDetailsCell = ({ packageType, amount }: Props) => {
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
            {packageType}
          </Text>
          <Text
            fontSize={12}
            fontFamily={'body'}
            fontWeight={'600'}
            fontStyle={'normal'}
            color={colors.TITLE_COLOR}
          >
            {amount} EGP
          </Text>
        </HStack>
        {/* <Text
          px={3}
          py={3}
          fontSize={11}
          fontFamily={'body'}
          fontWeight={'400'}
          fontStyle={'normal'}
        >
          BundleSubscriptionDetailsCell
        </Text> */}
      </VStack>
    </CardWithShadow>
  );
};

export default BundleSubscriptionDetailsCell;
