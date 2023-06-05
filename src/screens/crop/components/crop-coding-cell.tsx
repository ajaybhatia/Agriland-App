import { Image } from 'expo-image';
import { Button, HStack, Text, View, VStack } from 'native-base';
import React from 'react';

import colors from '@/ui/theme/colors';

type Props = {
  title: string;
  btnTitle: string;
  img: string;
  onSelect?: () => void;
};
const CropCodingCell = ({ title, btnTitle, img, onSelect }: Props) => {
  return (
    <HStack
      shadow={1}
      borderRadius={10}
      alignItems={'center'}
      p={5}
      mx={5}
      mt={2}
    >
      <VStack flex={0.65} pr={1}>
        <Text
          fontFamily={'body'}
          fontSize={14}
          fontWeight={'500'}
          fontStyle={'normal'}
        >
          {title}
        </Text>
        <Button
          onPress={onSelect}
          backgroundColor={colors.button_color}
          borderRadius={8}
          width={'80%'}
          mt={30}
          fontWeight={'normal'}
          fontSize={20}
          overflow={'hidden'}
          alignSelf={'center'}
        >
          {btnTitle}
        </Button>
      </VStack>
      <View flex={0.35} bgColor={'amber.400'}>
        <Image
          style={{ height: 100, width: 100 }}
          source={
            img ??
            'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
          }
          placeholder={require('@assets/app-logo.png')}
          contentFit="cover"
          transition={1000}
        />
      </View>
    </HStack>
  );
};

export default CropCodingCell;
