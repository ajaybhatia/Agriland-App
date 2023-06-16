import { HStack, Image, Text, VStack } from 'native-base';
import React from 'react';

import CardWithShadow from '@/ui/components/CardWithShadow';

type Props = {};

const SateliteReportCell = (props: Props) => {
  return (
    <CardWithShadow>
      <HStack alignItems={'center'}>
        <Image
          alt=""
          alignSelf={'center'}
          source={require('@assets/logo.png')}
          h={20}
          w={20}
        />
        <VStack mx={3}>
          <Text
            fontSize={14}
            fontWeight={'500'}
            fontFamily={'body'}
            fontStyle={'normal'}
          >
            Carbon Print Report
          </Text>
          <Text
            fontSize={11}
            fontWeight={'200'}
            fontFamily={'body'}
            fontStyle={'normal'}
          >
            Date : 12/3/2023
          </Text>
        </VStack>
      </HStack>
    </CardWithShadow>
  );
};

export default SateliteReportCell;
