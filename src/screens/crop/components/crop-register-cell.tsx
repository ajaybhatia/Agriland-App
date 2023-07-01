import { Icon, Pressable, View, VStack } from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BodyTitle from '@/ui/components/BodyTitle';

type Props = {
  onAddCrop?: () => void;
};

function CropRegisterCell({ onAddCrop }: Props) {
  return (
    <View w={100} h={135}>
      <Pressable
        onPress={onAddCrop}
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
            borderColor={'green.600'}
            borderWidth={2}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <View
              h={71}
              w={71}
              borderRadius={71 / 2}
              overflow={'hidden'}
              bgColor={'green.600'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Icon
                ml={1}
                as={MaterialCommunityIcons}
                name={'plus'}
                size={'lg'}
                color={'#FFF'}
              />
            </View>
          </View>
          <BodyTitle
            numberOfLines={2}
            title="Add Crop"
            fontSize={12}
            fontWeight={500}
          />
        </VStack>
      </Pressable>
    </View>
  );
}

export default CropRegisterCell;
