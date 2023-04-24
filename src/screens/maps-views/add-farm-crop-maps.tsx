import { isPointWithinRadius } from 'geolib';
import { Button, Icon, IconButton, VStack } from 'native-base';
import React from 'react';
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

import colors from '@/ui/theme/colors';

import AddFarmAddress from '../farm/add-farm-address';
import FarmList from '../farm/farm-list';
import AddFarmName from '../farm/farm-name';
import LocationType from './location-type';

export enum MapType {
  PinMap,
  WalkMap,
}

const AddFramCropMaps = () => {
  enum AddFarmState {
    MAP,
    ENTER_NAME,
    ENTER_FARM_ADDRESS,
    GET_FARM_LAT_LNG_BY,
    FARM_LIST,
  }
  const locationSubscription = React.useRef(() => {});
  let zoomLevel = 18;
  const mapRef = React.useRef<MapView>(null);
  const [userLocation, setUserLocation] = React.useState<Location[]>([]);
  const [isLocationFinish, setLocationFinish] = React.useState<boolean>(false);
  const [farmState, setFarmState] = React.useState<AddFarmState>(
    AddFarmState.ENTER_NAME
  );

  console.log('userLocation ===> ', userLocation);
  const [isMapPinType, setMapType] = React.useState<MapType | undefined>();
  const [isLocationRunning, setLocationRunning] =
    React.useState<boolean>(false);

  // request location permission
  function reQuestPermission(isCurrentLocation: boolean) {
    console.log('START REQUEST');
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
          Alert.alert('Warning', 'Permission not granted.');
        }
      })
      // eslint-disable-next-line handle-callback-err
      .catch((err) => {
        Alert.alert('Warning', 'Permission request fail.');
      });
  }

  function requestCurrentLocation() {
    RNLocation.configure({ distanceFilter: undefined });
    RNLocation.getLatestLocation({ timeout: 60000 }).then(
      (latestLocation: Location | null) => {
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
              { duration: 3000 }
            );
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Current location not found ',
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
    setLocationRunning(true);

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
    setLocationRunning(false);
    setLocationFinish(true);
  }

  //configure location and start rendering

  React.useEffect(() => {
    KeepAwake.activate();
    console.log('START');

    setTimeout(() => {
      reQuestPermission(true);
    }, 300);

    return () => {
      console.log('END');
      KeepAwake.deactivate();
      // if (locationSubscription !== undefined) {
      //   locationSubscription.re
      // }
    };
  }, []);

  //  add farm steps function

  function onNextFarmName() {
    setFarmState(AddFarmState.ENTER_FARM_ADDRESS);
  }

  function onNextFarmLatLngType() {
    setFarmState(AddFarmState.GET_FARM_LAT_LNG_BY);
  }

  function onNextFarmDrawMap(type: MapType) {
    setFarmState(AddFarmState.MAP);
    setMapType(type);
    if (type === MapType.WalkMap) {
      reQuestPermission(false);
    }
  }

  function onNextFarmListShow() {
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
  function onEditFarm() {
    setFarmState(AddFarmState.ENTER_NAME);
  }

  return (
    <View style={styles.fullscreen}>
      <MapView
        mapType={'satellite'}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        followsUserLocation={false}
        loadingEnabled
        zoomControlEnabled={false}
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        onPress={(event: MapPressEvent) => {
          if (isMapPinType === MapType.PinMap) {
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
      </MapView>
      {farmState === AddFarmState.MAP && (
        <VStack position={'absolute'} right={5} bottom={10}>
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
        </VStack>
      )}
      {farmState === AddFarmState.MAP && (
        <Button
          backgroundColor={colors.button_color}
          position={'absolute'}
          bottom={10}
          onPress={onNextFarmListShow}
          borderRadius={8}
          width={'70%'}
          fontWeight={'normal'}
          fontSize={20}
          overflow={'hidden'}
          alignSelf={'center'}
        >
          {'Continue'}
        </Button>
      )}
      {farmState === AddFarmState.ENTER_NAME && (
        <AddFarmName onNextStep={onNextFarmName} />
      )}
      {farmState === AddFarmState.ENTER_FARM_ADDRESS && (
        <AddFarmAddress onNextStep={onNextFarmLatLngType} />
      )}
      {farmState === AddFarmState.GET_FARM_LAT_LNG_BY && (
        <LocationType onNextStep={onNextFarmDrawMap} />
      )}
      {farmState === AddFarmState.FARM_LIST && (
        <FarmList editFarm={onEditFarm} />
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
