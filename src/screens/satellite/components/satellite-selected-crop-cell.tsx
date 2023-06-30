import { Image } from 'expo-image';
import { Icon, Pressable, Text, View, VStack } from 'native-base';
import React, { useCallback } from 'react';
import { Dimensions, I18nManager, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import type { CultivationDetailResponse } from '@/apis/model';
import { setSatelliteCropDelete } from '@/core/satellite-farm';
import CardWithShadow from '@/ui/components/CardWithShadow';
import colors from '@/ui/theme/colors';

type Props = {
  item?: CultivationDetailResponse;
};
const width = Dimensions.get('screen').width;
function SatelliteSelectedCropCell({ item }: Props) {
  const onDelete = useCallback(() => {
    item && setSatelliteCropDelete(item);
  }, [item]);
  return (
    <CardWithShadow
      mx={1}
      borderColor={item?.cropDetails?.colorCode ?? colors.BORDER_COLOR}
    >
      <Pressable>
        <VStack pb={2}>
          <View style={s.img}>
            <Image
              style={s.img}
              source={`http://95.111.231.114:85${
                item?.cropDetails?.imageUrl ?? ''
              }`}
              placeholder={require('@assets/app-logo.png')}
              contentFit="cover"
              transition={1000}
            />
            <Pressable
              onPress={onDelete}
              right={0}
              top={0}
              position={'absolute'}
              alignItems={'center'}
              p={3}
              justifyContent={'center'}
            >
              <Icon
                as={MaterialIcons}
                name={'cancel'}
                size={'md'}
                color={'white'}
              />
            </Pressable>
          </View>
          <Text px={5} textAlign={'center'}>
            {I18nManager.isRTL
              ? item?.cropDetails?.name?.ar ?? ''
              : item?.cropDetails?.name?.en ?? ''}
          </Text>
        </VStack>
      </Pressable>
    </CardWithShadow>
  );
}

export default SatelliteSelectedCropCell;

const s = StyleSheet.create({
  img: {
    height: width / 2 - 80,
    width: width / 2 - 30,
    //  borderRadius: (width / 2 - 20) / 2,
    overflow: 'hidden',
  },
});
