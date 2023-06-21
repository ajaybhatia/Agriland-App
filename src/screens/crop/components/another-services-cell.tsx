import { FlatList, Image, Pressable, Text, VStack, View } from 'native-base';
import React, { memo } from 'react';

import CardWithShadow from '@/ui/components/CardWithShadow';
import type { ImageSourcePropType } from 'react-native';

type Props = {
  onSelecteditem?: (item: ServicesType) => void;
  selecteditems?: ServicesType[];
};

export type ServicesType = {
  title: string;
  image: ImageSourcePropType;
  image_selected: ImageSourcePropType;
};

const arry: ServicesType[] = [
  {
    title: 'Sorting',
    image: require('@assets/station-booking/sorting_gray.png'),
    image_selected: require('@assets/station-booking/sorting_coloured.png'),
  },
  {
    title: 'Cool Storage',
    image: require('@assets/station-booking/cool_storage_gray.png'),
    image_selected: require('@assets/station-booking/cool_storage_coloured.png'),
  },
  {
    title: 'Storage',
    image: require('@assets/station-booking/storage_gray.png'),
    image_selected: require('@assets/station-booking/storage_coloured.png'),
  },
  {
    title: 'Delivery',
    image: require('@assets/station-booking/delivery_gray.png'),
    image_selected: require('@assets/station-booking/delivery_coloured.png'),
  },
  {
    title: 'Cool Delivery',
    image: require('@assets/station-booking/delivery_gray.png'),
    image_selected: require('@assets/station-booking/cool_delivery_coloured.png'),
  },
  {
    title: 'Packaging',
    image: require('@assets/station-booking/packaging_gray.png'),
    image_selected: require('@assets/station-booking/packaging_coloured.png'),
  },
];

const AnotherServicesCell = ({ onSelecteditem, selecteditems }: Props) => {
  return (
    <CardWithShadow>
      <View py={5}>
        <FlatList
          numColumns={3}
          extraData={selecteditems}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={arry}
          keyExtractor={(item, index) => `${item.title}`}
          renderItem={({
            item,
            index,
          }: {
            item: ServicesType;
            index: number;
          }) => {
            let isSelected =
              selecteditems &&
              selecteditems?.filter((v) => v?.title === item.title).length > 0
                ? true
                : false;

            return (
              <Pressable
                mt={2}
                w={'33%'}
                onPress={() => onSelecteditem && onSelecteditem(item)}
              >
                <VStack alignItems={'center'} justifyContent={'center'}>
                  {isSelected ? (
                    <Image
                      h={12}
                      w={12}
                      key={`${index}_selected`}
                      alt={''}
                      resizeMode="contain"
                      source={item.image_selected}
                    />
                  ) : (
                    <Image
                      h={12}
                      w={12}
                      key={`${index}_unselected`}
                      alt={''}
                      resizeMode="contain"
                      source={item.image}
                    />
                  )}
                  <Text
                    mt={2}
                    fontSize={13}
                    fontFamily={'body'}
                    fontWeight={'500'}
                    color={'gray.400'}
                  >
                    {item.title}
                  </Text>
                </VStack>
              </Pressable>
            );
          }}
          // estimatedItemSize={300}
        />
      </View>
    </CardWithShadow>
  );
};

export default memo(AnotherServicesCell);
