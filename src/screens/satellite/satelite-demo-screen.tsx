import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useRef, useState } from 'react';
import type { ImageRequireSource } from 'react-native';
import { Dimensions, I18nManager } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {};
interface ProfilleInfo {
  img: ImageRequireSource;
  title: string;
}

const SateLiteDemoScreen = (props: Props) => {
  const nav = useNavigation();
  const coloors: ProfilleInfo[] = [
    { img: require('@assets/crop_yield.png'), title: 'Crop yield' },
    { img: require('@assets/soil_moisture.png'), title: 'Soil Moisture' },
    { img: require('@assets/crop_grass.png'), title: 'Crop Gross' },
  ];
  const ref = useRef();
  const [position, setPosition] = useState<number>(0);

  const scrollToIndex = (index: number) => {
    console.log('Scroll To ==> ', index);
    ref?.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  const scrollToNext = React.useCallback(() => {
    if (coloors.length - 1 === position) {
      nav.navigate('SubscriptionBundleScreen');
    } else {
      setPosition((p) => {
        scrollToIndex(p + 1);
        return p + 1;
      });
    }
  }, [position, nav]);

  const scrollToPrevious = React.useCallback(() => {
    if (position > 0) {
      setPosition((p) => {
        scrollToIndex(p - 1);
        return p - 1;
      });
    }
  }, [position]);

  const skipAction = React.useCallback(() => {
    nav.goBack();
    nav.navigate('SubscriptionBundleScreen');
  }, [nav]);

  return (
    <View flex={1}>
      <FlatList
        ref={ref}
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}
        pagingEnabled
        keyExtractor={(item, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={coloors}
        initialNumToRender={3}
        renderItem={({
          item,
          index,
        }: {
          item: ProfilleInfo;
          index: number;
        }) => (
          <View
            flex={1}
            w={Dimensions.get('window').width}
            minH={Dimensions.get('window').height}
            // backgroundColor={item}
          >
            <Image
              alt=""
              w={Dimensions.get('screen').width}
              minH={Dimensions.get('screen').height}
              position={'absolute'}
              left={0}
              right={0}
              top={0}
              bottom={0}
              bgColor={'amber.400'}
              //  resizeMode="cover"
              source={item.img}
            />
            <View
              flex={1}
              backgroundColor={'rgba(0,0,0,0.2)'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text
                fontSize={'3xl'}
                fontFamily={'body'}
                fontWeight={'600'}
                color={'white'}
              >
                {item.title}
              </Text>
              <VStack position={'absolute'} bottom={10} alignItems={'center'}>
                <HStack>
                  {index !== 0 && (
                    <Pressable
                      justifyContent={'center'}
                      alignItems={'center'}
                      onPress={scrollToPrevious}
                      borderColor={'white'}
                      borderWidth={5}
                      w={'16'}
                      h={'16'}
                      mx={2}
                      borderRadius={'full'}
                    >
                      <Icon
                        as={MaterialIcons}
                        name={'keyboard-arrow-left'}
                        size={'4xl'}
                        color={'white'}
                      />
                    </Pressable>
                  )}

                  <Pressable
                    justifyContent={'center'}
                    alignItems={'center'}
                    onPress={scrollToNext}
                    borderColor={'white'}
                    borderWidth={5}
                    w={'16'}
                    h={'16'}
                    mx={2}
                    borderRadius={'full'}
                  >
                    <Icon
                      as={MaterialIcons}
                      name={'keyboard-arrow-right'}
                      size={'4xl'}
                      color={'white'}
                    />
                  </Pressable>
                </HStack>
                <Pressable px={10} py={3} onPress={skipAction} mt={5}>
                  <Text
                    fontSize={'xl'}
                    fontFamily={'body'}
                    fontWeight={'300'}
                    color={'white'}
                  >
                    Skip
                  </Text>
                </Pressable>
              </VStack>
            </View>
          </View>
        )}
        //estimatedItemSize={300}
      />
    </View>
  );
};

export default SateLiteDemoScreen;
