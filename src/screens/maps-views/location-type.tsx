import { Button, Pressable, Text, View, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import CardWithShadow from '@/ui/components/CardWithShadow';
import Header from '@/ui/components/Header';
import colors from '@/ui/theme/colors';

import { MapType } from './add-farm-crop-maps';

type Props = {
  onNextStep: (mapType: MapType) => void;
};
const LocationType = ({ onNextStep }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.fullscreen} marginTop={5}>
      <CardWithShadow>
        <VStack p={5}>
          <Header title={'Enter the area of the farm'} />
          <Header title={'through two ways'} fontSize={'xs'} />
          <VStack>
            <Button
              onPress={() => onNextStep(MapType.PinMap)}
              backgroundColor={colors.button_color}
              mt={10}
              borderRadius={8}
              width={'80%'}
              fontWeight={'normal'}
              fontSize={20}
              overflow={'hidden'}
              alignSelf={'center'}
            >
              {'Draw Pin'}
            </Button>
            <Button
              onPress={() => onNextStep(MapType.WalkMap)}
              backgroundColor={colors.button_color}
              mt={5}
              borderRadius={8}
              width={'80%'}
              fontWeight={'normal'}
              fontSize={20}
              overflow={'hidden'}
              alignSelf={'center'}
            >
              {'Walk through'}
            </Button>
            <Pressable mt={5} mb={5} alignSelf={'center'}>
              <Text
                fontFamily={'heading'}
                fontWeight={'bold'}
                color={colors.button_color}
              >
                {'Skip'}
              </Text>
            </Pressable>
          </VStack>
        </VStack>
      </CardWithShadow>
    </View>
  );
};

export default LocationType;

const styles = StyleSheet.create({
  fullscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
  },
});
