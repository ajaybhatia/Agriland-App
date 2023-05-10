import { Icon, Image, Pressable, View, VStack } from 'native-base';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import BodyTitle from '@/ui/components/BodyTitle';

type Props = {
  onSelect?: () => void;
  onNextScreen?: () => void;
  isSelected?: boolean;
};

function CropHomeCell({ onSelect, onNextScreen, isSelected }: Props) {
  return (
    <View w={100} h={120}>
      <Pressable
        onPress={() => {
          if (onSelect) {
            onSelect();
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
            borderColor={'blue.200'}
            borderWidth={2}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Image
              alt=""
              h={71}
              w={71}
              borderRadius={71 / 2}
              overflow={'hidden'}
              bgColor={'amber.200'}
              resizeMode={'center'}
              source={require('@assets/app-logo.png')}
            />
            {onSelect && isSelected && (
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
            title="Pepper"
            fontSize={12}
            fontWeight={500}
          />
        </VStack>
      </Pressable>
    </View>
  );
}

export default CropHomeCell;
