import { Button, HStack, ScrollView, Text, View, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import type { FarmRequest } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';
import Header from '@/ui/components/Header';
import colors, { BORDER_COLOR_DARK } from '@/ui/theme/colors';

import type { FarmInfoModal } from './add-farm-crop-maps';

type Props = {
  onCurrentLocation?: (farmRequest: FarmRequest & FarmInfoModal) => void;
  farmRequest?: FarmRequest & FarmInfoModal;
  onNextStep?: (farmRequest: FarmRequest & FarmInfoModal) => void;
  onSkipStep?: (farmRequest: FarmRequest & FarmInfoModal) => void;
  isCurrentLocationLoading: boolean;
};
const AddressFarmType = ({
  onNextStep,
  onCurrentLocation,
  onSkipStep,
  farmRequest,
  isCurrentLocationLoading,
}: Props) => {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.fullscreen}>
      <View mt={50}>
        <CardWithShadow>
          <VStack p={5}>
            <Header title={'Your Location'} />
            <VStack>
              <Button
                isLoading={isCurrentLocationLoading}
                onPress={() =>
                  onCurrentLocation && onCurrentLocation(farmRequest!)
                }
                backgroundColor={colors.button_color}
                mt={5}
                borderRadius={8}
                width={'100%'}
                fontWeight={'normal'}
                fontSize={20}
                overflow={'hidden'}
                alignSelf={'center'}
              >
                {'Current location'}
              </Button>
              <HStack justifyContent={'center'} alignItems={'center'} my={8}>
                <View h={'0.4'} w={'1/3'} bgColor={'gray.300'} mr={5} />
                <Text fontWeight="medium" fontSize={13}>
                  {t('Or')}
                </Text>
                <View ml={5} w={'1/3'} h={'0.4'} bgColor={'gray.300'} />
              </HStack>
              <View>
                <GooglePlacesAutocomplete
                  textInputProps={{
                    marginBottom: 20,
                    borderWidth: 2,
                    borderColor: BORDER_COLOR_DARK,
                    borderRadius: 15,
                  }}
                  autoFillOnNotFound={true}
                  currentLocation={true}
                  debounce={0.3}
                  placeholder="Search Address"
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                  }}
                  query={{
                    key: 'YOUR API KEY',
                    language: 'en',
                  }}
                />
              </View>

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
    </ScrollView>
  );
};

export default AddressFarmType;

const styles = StyleSheet.create({
  fullscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
