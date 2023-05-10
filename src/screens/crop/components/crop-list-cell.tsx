import dayjs from 'dayjs';
import * as geolib from 'geolib';
import { HStack, Text, View, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import type { Location } from 'react-native-location';
import MapView, {
  Marker,
  Polygon,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import type { CoOrdinates, FarmCropsDetailResponse } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';
import Header from '@/ui/components/Header';
import colors from '@/ui/theme/colors';

import type { CropRegisterType } from '../add-crop-maps';

type Props = {
  onNextStep?: () => void;
  cropInfo: CropRegisterType;
};

const CropListCell = ({ onNextStep, cropInfo }: Props) => {
  const mapRef = React.useRef<MapView>(null);

  const { t } = useTranslation();
  const center = geolib.getCenter(
    cropInfo?.farm?.coordinates
      ? cropInfo?.farm?.coordinates.map((x) => {
          return {
            latitude: x.lat ?? 0.0,
            longitude: x.lng ?? 0.0,
            altitude: x.altitude ?? 0.0,
          };
        })
      : [
          {
            latitude: 0.0,
            longitude: 0.0,
          },
        ]
  );

  return (
    <View my={5}>
      <CardWithShadow mx={1}>
        <View
          flex={1}
          h={150}
          overflow={'hidden'}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
        >
          {cropInfo?.farm?.coordinates ? (
            <MapView
              mapType={'satellite'}
              scrollEnabled={false}
              zoomEnabled={false}
              zoomTapEnabled={false}
              showsUserLocation={false}
              showsMyLocationButton={false}
              showsCompass={false}
              followsUserLocation={false}
              loadingEnabled
              //zoomControlEnabled={false}
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialCamera={{
                center:
                  typeof center === 'boolean'
                    ? { latitude: 0.0, longitude: 0.0 }
                    : center,
                heading: 0,
                pitch: 0,
                zoom: 17,
              }}
            >
              {cropInfo?.farm?.coordinates &&
                cropInfo?.farm?.coordinates?.length > 0 && (
                  <Polyline
                    coordinates={
                      cropInfo?.farm?.coordinates &&
                      cropInfo?.farm?.coordinates?.map((value: CoOrdinates) => {
                        return {
                          latitude: value?.lat ?? 0.0,
                          longitude: value?.lng ?? 0.0,
                        };
                      })
                    }
                    strokeWidth={3}
                    zIndex={10}
                    strokeColor="white"
                  />
                )}
              {cropInfo?.farm?.crops &&
                cropInfo?.farm?.crops.length > 0 &&
                cropInfo?.farm?.crops?.map(
                  (cropResponse: FarmCropsDetailResponse) => {
                    if (
                      cropResponse.coordinates &&
                      cropResponse.coordinates.length > 0
                    ) {
                      return (
                        <Polyline
                          coordinates={cropResponse.coordinates?.map(
                            (value: CoOrdinates) => {
                              return {
                                latitude: value?.lat ?? 0.0,
                                longitude: value?.lng ?? 0.0,
                              };
                            }
                          )}
                          strokeColor={
                            cropResponse
                              ? cropResponse?.crop?.colorCode ?? 'white'
                              : 'white'
                          }
                          strokeWidth={3}
                          zIndex={10}
                        />
                      );
                    } else {
                      return undefined;
                    }
                  }
                )}
              {cropInfo?.userLocation &&
                cropInfo?.userLocation.length > 0 &&
                cropInfo?.userLocation.map(
                  (loc: Location, indexLoc: number) => {
                    return (
                      <Marker
                        icon={require('@assets/location.png')}
                        key={`${indexLoc}`}
                        id={`${indexLoc}`}
                        identifier={`${indexLoc}`}
                        //draggable

                        // title={'Hello Test'}
                        // description={'Test Description'}
                        nativeID={`${indexLoc}`}
                        coordinate={{
                          latitude: loc?.latitude ?? 0.0,
                          longitude: loc?.longitude ?? 0.0,
                        }}
                      />
                    );
                  }
                )}

              {cropInfo?.userLocation && cropInfo?.userLocation.length > 0 && (
                <Polygon
                  fillColor={'rgba(256,256,256,0.5)'}
                  geodesic={true}
                  coordinates={cropInfo?.userLocation.map((value: Location) => {
                    return {
                      latitude: value.latitude,
                      longitude: value.longitude,
                    };
                  })}
                  strokeColor={
                    cropInfo.crop?.colorCode !== null
                      ? cropInfo.crop?.colorCode ?? 'white'
                      : 'white'
                  } // fallback for when `strokeColors` is not supported by the map-provider
                  // strokeColors={[
                  //   '#7F0000',
                  //   '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                  //   '#B24112',
                  //   '#E5845C',
                  //   '#238C23',
                  //   '#7F0000',
                  // ]}
                  strokeWidth={3}
                  zIndex={10}
                />
              )}
            </MapView>
          ) : (
            <MapView
              mapType={'satellite'}
              scrollEnabled={false}
              zoomEnabled={false}
              zoomTapEnabled={false}
              showsUserLocation={false}
              showsMyLocationButton={false}
              showsCompass={false}
              followsUserLocation={false}
              loadingEnabled
              //zoomControlEnabled={false}
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
            />
          )}
        </View>
        <VStack px={5} py={3}>
          <Header
            title={cropInfo?.farm?.name ?? ''}
            mt={1}
            color={colors.TITLE_COLOR}
            fontSize={13}
            fontWeight={'800'}
          />
          <HStack alignItems={'center'}>
            <HStack
              flex={0.5}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text
                fontFamily={'heading'}
                fontSize={12}
                fontWeight={'200'}
                color={'green.300'}
              >
                Area
              </Text>
              <Text
                fontFamily={'heading'}
                fontSize={13}
                fontWeight={'600'}
                mr={1}
              >
                {cropInfo?.cropArea?.area ?? 0}
              </Text>
            </HStack>
            <HStack
              flex={0.5}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text
                fontFamily={'heading'}
                fontSize={12}
                fontWeight={'200'}
                color={'green.300'}
                ml={1}
              >
                Farm
              </Text>
              <Text fontFamily={'heading'} fontSize={13} fontWeight={'600'}>
                {cropInfo?.farm?.name ?? ''}
              </Text>
            </HStack>
          </HStack>

          {/* second Line */}
          <HStack alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Text
              fontFamily={'heading'}
              fontSize={12}
              fontWeight={'200'}
              color={'green.300'}
            >
              Due Date Of Harvesting
            </Text>
            <Text
              fontFamily={'heading'}
              fontSize={13}
              fontWeight={'600'}
              mr={1}
            >
              {dayjs(cropInfo?.cropArea?.harvestDate ?? new Date()).format(
                'MMMM DD, YYYY'
              )}
            </Text>
          </HStack>

          {/* third Line */}

          <HStack alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Text
              fontFamily={'heading'}
              fontSize={12}
              fontWeight={'200'}
              color={'green.300'}
            >
              Due Date Of Planting
            </Text>
            <Text
              fontFamily={'heading'}
              fontSize={13}
              fontWeight={'600'}
              mr={1}
            >
              {dayjs(cropInfo?.cropArea?.sowingDate ?? new Date()).format(
                'MMMM DD, YYYY'
              )}
            </Text>
          </HStack>

          {/* Fourth Line */}

          <HStack alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Text
              fontFamily={'heading'}
              fontSize={12}
              fontWeight={'200'}
              color={'green.300'}
            >
              Type Of Irrigation
            </Text>
            <Text
              fontFamily={'heading'}
              fontSize={13}
              fontWeight={'600'}
              mr={1}
            >
              {(cropInfo?.cropArea?.typeOfIrrigation ?? 1) === 1
                ? 'New'
                : 'Traditional'}
            </Text>
          </HStack>
        </VStack>
      </CardWithShadow>
    </View>
  );
};

export default CropListCell;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 150,
    backgroundColor: 'green',
    overflow: 'hidden',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
