import * as geolib from 'geolib';
import { View } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import MapView, { Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import type { CoOrdinates, FarmCropsDetailResponse } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';

import type { CropRegisterType } from '../add-crop-maps';

type Props = {
  onNextStep?: () => void;
  cropInfo: CropRegisterType;
};

const CropFarmLocationCell = ({ onNextStep, cropInfo }: Props) => {
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
    <View mx={4}>
      <CardWithShadow mx={1}>
        <View flex={1} h={150} overflow={'hidden'} borderRadius={10}>
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
      </CardWithShadow>
    </View>
  );
};

export default CropFarmLocationCell;

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
