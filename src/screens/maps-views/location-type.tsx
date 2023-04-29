import { View, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import type { FarmRequest } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';
import CustomButton from '@/ui/components/CustomButton';
import Header from '@/ui/components/Header';

import type { FarmInfoModal } from './add-farm-crop-maps';
import { MapType } from './add-farm-crop-maps';

type Props = {
  onNextStep?: (
    mapType: MapType,
    farmRequest: FarmRequest & FarmInfoModal
  ) => void;
  farmRequest?: FarmRequest & FarmInfoModal;
  onSkipStep?: (farmRequest: FarmRequest & FarmInfoModal) => void;
};
const LocationType = ({ onNextStep, onSkipStep, farmRequest }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.fullscreen} marginTop={5}>
      <CardWithShadow>
        <VStack p={5}>
          <Header title={t('enter-the-area-of-farm')} />
          <Header title={t('through-two-ways')} fontSize={'xs'} />
          <VStack>
            <CustomButton
              mt={10}
              onPress={() =>
                onNextStep && onNextStep(MapType.PinMap, farmRequest!)
              }
              width={'80%'}
              title={t('draw-pin')}
            />

            <CustomButton
              mt={5}
              mb={5}
              onPress={() =>
                onNextStep && onNextStep(MapType.WalkMap, farmRequest!)
              }
              width={'80%'}
              title={t('walk-through')}
            />

            {/* <Pressable
              mt={5}
              mb={5}
              alignSelf={'center'}
              onPress={() =>
                onSkipStep && onSkipStep({ ...farmRequest, coordinates: null })
              }
            >
              <Text
                fontFamily={'heading'}
                fontWeight={'bold'}
                color={colors.button_color}
              >
                {t('skip')}
              </Text>
            </Pressable> */}
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
    top: 40,
  },
});
