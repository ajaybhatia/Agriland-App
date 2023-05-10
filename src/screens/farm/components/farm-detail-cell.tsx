import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import * as geolib from 'geolib';
import { HStack, Text, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import type { Location } from 'react-native-location';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';

import type { FarmResponse } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';

type Props = {
  item: FarmResponse;
};
const width = Dimensions.get('window').width;

export default function FarmDetailCell({ item }: Props) {
  const mapRef = React.useRef<MapView>(null);
  const navigation = useNavigation();
  const [farmLatLng, setFarmLatLng] = useState<Location[]>([
    {
      latitude: 31.471237324823903,
      longitude: 76.02251160889864,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      course: 0,
      speed: 0,
      timestamp: 0,
    },
    {
      latitude: 31.471316249142706,
      longitude: 76.02374475449324,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      course: 0,
      speed: 0,
      timestamp: 0,
    },
    {
      latitude: 31.46978207428038,
      longitude: 76.02367099374533,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      course: 0,
      speed: 0,
      timestamp: 0,
    },
    {
      latitude: 31.470103209328617,
      longitude: 76.02250993251802,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      course: 0,
      speed: 0,
      timestamp: 0,
    },
    {
      latitude: 31.471237324823903,
      longitude: 76.02251160889864,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      course: 0,
      speed: 0,
      timestamp: 0,
    },
  ]);
  type CropLatLng = {
    latLng: Location[];
  };
  const [oldCropLatLng, setOldCropLatLng] = useState<CropLatLng[]>([
    {
      latLng: [
        {
          latitude: 31.47076434943189,
          longitude: 76.02353118360044,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          course: 0,
          speed: 0,
          timestamp: 0,
        },
        {
          latitude: 31.470710017160044,
          longitude: 76.02317981421947,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          course: 0,
          speed: 0,
          timestamp: 0,
        },
        {
          latitude: 31.470874729634378,
          longitude: 76.02301955223083,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          course: 0,
          speed: 0,
          timestamp: 0,
        },
        {
          latitude: 31.470965378563438,
          longitude: 76.02332934737206,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          course: 0,
          speed: 0,
          timestamp: 0,
        },
        {
          latitude: 31.47076434943189,
          longitude: 76.02353118360044,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          course: 0,
          speed: 0,
          timestamp: 0,
        },
      ],
    },
    {
      latLng: [
        {
          latitude: 31.47046180406447,
          longitude: 76.02345541119576,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          course: 0,
          speed: 0,
          timestamp: 0,
        },
        {
          latitude: 31.470135808906832,
          longitude: 76.02349162101746,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          course: 0,
          speed: 0,
          timestamp: 0,
        },
        {
          latitude: 31.470096060296804,
          longitude: 76.0232961550355,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          course: 0,
          speed: 0,
          timestamp: 0,
        },
        {
          latitude: 31.4703883122728,
          longitude: 76.0231040418148,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          course: 0,
          speed: 0,
          timestamp: 0,
        },
        {
          latitude: 31.47046180406447,
          longitude: 76.02345541119576,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          course: 0,
          speed: 0,
          timestamp: 0,
        },
      ],
    },
  ]);

  // get center of map

  const center = geolib.getCenter(
    farmLatLng.length > 0
      ? farmLatLng.map((x: Location) => {
          return {
            latitude: x.latitude,
            longitude: x.longitude ?? 0.0,
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
  //colors.BACKGROUND_CELL_COLOR
  return (
    <CardWithShadow>
      <HStack
        h={140}
        //w={width / 2 + width / 5}
        borderRadius={10}
        alignItems={'center'}
        overflow={'hidden'}
      >
        <View w={120} overflow={'hidden'}>
          {farmLatLng.length > 0 ? (
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
                zoom: 15,
              }}
            >
              {/* Farm Poly Line */}
              {farmLatLng.length > 0 && (
                <Polygon
                  fillColor={'rgba(256,256,256,0.5)'}
                  geodesic={true}
                  coordinates={farmLatLng.map((value: Location) => {
                    return {
                      latitude: value.latitude,
                      longitude: value.longitude,
                    };
                  })}
                  strokeWidth={3}
                  zIndex={10}
                />
              )}

              {/* Farm Markers */}
              {farmLatLng.map((loc: Location, indexLoc: number) => {
                return (
                  <Marker
                    key={`${indexLoc}`}
                    icon={require('@assets/location.png')}
                    coordinate={{
                      latitude: loc.latitude,
                      longitude: loc.longitude,
                    }}
                  />
                );
              })}

              {/* Old Crops Playline */}
              {oldCropLatLng.length > 0 &&
                oldCropLatLng.map((loc: CropLatLng, indexLoc: number) => {
                  if (loc.latLng.length > 0) {
                    return (
                      <Polygon
                        key={`${indexLoc}`}
                        fillColor={'rgba(256,256,256,0.5)'}
                        geodesic={true}
                        coordinates={loc.latLng.map((value: Location) => {
                          return {
                            latitude: value.latitude,
                            longitude: value.longitude,
                          };
                        })}
                        strokeColor="white" // fallback for when `strokeColors` is not supported by the map-provider
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
                    );
                  } else {
                    return undefined;
                  }
                })}

              {/* old crop Markers */}
              {oldCropLatLng.length > 0 &&
                oldCropLatLng.map((cropLatLng: CropLatLng) => {
                  if (cropLatLng.latLng.length > 0) {
                    return cropLatLng.latLng.map(
                      (loc: Location, indexLoc: number) => {
                        return (
                          <Marker
                            key={`${indexLoc}`}
                            id={`${indexLoc}`}
                            identifier={`${indexLoc}`}
                            //draggable
                            icon={require('@assets/location.png')}
                            // title={'Hello Test'}
                            // description={'Test Description'}
                            nativeID={`${indexLoc}`}
                            coordinate={{
                              latitude: loc.latitude,
                              longitude: loc.longitude,
                            }}
                          />
                        );
                      }
                    );
                  } else {
                    return undefined;
                  }
                })}
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
        <VStack flex={1} mx={3}>
          <HStack>
            <Text
              fontSize={13}
              fontWeight={'600'}
              fontFamily={'heading'}
              color="#000"
            >
              {item?.name ?? 'Title'}
            </Text>
            <Text
              ml={3}
              fontSize={13}
              fontWeight={'600'}
              color="green.500"
              fontFamily={'heading'}
            >
              {'Orange'}
            </Text>
          </HStack>
          <HStack justifyContent={'space-between'}>
            <Text
              fontSize={12}
              fontWeight={'200'}
              fontFamily={'heading'}
              color="#000"
            >
              {'Space'}
            </Text>
            <Text
              ml={3}
              fontSize={13}
              fontWeight={'700'}
              color="#000"
              fontFamily={'heading'}
            >
              {'50 acres'}
            </Text>
          </HStack>
          <HStack justifyContent={'space-between'}>
            <Text
              fontSize={12}
              fontWeight={'200'}
              fontFamily={'heading'}
              color="#000"
            >
              {'Quantity'}
            </Text>
            <Text
              ml={3}
              fontSize={13}
              fontWeight={'700'}
              color="#000"
              fontFamily={'heading'}
            >
              {'30 tons'}
            </Text>
          </HStack>
          <HStack justifyContent={'space-between'}>
            <Text
              fontSize={12}
              fontWeight={'200'}
              fontFamily={'heading'}
              color="#000"
            >
              {'Sawing'}
            </Text>
            <Text
              ml={3}
              fontSize={13}
              fontWeight={'700'}
              color="#000"
              fontFamily={'heading'}
            >
              {'12/2'}
            </Text>
          </HStack>
          <HStack justifyContent={'space-between'}>
            <Text
              fontSize={12}
              fontWeight={'200'}
              fontFamily={'heading'}
              color="#000"
            >
              {'Date'}
            </Text>
            <Text
              ml={3}
              fontSize={13}
              fontWeight={'700'}
              color="#000"
              fontFamily={'heading'}
            >
              {dayjs(Date()).format('MMMM DD, YYYY')}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </CardWithShadow>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 100,
    backgroundColor: 'green',
    overflow: 'hidden',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
