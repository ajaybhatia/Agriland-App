import { Image, Text, VStack } from 'native-base';
import React from 'react';

type Props = {};

const SoilTestType = (props: Props) => {
  return (
    <VStack mr={2} w={'20'} justifyContent={'center'} alignItems={'center'}>
      <Image
        alt=""
        w={'16'}
        h={'16'}
        borderRadius={10}
        borderWidth={3}
        borderColor={'green.500'}
        source={require('@assets/weather_bg.png')}
        resizeMode="cover"
      />
      <Text
        mt={2}
        fontFamily={'heading'}
        fontSize={10}
        textAlign={'center'}
        fontWeight={'600'}
        color={'black'}
      >
        Properties analysis soil natural
      </Text>
    </VStack>
  );
};

export default SoilTestType;
