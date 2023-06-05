import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Pressable, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

import type { CropResponse } from '@/apis/model';
import Header from '@/ui/components/Header';

type Props = {
  item: CropResponse;
  selectedItem?: CropResponse;
  onSelectCrop: (item: CropResponse) => void;
};
const width = Dimensions.get('window').width;
const CropMapSelectionCell = ({ item, selectedItem, onSelectCrop }: Props) => {
  const navigation = useNavigation();
  return (
    <View
      h={100}
      mx={3}
      w={width / 2 + width / 5}
      borderRadius={20}
      borderWidth={selectedItem && selectedItem.id === item.id ? 4 : 0}
      borderColor={
        selectedItem && selectedItem.id === item.id
          ? 'green.400'
          : 'rgba(0,0,0,1)'
      }
      overflow={'hidden'}
    >
      <View position={'absolute'} left={0} right={0} top={0} bottom={0}>
        <Image
          style={{ flex: 1, height: 100 }}
          source={
            item?.imageUrl
              ? `http://95.111.231.114:88${item.imageUrl}`
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
            if (onSelectCrop && selectedItem && selectedItem.id !== item.id) {
              onSelectCrop(item);
            }
          } else {
            navigation.navigate('FarmDetailScreen');
          }
        }}
      >
        <VStack flex={1}>
          <Header
            title={item?.name ?? 'Title'}
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
