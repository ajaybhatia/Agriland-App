import { Image } from 'expo-image';
import { HStack, Text, View, VStack } from 'native-base';
import React from 'react';

import type { CropResponse } from '@/apis/model';

type Props = {
  crop?: CropResponse;
};

const CodingRequestCrop = ({ crop }: Props) => {
  return (
    <View mx={5} shadow={1} overflow={'hidden'} borderRadius={10}>
      <HStack>
        <View flex={0.25}>
          <Image
            style={{ flex: 1, height: 100 }}
            source={
              crop?.imageUrl
                ? `http://95.111.231.114:88${crop.imageUrl}`
                : 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
            }
            placeholder={require('@assets/app-logo.png')}
            contentFit="cover"
            transition={1000}
          />
        </View>
        <VStack flex={0.75} px={2} py={2}>
          <Text
            fontFamily={'body'}
            fontSize={13}
            fontStyle={'normal'}
            fontWeight={'600'}
          >
            Pomegranate
          </Text>
          <HStack>
            <VStack flex={0.3}>
              <Text
                fontFamily={'body'}
                fontSize={13}
                fontStyle={'normal'}
                fontWeight={'300'}
              >
                Coding no.
              </Text>
              <Text
                fontFamily={'body'}
                fontSize={13}
                fontStyle={'normal'}
                fontWeight={'600'}
              >
                1234567
              </Text>
            </VStack>

            {/* Second */}
            <VStack flex={0.3}>
              <Text
                fontFamily={'body'}
                fontSize={13}
                fontStyle={'normal'}
                fontWeight={'300'}
              >
                Quantity
              </Text>
              <Text
                fontFamily={'body'}
                fontSize={13}
                fontStyle={'normal'}
                fontWeight={'600'}
              >
                200 tons
              </Text>
            </VStack>
            {/*  Thired */}
            <VStack flex={0.4}>
              <Text
                fontFamily={'body'}
                fontSize={13}
                fontStyle={'normal'}
                fontWeight={'300'}
              >
                Area
              </Text>
              <Text
                fontFamily={'body'}
                fontSize={13}
                fontStyle={'normal'}
                fontWeight={'600'}
              >
                200 tons
              </Text>
            </VStack>
          </HStack>
          <Text
            mt={2}
            fontFamily={'body'}
            fontSize={13}
            fontStyle={'normal'}
            fontWeight={'300'}
          >
            farm
          </Text>
          <Text
            fontFamily={'body'}
            fontSize={13}
            fontStyle={'normal'}
            fontWeight={'600'}
          >
            Al aml farm
          </Text>
        </VStack>
      </HStack>
    </View>
  );
};

export default CodingRequestCrop;
