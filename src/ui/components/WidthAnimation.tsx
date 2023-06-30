import { Animated, Dimensions } from 'react-native';
import { Image, Pressable, VStack, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';

import BodyTitle from './BodyTitle';
import type { CropRegisterType } from '@/screens/crop/add-crop-maps';
import { I18nManager } from 'react-native';
import { Image as NImage } from 'expo-image';
import { StyleSheet } from 'react-native';

export enum AnimationSide {
  LEFT,
  RIGHT,
}
type Prop = {
  mt?: number;
  animationSide: AnimationSide;
  crop: CropRegisterType;
};
const width = Dimensions.get('screen').width;
const WidthAnimation = ({
  mt = 10,
  animationSide = AnimationSide.RIGHT,
  crop,
}: Prop) => {
  const animatedValue = useRef(new Animated.Value(50)).current;
  const [isExpand, setViewExpand] = useState<boolean>(false);

  const onExpand = () => {
    Animated.timing(animatedValue, {
      toValue: width - 100,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setViewExpand(true);
    });
  };
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 50,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setViewExpand(false);
    });
  }, []);

  const onClapse = () => {
    Animated.timing(animatedValue, {
      toValue: 50,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setViewExpand(false);
    });
  };

  return (
    <Animated.View
      style={[
        styles.animatedBox,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          overflow: 'hidden',
          marginTop: mt,
          borderTopLeftRadius: 25,
          borderBottomLeftRadius: 25,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25, // isExpand ? 0 : 25,
          backgroundColor: '#FFFFFF',
          width: animatedValue,
        },
      ]}
    >
      {AnimationSide.LEFT === animationSide ? (
        <Pressable flex={1} onPress={isExpand ? onClapse : onExpand}>
          <View flexDirection={'row'} flex={1} alignItems={'center'}>
            {/* <Image
              alt=""
              source={require('@assets/logo.png')}
              h={50}
              w={50}
              alignSelf={'center'}
              rounded={'full'}
            /> */}
            <NImage
              style={{ height: 50, width: 50, borderRadius: 25 }}
              source={`http://95.111.231.114:85${crop?.crop?.imageUrl}`}
              placeholder={require('@assets/app-logo.png')}
              contentFit="cover"
              transition={1000}
            />
            {isExpand && (
              <View flexDirection={'row'} flex={1} alignItems={'center'}>
                <VStack ml={5} flex={0.5}>
                  <BodyTitle title="Farm" fontSize={12} fontWeight={100} />
                  <BodyTitle
                    numberOfLines={1}
                    title={
                      I18nManager.isRTL
                        ? crop?.farm?.name?.ar ?? ''
                        : crop?.farm?.name?.en ?? ''
                    }
                    fontSize={12}
                    fontWeight={400}
                  />
                </VStack>
                <VStack ml={2} flex={0.5}>
                  <BodyTitle title="Type" fontSize={12} fontWeight={100} />
                  <BodyTitle
                    numberOfLines={1}
                    title={
                      I18nManager.isRTL
                        ? crop?.cropCategory?.name?.ar ?? ''
                        : crop?.cropCategory?.name?.en ?? ''
                    }
                    fontSize={12}
                    fontWeight={400}
                  />
                </VStack>
              </View>
            )}
          </View>
        </Pressable>
      ) : (
        <Pressable flex={1} onPress={isExpand ? onClapse : onExpand}>
          <View
            flexDirection={'row'}
            flex={1}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            {isExpand && (
              <VStack ml={5}>
                <BodyTitle title="Farm" fontSize={12} fontWeight={100} />
                <BodyTitle
                  title={
                    I18nManager.isRTL
                      ? crop?.farm?.name?.ar ?? ''
                      : crop?.farm?.name?.en ?? ''
                  }
                  fontSize={13}
                  fontWeight={400}
                />
              </VStack>
            )}
            <Image
              alt=""
              alignSelf={'center'}
              source={require('@assets/logo.png')}
              h={50}
              w={50}
              rounded={'full'}
            />
            {/* <NImage
              style={{ height: 50, width: 50, borderRadius: 25 }}
              source={`http://95.111.231.114:85${crop?.farm.}`}
              placeholder={require('@assets/app-logo.png')}
              contentFit="cover"
              transition={1000}
            /> */}
          </View>
        </Pressable>
      )}
    </Animated.View>
  );
};

export default React.memo(WidthAnimation);

const styles = StyleSheet.create({
  animatedBox: {
    width: 50,
    height: 50,
    backgroundColor: '#0091EA',
  },
});
