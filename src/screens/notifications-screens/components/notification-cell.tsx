import { HStack, Image, Text, VStack } from 'native-base';
import React from 'react';

import CardWithShadow from '@/ui/components/CardWithShadow';
import colors from '@/ui/theme/colors';

type Props = {};

const NoticationCell = (props: Props) => {
  return (
    <CardWithShadow
      borderColor={colors.BORDER_COLOR_DARK}
      borderWidth={0.5}
      shadow="1"
    >
      <HStack my={2} alignItems={'center'}>
        <Image
          alt=""
          ml={3}
          h={30}
          w={30}
          resizeMode={'cover'}
          source={require('@assets/app-logo.png')}
        />
        <VStack mx={3}>
          <Text
            //w={'50%'}
            fontFamily={'heading'}
            fontWeight={'500'}
            mr={10}
            fontStyle={'normal'}
            fontSize={13}
          >
            The Quote you sent has been answered
          </Text>
          <Text
            fontFamily={'heading'}
            fontWeight={'200'}
            fontStyle={'normal'}
            fontSize={12}
          >
            2 days 16 hours ago
          </Text>
        </VStack>
      </HStack>
    </CardWithShadow>
  );
};

export default NoticationCell;
