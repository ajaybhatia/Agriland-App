import type { CropResponse, CultivationDetailResponse } from '@/apis/model';
import { Dimensions, I18nManager } from 'react-native';
import { Pressable, VStack, View } from 'native-base';

import Header from '@/ui/components/Header';
import { Image } from 'expo-image';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

type Props = {
  item: CropResponse & CultivationDetailResponse;
  selectedItem?: CropResponse & CultivationDetailResponse;
  onSelectCrop: (
    item: CropResponse | CultivationDetailResponse | undefined
  ) => void;
};
const width = Dimensions.get('window').width;
const CropMapSelectionCell = ({ item, selectedItem, onSelectCrop }: Props) => {
  const navigation = useNavigation();
  let selectedId =
    selectedItem?.id ?? selectedItem?.cropDetails?.id ?? undefined;
  let ItemId = item?.id ?? item?.cropDetails?.id ?? undefined;
  return (
    <View
      h={100}
      mx={3}
      w={width / 2 + width / 5}
      borderRadius={20}
      borderWidth={selectedId && selectedId === ItemId ? 4 : 0}
      borderColor={
        selectedId && selectedId === ItemId ? 'green.400' : 'rgba(0,0,0,1)'
      }
      overflow={'hidden'}
    >
      <View position={'absolute'} left={0} right={0} top={0} bottom={0}>
        <Image
          style={{ flex: 1, height: 100 }}
          source={
            item?.imageUrl || item?.cropDetails?.imageUrl
              ? `http://95.111.231.114:85${
                  item?.imageUrl ?? item?.cropDetails?.imageUrl ?? ''
                }`
              : 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
          }
          placeholder={require('@assets/app-logo.png')}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <Pressable
        flex={1}
        py={2}
        px={4}
        bgColor={'rgba(0,0,0,0.3)'}
        justifyContent={'center'}
        onPress={() => {
          if (onSelectCrop) {
            if (onSelectCrop && selectedId && selectedId === ItemId) {
              onSelectCrop(item);
            }
          } else {
            navigation.navigate('FarmDetailScreen');
          }
        }}
      >
        <VStack flex={1}>
          <Header
            //title={item?.name ?? item?.cropDetails?.name ?? 'Title'}
            title={
              !I18nManager.isRTL
                ? item?.name?.en ?? item?.cropDetails?.name?.ar ?? ''
                : item?.name?.ar ?? item?.cropDetails?.name?.en ?? ''
            }
            fontSize={13}
            fontWeight={'semibold'}
            color="#FFF"
          />
        </VStack>
      </Pressable>
    </View>
  );
};

export default CropMapSelectionCell;
