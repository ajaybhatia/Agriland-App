import { View, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import CardWithShadow from '@/ui/components/CardWithShadow';
import CustomButton from '@/ui/components/CustomButton';
import Header from '@/ui/components/Header';

type Props = {
  onNextStep?: () => void;
  onSkipStep?: () => void;
};
const CropDragPointArea = ({ onNextStep, onSkipStep }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.fullscreen} marginTop={5}>
      <CardWithShadow>
        <VStack p={5}>
          <View justifyContent={'center'} alignItems={'center'}>
            <Header title={'Set The Area Of Your Crop'} />
            <Header
              title={'Drag The Point To Select The Area Of Your Crop'}
              fontSize={'xs'}
              textAlign="center"
            />
          </View>

          <VStack>
            <CustomButton
              mt={10}
              onPress={onNextStep}
              width={'80%'}
              title={t('continue')}
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

export default CropDragPointArea;

const styles = StyleSheet.create({
  fullscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
  },
});
