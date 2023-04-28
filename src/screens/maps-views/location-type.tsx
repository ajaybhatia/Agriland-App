import { Button, View, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import type { FarmRequest } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';
import Header from '@/ui/components/Header';
import colors from '@/ui/theme/colors';

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
            <Button
              onPress={() =>
                onNextStep && onNextStep(MapType.PinMap, farmRequest!)
              }
              backgroundColor={colors.button_color}
              mt={10}
              borderRadius={8}
              width={'80%'}
              fontWeight={'normal'}
              fontSize={20}
              overflow={'hidden'}
              alignSelf={'center'}
            >
              {t('draw-pin')}
            </Button>
            <Button
              onPress={() =>
                onNextStep && onNextStep(MapType.WalkMap, farmRequest!)
              }
              backgroundColor={colors.button_color}
              mt={5}
              mb={5}
              borderRadius={8}
              width={'80%'}
              fontWeight={'normal'}
              fontSize={20}
              overflow={'hidden'}
              alignSelf={'center'}
            >
              {t('walk-through')}
            </Button>
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
