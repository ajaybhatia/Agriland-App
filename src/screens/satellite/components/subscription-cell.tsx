import { useNavigation } from '@react-navigation/native';
import { Button, HStack, Text, View, VStack } from 'native-base';
import React from 'react';

import CardWithShadow from '@/ui/components/CardWithShadow';

type Props = {
  titleColor: string;
};

const SubscriptionsCell = ({ titleColor }: Props) => {
  const packageArray: string[] = [
    'Premium package',
    'Premium package',
    'Premium package',
  ];
  const nav = useNavigation();
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
              fontSize={11}
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              color={'white'}
              px={5}
              py={2}
            >
              First Bundle
            </Text>
          </View>

          <Text
            mt={5}
            fontSize={'3xl'}
            fontFamily={'body'}
            fontWeight={'600'}
            fontStyle={'normal'}
            color={titleColor}
          >
            Free
          </Text>
          <Text
            fontSize={11}
            fontFamily={'body'}
            fontWeight={'200'}
            mt={3}
            fontStyle={'normal'}
          >
            i, the owner of the far, also
          </Text>
          <HStack alignItems={'center'} w={'96%'} mt={3} flexWrap={'wrap'}>
            {packageArray.map((v: string, index: number) => {
              return (
                <HStack alignItems={'center'} key={`${index}`} w={'48%'} my={1}>
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
                    {v}
                  </Text>
                </HStack>
              );
            })}
          </HStack>

          <Button
            onPress={() => nav.navigate('SateliteDetailSubscriptionScreen')}
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

export default SubscriptionsCell;
