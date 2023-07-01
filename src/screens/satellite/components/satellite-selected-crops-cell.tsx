import { Image } from 'expo-image';
import { Icon, Pressable, Text, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions, I18nManager, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import type { FarmonautFarmCropModel } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';

type Props = {
  item?: FarmonautFarmCropModel;
  isSelected?: boolean;
  onSelect?: (item: FarmonautFarmCropModel) => void;
};
const width = Dimensions.get('screen').width;
function SatelliteSelectedCropsCell({ item, onSelect, isSelected }: Props) {
  return (
    <CardWithShadow mx={1}>
      <Pressable onPress={() => item && onSelect && onSelect(item)}>
        <VStack pb={2}>
          <View style={s.img}>
            <Image
              style={s.img}
              source={`http://95.111.231.114:85${
                item?.cropModel?.imageUrl ?? ''
              }`}
              placeholder={require('@assets/app-logo.png')}
              contentFit="cover"
              transition={1000}
            />
            {isSelected === true && (
              <View
                left={0}
                right={0}
                top={0}
                bottom={0}
                bgColor={'rgba(0, 0, 0, 0.3)'}
                position={'absolute'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Icon
                  as={FontAwesome}
                  name={'check'}
                  size={'md'}
                  color={'white'}
                />
              </View>
            )}
          </View>
          <Text px={5} textAlign={'center'}>
            {I18nManager.isRTL
              ? item?.cropModel?.name?.ar ?? ''
              : item?.cropModel?.name?.en ?? ''}
          </Text>
        </VStack>
      </Pressable>
    </CardWithShadow>
  );
}

export default SatelliteSelectedCropsCell;

const s = StyleSheet.create({
  img: {
    height: width / 2 - 80,
    width: width / 2 - 30,
    //  borderRadius: (width / 2 - 20) / 2,
    overflow: 'hidden',
  },
});
