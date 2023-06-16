import { Image } from 'expo-image';
import { Button, HStack, Icon, Text, View, VStack } from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '@/ui/theme/colors';

type Props = {
  title: string;
  btnTitle: string;
  img?: string;
  onSelect?: () => void;
};
const CropMarketingCell = ({ title, btnTitle, img, onSelect }: Props) => {
  return (
    <HStack
      shadow={1}
      borderRadius={10}
      alignItems={'center'}
      p={5}
      mx={5}
      mt={2}
      overflow={'hidden'}
    >
      <View position={'absolute'} left={0} right={0} top={0} bottom={0}>
        <Image
          style={{ height: '100%', width: '100%' }}
          source={
            img ??
            'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
          }
          placeholder={require('@assets/app-logo.png')}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <HStack alignItems={'center'} bgColor={'rgba(0,0,0,0.3)'}>
        <VStack flex={0.65} pr={1}>
          <Text
            fontFamily={'body'}
            fontSize={14}
            fontWeight={'500'}
            fontStyle={'normal'}
            color={'white'}
          >
            {title ?? 'Do You Want To Code The Crop For Export Abroad?'}
          </Text>
          <Button
            onPress={onSelect}
            backgroundColor={'white'}
            borderRadius={8}
            width={'80%'}
            mt={30}
            fontWeight={'normal'}
            fontSize={20}
            overflow={'hidden'}
            alignSelf={'center'}
            _text={{ color: colors.button_color, fontWeight: '600' }}
          >
            {btnTitle ?? 'Start Now'}
          </Button>
        </VStack>
        <View flex={0.35} alignItems={'center'} justifyContent={'center'}>
          <Icon
            as={MaterialCommunityIcons}
            name={'human-greeting-proximity'}
            size={'6xl'}
            color={'white'}
          />
        </View>
      </HStack>
    </HStack>
  );
};

export default CropMarketingCell;
