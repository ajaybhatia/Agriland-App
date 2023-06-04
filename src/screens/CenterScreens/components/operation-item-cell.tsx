import { Image } from 'expo-image';
import { HStack, Icon, Pressable, Text, View, VStack } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export type OperationItem = {
  btn1: string;
  btn1Icon?: string;
  btn2: string;
  btn2Icon?: string;
  btn3: string;
  btn3Icon?: string;
  title: string;
  image?: string;
};
type Props = {
  btns: OperationItem;
};
const OperationItemCell = ({ btns }: Props) => {
  return (
    <VStack mx={3} mt={2}>
      <View borderRadius={5} overflow={'hidden'}>
        <Image
          style={{ flex: 1, height: 100 }}
          source={
            btns?.image ??
            'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
          }
          placeholder={require('@assets/app-logo.png')}
          contentFit="cover"
          transition={1000}
        />
        <View
          position={'absolute'}
          left={0}
          right={0}
          top={0}
          justifyContent={'center'}
          alignItems={'center'}
          bottom={0}
          backgroundColor={'rgba(0,0,0,0.2)'}
        >
          <Text
            color={'white'}
            fontSize={14}
            fontWeight={'500'}
            fontFamily={'body'}
            fontStyle={'normal'}
          >
            {btns.title ?? 'Harinder'}
          </Text>
        </View>
      </View>
      <HStack justifyContent={'space-between'} alignItems={'center'} my={2}>
        <Pressable
          flex={0.48}
          backgroundColor={'white'}
          borderRadius={10}
          shadow={1}
          py={2}
          alignItems={'center'}
        >
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Text
              color={'black'}
              fontSize={12}
              fontWeight={'500'}
              fontFamily={'body'}
              fontStyle={'normal'}
            >
              {btns.btn1}
            </Text>
            <Icon
              as={MaterialIcons}
              name={btns?.btn1Icon ?? 'sort'}
              size={'md'}
              color={'#000'}
            />
          </HStack>
        </Pressable>
        <Pressable
          flex={0.48}
          backgroundColor={'white'}
          borderRadius={10}
          shadow={1}
          py={2}
          alignItems={'center'}
        >
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Text
              color={'black'}
              fontSize={12}
              fontWeight={'500'}
              fontFamily={'body'}
              fontStyle={'normal'}
            >
              {btns.btn2}
            </Text>
            <Icon
              as={MaterialIcons}
              name={btns?.btn2Icon ?? 'sort'}
              size={'md'}
              color={'#000'}
            />
          </HStack>
        </Pressable>
      </HStack>

      <Pressable
        backgroundColor={'white'}
        borderRadius={10}
        shadow={1}
        py={2}
        mb={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Text
            color={'black'}
            fontSize={12}
            fontWeight={'500'}
            fontFamily={'body'}
            fontStyle={'normal'}
            mr={3}
          >
            {btns.btn3}
          </Text>
          <Icon
            as={MaterialIcons}
            name={btns?.btn3Icon ?? 'sort'}
            size={'md'}
            color={'#000'}
          />
        </HStack>
      </Pressable>
    </VStack>
  );
};

export default OperationItemCell;
