import { Icon, IconButton, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet } from 'react-native';
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
import WidthAnimation, { AnimationSide } from '@/ui/components/WidthAnimation';

import type { FarmInfoModal } from '../farm/add-farm-maps';
import type { MapType } from '../farm/add-farm-maps';
import FarmList from '../farm/farm-list';
import ChooseFarmCropCategory from './choose-farm-crop-category';
import CropDragPointArea from './crop-drag-point-area';

type Props = {
  onNextStep?: () => void;
  onPreviousSubmit?: () => void;
};

const AddCropMaps = ({ onNextStep, onPreviousSubmit }: Props) => {
  enum AddCropState {
    MAP,
    CHOOSE_FARM_SELECT_CROP,
    CROP_LIST,
    DRAG_PIN,
  }
  const { t } = useTranslation();
  let zoomLevel = 18;
  const mapRef = React.useRef<MapView>(null);
  const [userLocation, setUserLocation] = React.useState<Location[]>([]);

  const [cropState, setCropState] = React.useState<AddCropState>(
    AddCropState.CHOOSE_FARM_SELECT_CROP
  );
  const [farmInfo, setFarmInfo] = useState<
    (FarmRequest & FarmInfoModal) | undefined
  >();

  const [isMapPinType, setMapType] = React.useState<MapType.PinMap>();

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
          requestCurrentLocation();
        } else {
          Alert.alert('Warning', 'Permission not granted.');
        }
      })
      // eslint-disable-next-line handle-callback-err
      .catch((err) => {
        Alert.alert('Warning', 'Permission request fail.');
        Toast.show({
          type: 'error',
          text1: 'Permission not granted ',
        });
      });
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
        } else {
          console.log('Location not found');
          Toast.show({
            type: 'error',
            text1: 'Current location not found ',
          });
        }
      }
    );
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
    //setFarmState(AddFarmState.CROP_LIST);
  }

  function onNextMap() {
    setCropState(AddCropState.MAP);
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
    //setFarmState(AddFarmState.CHOOSE_FARM_SELECT_CROP);
  }

  function onAddMoreFarm() {
    setUserLocation([]);
    setFarmInfo(undefined);
    //setFarmState(AddFarmState.CHOOSE_FARM_SELECT_CROP);
  }

  return (
    <View style={styles.fullscreen}>
      <MapView
        mapType={'satellite'}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        followsUserLocation={false}
        loadingEnabled
        zoomControlEnabled={false}
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        onPress={(event: MapPressEvent) => {
          if (event.nativeEvent.coordinate != null) {
            let lat = event.nativeEvent.coordinate.latitude;
            let lng = event.nativeEvent.coordinate.longitude;
            setUserLocation((userL) => {
              if (userL.length > 2) {
                var newUserL = userL;
                if (newUserL.length > 3) {
                  newUserL = newUserL.slice(0, -1);
                }
                console.log('newUserL ===> ', newUserL.length, '\n', newUserL);
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

      {/* \right left buttons */}
      {cropState === AddCropState.MAP && (
        <>
          <VStack position={'absolute'} left={5} bottom={10}>
            <WidthAnimation animationSide={AnimationSide.RIGHT} />
            <WidthAnimation animationSide={AnimationSide.LEFT} />
          </VStack>
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
        </>
      )}
      {cropState === AddCropState.CHOOSE_FARM_SELECT_CROP && (
        <ChooseFarmCropCategory onPreviousSubmit={onPreviousSubmit} />
      )}

      {cropState === AddCropState.DRAG_PIN && (
        <CropDragPointArea onNextStep={onNextMap} />
      )}

      {cropState === AddCropState.CROP_LIST && (
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

export default AddCropMaps;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  map: { flex: 1, backgroundColor: 'green' },
});
