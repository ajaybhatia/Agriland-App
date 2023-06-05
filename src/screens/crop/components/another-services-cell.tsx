import { Image } from 'expo-image';
import { Text, View, VStack } from 'native-base';
import React from 'react';

import CardWithShadow from '@/ui/components/CardWithShadow';

type Props = {};

type ServicesType = {
  title: string;
  image: string;
};

const AnotherServicesCell = (props: Props) => {
  const arry: ServicesType[] = [
    {
      title: 'Sorting',
      image:
        'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    },
    {
      title: 'Cool Storage',
      image:
        'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    },
    {
      title: 'Storage',
      image:
        'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    },
    {
      title: 'Delivery',
      image:
        'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    },
    {
      title: 'Cool Delivery',
      image:
        'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    },
    {
      title: 'Packaging',
      image:
        'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    },
  ];
  return (
    <CardWithShadow>
      <View flexWrap={'wrap'} p={5} flexDirection={'row'}>
        {arry.map((item: ServicesType, index: number) => {
          return (
            <VStack
              w={'33%'}
              mt={2}
              key={`${index}`}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Image
                style={{ width: 60, height: 60 }}
                source={item.image}
                placeholder={require('@assets/app-logo.png')}
                contentFit="cover"
                transition={1000}
              />
              <Text
                mt={2}
                fontSize={13}
                fontFamily={'body'}
                fontWeight={'500'}
                color={'gray.400'}
              >
                {item.title}
              </Text>
            </VStack>
          );
        })}
      </View>
    </CardWithShadow>
  );
};

export default AnotherServicesCell;
