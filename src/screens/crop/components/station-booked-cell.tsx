import { HStack, Icon, Text, View, VStack } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {};

const StationBookedCell = (props: Props) => {
  return (
    <VStack
      shadow={1}
      bgColor={'white'}
      borderRadius={10}
      my={2}
      mx={5}
      overflow={'hidden'}
    >
      <HStack overflow={'hidden'}>
        <View flex={0.04} bgColor={'red.400'} w={'100%'} />
        <View flex={0.82} mx={1} my={2}>
          <VStack>
            <HStack flex={1}>
              <VStack flex={0.3}>
                <Text
                  fontFamily={'body'}
                  fontSize={12}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                >
                  ID No.
                </Text>
                <Text
                  fontFamily={'body'}
                  fontSize={12}
                  fontWeight={'600'}
                  fontStyle={'normal'}
                >
                  123456789
                </Text>
              </VStack>
              <VStack flex={0.3} mx={2}>
                <Text
                  fontFamily={'body'}
                  fontSize={12}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                >
                  Station Name
                </Text>
                <Text
                  fontFamily={'body'}
                  fontSize={12}
                  fontWeight={'600'}
                  fontStyle={'normal'}
                >
                  El-Amal
                </Text>
              </VStack>
              <VStack flex={0.4}>
                <Text
                  fontFamily={'body'}
                  fontSize={12}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                >
                  Shipment
                </Text>
                <Text
                  fontFamily={'body'}
                  fontSize={12}
                  fontWeight={'600'}
                  fontStyle={'normal'}
                >
                  oranges / 30 tons / local
                </Text>
              </VStack>
            </HStack>
            <Text
              fontFamily={'body'}
              fontSize={12}
              mt={2}
              fontWeight={'200'}
              fontStyle={'normal'}
            >
              Storage period
            </Text>
            <HStack justifyContent={'space-between'}>
              <HStack>
                <Text
                  fontFamily={'body'}
                  fontSize={12}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                >
                  To:
                </Text>
                <Text
                  fontFamily={'body'}
                  fontSize={12}
                  fontWeight={'600'}
                  fontStyle={'normal'}
                >
                  3/12/2022
                </Text>
              </HStack>
              <HStack>
                <Text
                  fontFamily={'body'}
                  fontSize={12}
                  fontWeight={'200'}
                  fontStyle={'normal'}
                >
                  From:
                </Text>
                <Text
                  fontFamily={'body'}
                  fontSize={12}
                  fontWeight={'600'}
                  fontStyle={'normal'}
                >
                  3/12/2022
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </View>
        <View alignSelf={'center'} flex={0.1} alignItems={'center'}>
          <Icon as={MaterialIcons} name={'clear'} size={'lg'} color={'black'} />
        </View>
      </HStack>
    </VStack>
  );
};

export default StationBookedCell;
