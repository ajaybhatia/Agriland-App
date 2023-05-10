import { useNavigation } from '@react-navigation/native';
import * as geolib from 'geolib';
import { HStack, Pressable, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';

import type {
  CoOrdinates,
  FarmCropsDetailResponse,
  FarmResponse,
} from '@/apis/model';
import BodyTitle from '@/ui/components/BodyTitle';
import Header from '@/ui/components/Header';

type Props = {
  item: FarmResponse;
  selectedItem: FarmResponse | undefined;
  onSelectFarm?: (item: FarmResponse) => void;
};
const width = Dimensions.get('window').width;
export default function FarmMapSelectionCell({
  item,
  selectedItem,
  onSelectFarm,
}: Props) {
  const mapRef = React.useRef<MapView>(null);
  const navigation = useNavigation();

  // get center of map

  const center = geolib.getCenter(
    item.coordinates && item.coordinates.length > 0
      ? item.coordinates.map((x: CoOrdinates) => {
          return {
            latitude: x?.lat ?? 0.0,
            longitude: x?.lng ?? 0.0,
            altitude: x?.altitude ?? 0.0,
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
    <View
      h={100}
      mx={3}
      w={width / 2 + width / 5}
      borderRadius={20}
      borderWidth={2}
      borderColor={
        selectedItem && selectedItem.id === item.id ? 'black' : 'rgba(0,0,0,0)'
      }
      overflow={'hidden'}
    >
      <View position={'absolute'} left={0} right={0} top={0} bottom={0}>
        {item.coordinates && item.coordinates.length > 0 ? (
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
            {item.coordinates && item.coordinates.length > 0 && (
              <Polygon
                fillColor={'rgba(256,256,256,0.5)'}
                geodesic={true}
                coordinates={
                  item.coordinates &&
                  item.coordinates.map((value: CoOrdinates) => {
                    return {
                      latitude: value?.lat ?? 0.0,
                      longitude: value?.lng ?? 0.0,
                    };
                  })
                }
                strokeWidth={3}
                zIndex={10}
              />
            )}

            {/* Farm Markers */}
            {item.coordinates &&
              item.coordinates.map((loc: CoOrdinates, indexLoc: number) => {
                return (
                  <Marker
                    key={`${indexLoc}`}
                    icon={require('@assets/location.png')}
                    coordinate={{
                      latitude: loc?.lat ?? 0.0,
                      longitude: loc?.lng ?? 0.0,
                    }}
                  />
                );
              })}

            {/* Old Crops Playline */}
            {item.crops &&
              item.crops !== null &&
              item.crops.length > 0 &&
              item.crops.map(
                (loc: FarmCropsDetailResponse, indexLoc: number) => {
                  if (loc.coordinates && loc.coordinates.length > 0) {
                    return (
                      <Polygon
                        key={`${indexLoc}`}
                        fillColor={'rgba(256,256,256,0.5)'}
                        geodesic={true}
                        coordinates={loc.coordinates.map(
                          (value: CoOrdinates) => {
                            return {
                              latitude: value?.lat ?? 0.0,
                              longitude: value?.lng ?? 0.0,
                            };
                          }
                        )}
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
                }
              )}

            {/* old crop Markers */}
            {item.crops &&
              item.crops !== null &&
              item.crops.length > 0 &&
              item.crops.map((cropLatLng: FarmCropsDetailResponse) => {
                if (
                  cropLatLng.coordinates &&
                  cropLatLng.coordinates.length > 0
                ) {
                  return cropLatLng.coordinates.map(
                    (loc: CoOrdinates, indexLoc: number) => {
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
                            latitude: loc?.lat ?? 0.0,
                            longitude: loc?.lng ?? 0.0,
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
      <Pressable
        flex={1}
        py={2}
        px={4}
        justifyContent={'center'}
        onPress={() => {
          if (onSelectFarm) {
            if (onSelectFarm && selectedItem && selectedItem.id !== item.id) {
              onSelectFarm(item);
            }
          } else {
            navigation.navigate('FarmDetailScreen');
          }
        }}
      >
        <VStack>
          <Header
            title={item?.name ?? 'Title'}
            fontSize={13}
            fontWeight={'semibold'}
            color="#FFF"
          />
          {item?.area !== undefined && (
            <HStack alignItems={'center'}>
              <BodyTitle
                title="Area"
                fontSize={11}
                fontWeight={'100'}
                color="#FFF"
              />
              <Header
                ml={2}
                title={item?.area ?? ' Area here...'}
                fontSize={12}
                fontWeight={'400'}
                color="#FFF"
              />
            </HStack>
          )}

          {item?.crops && item?.crops.length > 0 && (
            <>
              <BodyTitle
                title="Farm Crops"
                fontSize={11}
                fontWeight={'100'}
                color="#FFF"
              />
              <Header
                title={item?.crops
                  .map((item) => item.crop?.name ?? '')
                  .join(', ')}
                fontSize={12}
                fontWeight={'400'}
                color="#FFF"
              />
            </>
          )}
        </VStack>
      </Pressable>
    </View>
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
