import { Icon, IconButton, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import type { Location } from 'react-native-location';
import RNLocation from 'react-native-location';
import type { MapPressEvent } from 'react-native-maps';
import { Polyline } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Polygon } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import type {
  CoOrdinates,
  CropBasicResponse,
  CropCategoryResponse,
  FarmCropsDetailResponse,
  FarmResponse,
} from '@/apis/model';
import CustomButton from '@/ui/components/CustomButton';
import WidthAnimation, { AnimationSide } from '@/ui/components/WidthAnimation';

import AboutCropScreen from './about-crop-screen';
import ChooseFarmCropCategory from './choose-farm-crop-category';
import CropDragPointArea from './crop-drag-point-area';
import CropsReviewList from './crops-review-list';

type Props = {
  onNextStep?: () => void;
  onPreviousSubmit?: () => void;
};

export type CropRegisterType = {
  farm?: FarmResponse;
  crop?: CropBasicResponse;
  userLocation?: Location[];
  cropCategory?: CropCategoryResponse;
  cropArea?: FarmCropsDetailResponse;
};

const AddCropMaps = ({ onNextStep, onPreviousSubmit }: Props) => {
  enum AddCropState {
    MAP,
    CHOOSE_FARM_SELECT_CROP,
    CROP_LIST,
    DRAG_PIN,
    ENTER_ABOUT_CROP,
  }

  const { t } = useTranslation();
  let zoomLevel = 18;
  const mapRef = React.useRef<MapView>(null);
  const [userLocation, setUserLocation] = React.useState<Location[]>([]);

  const [cropState, setCropState] = React.useState<AddCropState>(
    AddCropState.CHOOSE_FARM_SELECT_CROP
  );

  const [cropInfo, setCropInfo] = useState<CropRegisterType | undefined>();

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
    RNLocation.getLatestLocation({ timeout: 40000 }).then(
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
    if (userLocation && userLocation.length > 0) {
      setCropInfo({ ...cropInfo, userLocation: userLocation });
      setCropState(AddCropState.ENTER_ABOUT_CROP);
    }
  }

  function onCropCategorySubmit(
    farm: FarmResponse,
    crop: CropBasicResponse,
    cropCategory: CropCategoryResponse
  ) {
    setCropState(AddCropState.MAP);
    setCropInfo({
      ...cropInfo,
      crop: cropInfo ? { ...cropInfo.crop, ...crop } : crop,
      farm: farm,
      cropCategory: cropCategory,
    });
    if (
      mapRef &&
      mapRef.current &&
      farm &&
      farm.coordinates &&
      farm.coordinates.length > 0
    ) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: farm?.coordinates[0]?.lat ?? 0.0,
            longitude: farm?.coordinates[0]?.lng ?? 0.0,
          },
          heading: 1,
          pitch: 1,
          zoom: 18,
        },
        { duration: 1000 }
      );
    }
  }

  function onNextMap() {
    setCropState(AddCropState.MAP);
  }

  function onNextFromAboutCrop(cropArea: FarmCropsDetailResponse) {
    setCropInfo({
      ...cropInfo,
      cropArea: cropArea,
    });
    setCropState(AddCropState.CROP_LIST);
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
  function onEditFarm(cropRequest: CropRegisterType) {
    setUserLocation(cropRequest?.userLocation ?? []);
    setCropInfo(cropRequest);
    setCropState(AddCropState.CHOOSE_FARM_SELECT_CROP);
  }

  function onAddMoreCrop() {
    setUserLocation([]);
    setCropInfo(undefined);
    setCropState(AddCropState.CHOOSE_FARM_SELECT_CROP);
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

        {userLocation &&
          userLocation.map((loc: Location, indexLoc: number) => {
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
                  latitude: loc?.latitude ?? 0.0,
                  longitude: loc?.longitude ?? 0.0,
                }}
              />
            );
          })}

        {/* Farm Poly Line */}
        {cropInfo?.farm &&
          cropInfo?.farm?.coordinates &&
          cropInfo?.farm.coordinates.length > 0 && (
            <Polyline
              // fillColor={'rgba(256,256,256,0.5)'}
              // geodesic={true}
              coordinates={cropInfo?.farm?.coordinates.map(
                (value: CoOrdinates) => {
                  return {
                    latitude: value?.lat ?? 0.0,
                    longitude: value?.lng ?? 0.0,
                  };
                }
              )}
              strokeColor="white" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={3}
              zIndex={10}
            />
          )}

        {/* Old Crops Playline */}
        {cropInfo?.farm &&
          cropInfo?.farm?.crops &&
          cropInfo?.farm?.crops.length > 0 &&
          cropInfo?.farm?.crops.map((loc: FarmCropsDetailResponse) => {
            if (loc.coordinates && loc.coordinates.length > 0) {
              return (
                <Polyline
                  coordinates={loc.coordinates.map((value: CoOrdinates) => {
                    return {
                      latitude: value?.lat ?? 0.0,
                      longitude: value?.lng ?? 0.0,
                    };
                  })}
                  strokeColor={
                    loc?.crop?.colorCode
                      ? loc?.crop?.colorCode ?? 'white'
                      : 'white'
                  } // fallback for when `strokeColors` is not supported by the map-provider
                  strokeWidth={3}
                  zIndex={10}
                />
              );
            } else {
              return undefined;
            }
          })}
      </MapView>

      {/* \right left buttons */}
      {cropState === AddCropState.MAP && (
        <>
          {cropInfo && (
            <VStack position={'absolute'} left={5} bottom={10}>
              <WidthAnimation
                animationSide={AnimationSide.RIGHT}
                crop={cropInfo}
              />
              <WidthAnimation
                animationSide={AnimationSide.LEFT}
                crop={cropInfo}
              />
            </VStack>
          )}
          <VStack position={'absolute'} right={5} bottom={10}>
            <IconButton
              borderColor={'white'}
              borderWidth={2}
              borderRadius={10}
              tintColor={'rgba(127,134,124,0.5)'}
              backgroundColor={'rgba(127,134,124,0.5)'}
              size={8}
              disabled={userLocation.length <= 0}
              onPress={onMapMarkerClear}
              icon={
                <Icon
                  as={MaterialIcons}
                  name={'clear'}
                  size={'md'}
                  color={'white'}
                />
              }
            />

            <IconButton
              mt={5}
              disabled={userLocation.length <= 0}
              borderColor={'white'}
              borderWidth={2}
              borderRadius={10}
              tintColor={'rgba(127,134,124,0.5)'}
              backgroundColor={'rgba(127,134,124,0.5)'}
              size={8}
              onPress={onMapMarkerUndo}
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name={'undo'}
                  size={'md'}
                  color={'white'}
                />
              }
            />

            <IconButton
              mt={5}
              borderColor={'white'}
              borderWidth={2}
              borderRadius={10}
              tintColor={'rgba(127,134,124,0.5)'}
              backgroundColor={'rgba(127,134,124,0.5)'}
              size={8}
              onPress={onMapZoomOut}
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name={'minus'}
                  size={'md'}
                  color={'white'}
                />
              }
            />
            <IconButton
              mt={5}
              borderColor={'white'}
              borderWidth={2}
              borderRadius={10}
              tintColor={'rgba(127,134,124,0.5)'}
              backgroundColor={'rgba(127,134,124,0.5)'}
              size={8}
              onPress={onMapZoomIN}
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name={'plus'}
                  size={'md'}
                  color={'white'}
                />
              }
            />

            <IconButton
              mt={5}
              borderColor={'white'}
              borderWidth={2}
              borderRadius={10}
              tintColor={'rgba(127,134,124,0.5)'}
              backgroundColor={'rgba(127,134,124,0.5)'}
              size={8}
              onPress={onMapCurrentLocation}
              icon={
                <Icon
                  as={FontAwesome5}
                  name={'location-arrow'}
                  size={'md'}
                  color={'white'}
                />
              }
            />
          </VStack>

          {userLocation && userLocation.length > 0 && (
            <View position={'absolute'} bottom={10} left={0} right={0}>
              <CustomButton
                mt={5}
                onPress={onAddCoordinates}
                width={'55%'}
                title={t('save-continue')}
              />
            </View>
          )}
        </>
      )}
      {cropState === AddCropState.CHOOSE_FARM_SELECT_CROP && (
        <ChooseFarmCropCategory
          cropInfo={cropInfo}
          onPreviousSubmit={onPreviousSubmit}
          onNextSubmit={onCropCategorySubmit}
        />
      )}

      {cropState === AddCropState.DRAG_PIN && (
        <CropDragPointArea onNextStep={onNextMap} />
      )}

      {cropState === AddCropState.ENTER_ABOUT_CROP && (
        <AboutCropScreen
          cropRequest={cropInfo?.cropArea}
          onNext={onNextFromAboutCrop}
        />
      )}

      {cropState === AddCropState.CROP_LIST && (
        <CropsReviewList
          cropRequest={cropInfo}
          onEditStep={onEditFarm}
          addMoreCrop={onAddMoreCrop}
          // onNextStep={onNextStep}
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
