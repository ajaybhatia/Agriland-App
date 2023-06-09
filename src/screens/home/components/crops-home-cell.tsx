import { Image } from 'expo-image';
import { Icon, Pressable, View, VStack } from 'native-base';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import type { CultivationDetailResponse } from '@/apis/model';
import BodyTitle from '@/ui/components/BodyTitle';

type Props = {
  onSelect?: (item: CultivationDetailResponse) => void;
  onNextScreen?: () => void;
  selectedItem?: CultivationDetailResponse;
  item: CultivationDetailResponse;
};

function CropHomeCell({ onSelect, onNextScreen, selectedItem, item }: Props) {
  return (
    <View w={100} h={120}>
      <Pressable
        onPress={() => {
          if (onSelect) {
            item && onSelect(item);
          } else if (onNextScreen) {
            onNextScreen();
          }
        }}
        overflow={'hidden'}
        flex={1}
        flexDirection={'column'}
        margin={2}
      >
        <VStack justifyContent={'center'} alignItems={'center'}>
          <View
            borderRadius={85 / 2}
            overflow={'hidden'}
            h={85}
            w={85}
            borderColor={item?.cropDetails?.colorCode ?? 'blue.200'}
            borderWidth={2}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Image
              style={{
                height: 75,
                width: 75,
                borderRadius: 75 / 2,
                overflow: 'hidden',
              }}
              source={`http://95.111.231.114:88${
                item?.cropDetails?.imageUrl ?? ''
              }`}
              placeholder={require('@assets/app-logo.png')}
              contentFit="cover"
              transition={1000}
            />
            {onSelect &&
              selectedItem &&
              selectedItem?.cropDetails?.id === item?.cropDetails?.id && (
                <View
                  position={'absolute'}
                  left={0}
                  right={0}
                  top={0}
                  bottom={0}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={'rgba(0,0,0,0.5)'}
                >
                  <Icon
                    as={FontAwesome}
                    name={'check'}
                    size={'2xl'}
                    color={'white'}
                  />
                </View>
              )}
          </View>
          <BodyTitle
            numberOfLines={1}
            title={item?.cropDetails?.name ?? ''}
            fontSize={12}
            fontWeight={500}
          />
        </VStack>
      </Pressable>
    </View>
  );
}

export default CropHomeCell;
