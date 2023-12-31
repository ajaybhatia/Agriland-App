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
  onFirstOption?: () => void;
  onSecondOption?: () => void;
  onThirdOption?: () => void;
};
const OperationItemCell = ({
  btns,
  onFirstOption,
  onSecondOption,
  onThirdOption,
}: Props) => {
  // const nav = useNavigation();

  return (
    <VStack mx={3} mt={2}>
      <View borderRadius={5} overflow={'hidden'}>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
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
            {btns.title ?? ''}
          </Text>
        </View>
      </View>

      <HStack justifyContent={'center'} alignItems={'center'} my={2}>
        <Pressable
          flex={0.48}
          backgroundColor={'white'}
          borderRadius={10}
          shadow={1}
          py={2}
          alignItems={'center'}
          onPress={onFirstOption}
        >
          <HStack justifyContent={'center'} alignItems={'center'}>
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
              name={btns?.btn1Icon}
              size={'md'}
              color={'#000'}
              ml={2}
            />
          </HStack>
        </Pressable>
        <Pressable
          onPress={onSecondOption}
          //onPress={() => nav.navigate('STationBookedScreen')}
          flex={0.48}
          backgroundColor={'white'}
          borderRadius={10}
          shadow={1}
          py={2}
          alignItems={'center'}
        >
          <HStack justifyContent={'center'} alignItems={'center'}>
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
              ml={2}
            />
          </HStack>
        </Pressable>
      </HStack>

      <Pressable
        onPress={onThirdOption}
        //onPress={() => nav.navigate('TestScreen')}
        backgroundColor={'white'}
        borderRadius={10}
        shadow={1}
        py={2}
        mb={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <HStack justifyContent={'center'} alignItems={'center'}>
          <Text
            color={'black'}
            fontSize={12}
            fontWeight={'500'}
            fontFamily={'body'}
            fontStyle={'normal'}
          >
            {btns.btn3}
          </Text>
          <Icon
            as={MaterialIcons}
            name={btns?.btn3Icon ?? 'sort'}
            size={'md'}
            color={'#000'}
            ml={2}
          />
        </HStack>
      </Pressable>
    </VStack>
  );
};

export default OperationItemCell;
