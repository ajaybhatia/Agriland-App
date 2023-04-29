import { isPointWithinRadius } from 'geolib';
import { Button, Icon, IconButton, VStack } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import type { Location } from 'react-native-location';
import RNLocation from 'react-native-location';
import type { MapPressEvent, MarkerDragStartEndEvent } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Polygon } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import type { FarmRequest } from '@/apis/model';
import colors from '@/ui/theme/colors';

import AddFarmAddress from '../farm/add-farm-address';
import FarmList from '../farm/farm-list';
import AddFarmName from '../farm/farm-name';
import AddressFarmType from './address-farm-type';
import LocationType from './location-type';

export enum MapType {
  DropSinglePin,
  PinMap,
  WalkMap,
}

export interface FarmInfoModal {
  governorate?: string | null;
  city?: string | null;
  village?: string | null;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

type Props = {
  onNextStep?: () => void;
};

const AddFramCropMaps = ({ onNextStep }: Props) => {
  enum AddFarmState {
    MAP,
    CURRENT_LOCATION_MAP,
    ENTER_NAME,
    ADDRESS_TYPE,
    ENTER_FARM_ADDRESS,
    GET_FARM_LAT_LNG_BY,
    FARM_LIST,
  }
  const { t } = useTranslation();
  const locationSubscription = React.useRef(() => {});
  let zoomLevel = 18;
  const mapRef = React.useRef<MapView>(null);
  const [userLocation, setUserLocation] = React.useState<Location[]>([]);
  const [isLocationFinish, setLocationFinish] = React.useState<boolean>(false);
  const [isCurrentLocationLoading, setCurrentLocationLoading] =
    React.useState<boolean>(false);
  const [isLocationWalkStart, setLocationWalkStart] =
    React.useState<boolean>(false);
  const [farmState, setFarmState] = React.useState<AddFarmState>(
    AddFarmState.ENTER_NAME
  );
  const [farmInfo, setFarmInfo] = useState<
    (FarmRequest & FarmInfoModal) | undefined
  >();

  const [isMapPinType, setMapType] = React.useState<MapType | undefined>();

  // request location permission
  function reQuestPermission(isCurrentLocation: boolean) {
    console.log('START REQUEST');
    if (!isCurrentLocation) {
      setUserLocation([]);
    }
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    })
      .then((granted) => {
        if (granted) {
          if (isCurrentLocation) {
            requestCurrentLocation();
          } else {
            configLocation();
          }
        } else {
          setCurrentLocationLoading(false);
          Alert.alert('Warning', 'Permission not granted.');
        }
      })
      // eslint-disable-next-line handle-callback-err
      .catch((err) => {
        Alert.alert('Warning', 'Permission request fail.');
        setCurrentLocationLoading(false);
      });
  }

  function cameraMoveToSelectedCurrentLocation() {
    if (mapRef && mapRef.current && farmInfo?.currentLocation) {
      console.log('Map ref found');
      mapRef.current.animateCamera(
        {
          center: {
            latitude: farmInfo?.currentLocation.lat,
            longitude: farmInfo?.currentLocation.lng,
          },
          heading: 1,
          pitch: 1,
          zoom: 18,
        },
        { duration: 1000 }
      );
    }
  }

  function requestCurrentLocation() {
    RNLocation.configure({
      distanceFilter: undefined, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'highAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 10000, // Milliseconds
      // iOS Only
      activityType: 'other',

      headingFilter: 1, // Degrees
      headingOrientation: 'portrait',
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: true,
    });
    RNLocation.getLatestLocation({ timeout: 20000 }).then(
      (latestLocation: Location | null) => {
        setCurrentLocationLoading(false);

        if (latestLocation && latestLocation != null) {
          console.log('Location found');
          if (mapRef && mapRef.current) {
            console.log('Map ref found');
            mapRef.current.animateCamera(
              {
                center: {
                  latitude: latestLocation.latitude,
                  longitude: latestLocation.longitude,
                },
                heading: latestLocation.course,
                pitch: 1,
                zoom: 18,
              },
              { duration: 1000 }
            );
          }
          setMapType((type) => {
            if (type === MapType.DropSinglePin) {
              setFarmInfo((info) => {
                return {
                  ...info,
                  currentLocation: {
                    lat: latestLocation.latitude,
                    lng: latestLocation.longitude,
                  },
                };
              });
              setFarmState(AddFarmState.CURRENT_LOCATION_MAP);
            }
            return type;
          });
        } else {
          console.log('Location not found');
          setMapType((type) => {
            if (type === MapType.DropSinglePin) {
              Toast.show({
                type: 'error',
                text1: 'Tap on map to drop a pin ',
              });
              setFarmState(AddFarmState.CURRENT_LOCATION_MAP);
            } else {
              Toast.show({
                type: 'error',
                text1: 'Current location not found ',
              });
            }
            return type;
          });
        }
      }
    );
  }

  function configLocation() {
    RNLocation.configure({
      distanceFilter: 3, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'highAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 5000, // Milliseconds
      // iOS Only
      activityType: 'other',

      headingFilter: 1, // Degrees
      headingOrientation: 'portrait',
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: true,
    });

    startLocation();
  }

  function startLocation() {
    setLocationWalkStart(true);
    locationSubscription.current = RNLocation.subscribeToLocationUpdates(
      (locations: Location[]) => {
        if (mapRef && mapRef.current) {
          mapRef.current.animateCamera(
            {
              center: {
                latitude: locations[0].latitude,
                longitude: locations[0].longitude,
              },
              heading: locations[0].course,
              pitch: 1,
              zoom: 18,
            },
            { duration: 3000 }
          );
        }

        setUserLocation((userL) => {
          var isInRadius = false;
          if (userL.length >= 12) {
            isInRadius = isPointWithinRadius(
              { latitude: userL[0].latitude, longitude: userL[0].longitude },
              {
                latitude: locations[0].latitude,
                longitude: locations[0].longitude,
              },
              50
            );
          }
          if (isInRadius) {
            stopLocationAlert();
          }
          return isInRadius
            ? [...userL, ...locations, ...[userL[0]]]
            : [...userL, ...locations];
        });
      }
    );
  }

  // stop Location
  function stopLocationAlert() {
    Alert.alert('Warning', 'Finish location');
    locationSubscription.current();
    setLocationWalkStart(false);
    setLocationFinish(true);
  }

  // pause Location
  function pauseLocation() {
    setLocationWalkStart(false);
  }

  //configure location and start rendering

  React.useEffect(() => {
    KeepAwake.activate();
    console.log('START');

    // setTimeout(() => {
    //   reQuestPermission(true);
    // }, 300);

    return () => {
      console.log('END');
      KeepAwake.deactivate();
      // if (locationSubscription !== undefined) {
      //   locationSubscription.re
      // }
    };
  }, []);

  //  add farm steps function

  function onNextFarmName(farmRequest: FarmRequest & FarmInfoModal) {
    setFarmInfo(farmRequest);
    setFarmState(AddFarmState.ADDRESS_TYPE);
  }

  function onCurrentLocationMap(farmRequest: FarmRequest & FarmInfoModal) {
    setFarmInfo(farmRequest);
    setMapType(MapType.DropSinglePin);
    setCurrentLocationLoading(true);
    reQuestPermission(true);
  }

  function onNextFarmLatLngType(farmRequest?: FarmRequest & FarmInfoModal) {
    setFarmInfo(farmRequest);
    setFarmState(AddFarmState.GET_FARM_LAT_LNG_BY);
  }

  function onNextFarmMapType() {
    setFarmState(AddFarmState.GET_FARM_LAT_LNG_BY);
  }

  function onNextFarmDrawMap(
    type: MapType,
    farmRequest: FarmRequest & FarmInfoModal
  ) {
    console.log('onNextFarmDrawMap ==> ', farmRequest.city);
    setFarmInfo(farmRequest);
    setFarmState(AddFarmState.MAP);
    setMapType(type);
    if (type === MapType.WalkMap) {
      reQuestPermission(false);
    }
  }

  function saveAndContuneWalkLocation() {
    locationSubscription.current();
    setLocationWalkStart(false);
    setLocationFinish(true);
    onAddCoordinates();
  }

  function onAddCoordinates() {
    if (userLocation.length > 0) {
      var loc: FarmRequest & FarmInfoModal = {
        ...farmInfo,
        coordinates: userLocation.map((x) => {
          return {
            lat: x.latitude,
            lng: x.longitude,
            accuracy: x.accuracy,
            altitude: x.altitude,
            altitudeAccuracy: x.altitudeAccuracy,
            course: x.course,
            speed: x.speed,
          };
        }),
      };
      onNextFarmListShow(loc);
    }
  }

  function onNextFarmListShow(farmRequest: FarmRequest & FarmInfoModal) {
    setFarmInfo(farmRequest);
    setFarmState(AddFarmState.FARM_LIST);
  }

  // map events
  function onMapCurrentLocation() {
    reQuestPermission(true);
  }

  function onMapZoomIN() {
    if (mapRef && mapRef.current) {
      zoomLevel = zoomLevel < 20 ? zoomLevel + 1 : 20;
      console.log('onMapZoomIN', zoomLevel);
      mapRef.current.animateCamera(
        {
          pitch: 1,
          zoom: zoomLevel,
        },
        { duration: 500 }
      );
    }
  }

  function onMapZoomOut() {
    if (mapRef && mapRef.current) {
      console.log('onMapZoomOut', zoomLevel);
      zoomLevel = zoomLevel > 0 ? zoomLevel - 1 : 0;
      mapRef.current.animateCamera(
        {
          pitch: 1,
          zoom: zoomLevel,
        },
        { duration: 500 }
      );
    }
  }

  function onMapMarkerUndo() {
    var tempLocation = [...userLocation];
    if (tempLocation.length > 3) {
      console.log('first1 ==> ', tempLocation.length);
      tempLocation.splice(tempLocation.length - 2, 1);
      console.log('first2 ==> ', tempLocation.length);
    } else if (tempLocation.length >= 3) {
      console.log('second');
      tempLocation = tempLocation.slice(0, -2);
    } else if (tempLocation.length > 0) {
      console.log('third');
      tempLocation = tempLocation.slice(0, -1);
    }
    setUserLocation(tempLocation);
  }

  function onMapMarkerClear() {
    setUserLocation([]);
  }

  // farm operations
  function onEditFarm(farmRequest: FarmRequest & FarmInfoModal) {
    let loc: Location[] =
      farmRequest?.coordinates?.map((x) => {
        return {
          latitude: x.lat ?? 0.0,
          longitude: x.lng ?? 0.0,
          accuracy: x.accuracy ?? 0.0,
          altitude: 0,
          altitudeAccuracy: 0,
          course: 0,
          speed: 0,
        };
      }) ?? [];
    setUserLocation(loc);
    setFarmInfo(farmRequest);
    setFarmState(AddFarmState.ENTER_NAME);
  }

  function onAddMoreFarm() {
    setUserLocation([]);
    setFarmInfo(undefined);
    setFarmState(AddFarmState.ENTER_NAME);
  }

  return (
    <View style={styles.fullscreen}>
      <MapView
        mapType={'satellite'}
        showsUserLocation={
          isMapPinType === MapType.DropSinglePin ? false : true
        }
        showsMyLocationButton={false}
        showsCompass={false}
        followsUserLocation={false}
        loadingEnabled
        zoomControlEnabled={false}
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        onPress={(event: MapPressEvent) => {
          if (isMapPinType === MapType.DropSinglePin) {
            if (event.nativeEvent.coordinate != null) {
              let lat = event.nativeEvent.coordinate.latitude;
              let lng = event.nativeEvent.coordinate.longitude;
              setFarmInfo((info) => {
                return {
                  ...info,
                  currentLocation: {
                    lat: lat,
                    lng: lng,
                  },
                };
              });
            }
          } else if (isMapPinType === MapType.PinMap) {
            if (event.nativeEvent.coordinate != null) {
              let lat = event.nativeEvent.coordinate.latitude;
              let lng = event.nativeEvent.coordinate.longitude;
              setUserLocation((userL) => {
                if (userL.length > 2) {
                  var newUserL = userL;
                  if (newUserL.length > 3) {
                    newUserL = newUserL.slice(0, -1);
                  }
                  console.log(
                    'newUserL ===> ',
                    newUserL.length,
                    '\n',
                    newUserL
                  );
                  return [
                    ...newUserL,
                    ...[
                      {
                        latitude: lat,
                        longitude: lng,
                      },
                      newUserL[0],
                    ],
                  ];
                } else {
                  return [
                    ...userL,
                    ...[
                      {
                        latitude: lat,
                        longitude: lng,
                      },
                    ],
                  ];
                }
              });
            }
          }
        }}
      >
        {userLocation.length > 0 && (
          <Polygon
            fillColor={'rgba(256,256,256,0.5)'}
            geodesic={true}
            coordinates={userLocation.map((value: Location) => {
              return { latitude: value.latitude, longitude: value.longitude };
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
        )}
        {userLocation.map((loc: Location, indexLoc: number) => {
          return (
            <Marker
              key={`${indexLoc}`}
              id={`${indexLoc}`}
              identifier={`${indexLoc}`}
              //draggable

              // title={'Hello Test'}
              // description={'Test Description'}
              nativeID={`${indexLoc}`}
              coordinate={{
                latitude: loc.latitude,
                longitude: loc.longitude,
              }}
              onPress={() => {
                Toast.show({
                  type: 'error',
                  text1: 'view show',
                });
              }}
              //   centerOffset={{x: -42, y: -60}}
              //   anchor={{x: 0.84, y: 1}}
              //opacity={0.6}
              // image={require('@assets/images/home/location-pin.png')}
              onDragEnd={(event: MarkerDragStartEndEvent) => {
                console.log('event===> ', event);
                let lcs = userLocation.map(
                  (location: Location, index: number) => {
                    let lat = event.nativeEvent.coordinate.latitude;
                    let lng = event.nativeEvent.coordinate.longitude;
                    console.log(
                      'event update===> ',
                      index,
                      ' == ',
                      event.nativeEvent.id,
                      ' == ',
                      `${index}` === event.nativeEvent.id
                    );
                    if (`${index}` === event.nativeEvent.id) {
                      return {
                        latitude: lat,
                        longitude: lng,
                        accuracy: location.accuracy,
                        altitude: location.altitude,
                        course: location.course,
                        altitudeAccuracy: location.altitudeAccuracy,
                        speed: location.speed,
                        timestamp: location.timestamp,
                        courseAccuracy: location.courseAccuracy,
                        floor: location.floor,
                        fromMockProvider: location.fromMockProvider,
                        speedAccuracy: location.speedAccuracy,
                      };
                    } else {
                      return location;
                    }
                  }
                );

                setUserLocation(lcs);
              }}
            />
          );
        })}
        {/* isMapPinType === MapType.DropSinglePin && */}
        {farmInfo?.currentLocation && (
          <Marker
            key={`${'map_current'}`}
            coordinate={{
              latitude: farmInfo?.currentLocation.lat ?? 0.0,
              longitude: farmInfo?.currentLocation.lng ?? 0.0,
            }}
          />
        )}
      </MapView>
      {farmState === AddFarmState.MAP && (
        <VStack position={'absolute'} right={5} bottom={10}>
          {isMapPinType === MapType.PinMap && (
            <IconButton
              borderRadius={3}
              size={8}
              bgColor={'white'}
              disabled={userLocation.length <= 0}
              onPress={onMapMarkerClear}
              icon={
                <Icon
                  as={MaterialIcons}
                  name={'clear'}
                  size={'md'}
                  color={'black'}
                />
              }
            />
          )}
          {isMapPinType === MapType.PinMap && (
            <IconButton
              mt={5}
              disabled={userLocation.length <= 0}
              borderRadius={3}
              size={8}
              bgColor={'white'}
              onPress={onMapMarkerUndo}
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name={'undo'}
                  size={'md'}
                  color={'black'}
                />
              }
            />
          )}
          <IconButton
            mt={5}
            borderRadius={3}
            size={8}
            bgColor={'white'}
            onPress={onMapZoomOut}
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name={'minus'}
                size={'md'}
                color={'black'}
              />
            }
          />
          <IconButton
            mt={5}
            borderRadius={3}
            size={8}
            bgColor={'white'}
            onPress={onMapZoomIN}
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name={'plus'}
                size={'md'}
                color={'black'}
              />
            }
          />
          {isMapPinType === MapType.PinMap && (
            <IconButton
              mt={5}
              borderRadius={3}
              size={8}
              bgColor={'white'}
              onPress={onMapCurrentLocation}
              icon={
                <Icon
                  as={FontAwesome5}
                  name={'location-arrow'}
                  size={'md'}
                  color={'black'}
                />
              }
            />
          )}
        </VStack>
      )}
      {farmState === AddFarmState.MAP &&
        userLocation.length > 0 &&
        isMapPinType === MapType.PinMap && (
          <Button
            backgroundColor={colors.button_color}
            position={'absolute'}
            bottom={10}
            onPress={onAddCoordinates}
            borderRadius={8}
            width={'70%'}
            fontWeight={'normal'}
            fontSize={20}
            overflow={'hidden'}
            alignSelf={'center'}
          >
            {t('save-continue')}
          </Button>
        )}
      {isMapPinType === MapType.WalkMap && farmState === AddFarmState.MAP && (
        <VStack
          position={'absolute'}
          bottom={10}
          width={'70%'}
          alignItems={'center'}
          justifyContent={'center'}
          alignSelf={'center'}
        >
          {isLocationWalkStart && (
            <>
              <Button
                mt={5}
                backgroundColor={colors.button_color}
                onPress={stopLocationAlert}
                borderRadius={8}
                width={'70%'}
                fontWeight={'normal'}
                fontSize={20}
                overflow={'hidden'}
              >
                {t('stop')}
              </Button>
              {userLocation.length > 0 && (
                <Button
                  mt={5}
                  backgroundColor={colors.button_color}
                  onPress={saveAndContuneWalkLocation}
                  borderRadius={8}
                  width={'70%'}
                  fontWeight={'normal'}
                  fontSize={20}
                  overflow={'hidden'}
                  alignSelf={'center'}
                >
                  {t('save-continue')}
                </Button>
              )}
            </>
          )}

          {!isLocationWalkStart && (
            <>
              <Button
                backgroundColor={colors.button_color}
                onPress={() => reQuestPermission(false)}
                borderRadius={8}
                width={'70%'}
                fontWeight={'normal'}
                fontSize={20}
                overflow={'hidden'}
              >
                {userLocation.length > 0 ? t('restart') : t('start')}
              </Button>
              {userLocation.length > 0 && (
                <Button
                  mt={5}
                  backgroundColor={colors.button_color}
                  onPress={saveAndContuneWalkLocation}
                  borderRadius={8}
                  width={'70%'}
                  fontWeight={'normal'}
                  fontSize={20}
                  overflow={'hidden'}
                  alignSelf={'center'}
                >
                  {t('save-continue')}
                </Button>
              )}
            </>
          )}
        </VStack>
      )}
      {farmState === AddFarmState.CURRENT_LOCATION_MAP && (
        <Button
          position={'absolute'}
          bottom={10}
          backgroundColor={colors.button_color}
          onPress={onNextFarmMapType}
          borderRadius={8}
          width={'70%'}
          fontWeight={'normal'}
          fontSize={20}
          overflow={'hidden'}
          alignSelf={'center'}
        >
          {t('continue')}
        </Button>
      )}
      {farmState === AddFarmState.ENTER_NAME && (
        <AddFarmName farmRequest={farmInfo} onNextStep={onNextFarmName} />
      )}
      {farmState === AddFarmState.ADDRESS_TYPE && (
        <AddressFarmType
          isCurrentLocationLoading={isCurrentLocationLoading}
          farmRequest={farmInfo}
          onCurrentLocation={onCurrentLocationMap}
        />
      )}
      {farmState === AddFarmState.GET_FARM_LAT_LNG_BY && (
        <LocationType
          farmRequest={farmInfo}
          onNextStep={onNextFarmDrawMap}
          onSkipStep={onNextFarmListShow}
        />
      )}
      {farmState === AddFarmState.ENTER_FARM_ADDRESS && (
        <AddFarmAddress
          farmRequest={farmInfo}
          onNextStep={onNextFarmLatLngType}
        />
      )}

      {farmState === AddFarmState.FARM_LIST && (
        <FarmList
          farmRequest={farmInfo}
          onEditStep={onEditFarm}
          addMoreFarm={onAddMoreFarm}
          onNextStep={onNextStep}
        />
      )}
    </View>
  );
};

export default AddFramCropMaps;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  map: { flex: 1, backgroundColor: 'green' },
});
