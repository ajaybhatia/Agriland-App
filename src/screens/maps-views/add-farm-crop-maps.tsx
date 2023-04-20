import { isPointWithinRadius } from 'geolib';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import type { Location } from 'react-native-location';
import RNLocation from 'react-native-location';
import type { MapPressEvent, MarkerDragStartEndEvent } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Polyline } from 'react-native-maps';
import Toast from 'react-native-toast-message';

export enum MapType {
  PinMap,
  WalkMap,
}
type Props = {
  type: MapType;
};

const AddFramCropMaps = (props: Props) => {
  const locationSubscription = React.useRef(() => {});

  const mapRef = React.useRef<MapView>(null);
  const [userLocation, setUserLocation] = React.useState<Location[]>([]);
  const [isLocationFinish, setLocationFinish] = React.useState<boolean>(false);
  const [isLocationRunning, setLocationRunning] =
    React.useState<boolean>(false);

  // request location permission
  function reQuestPermission() {
    console.log('START REQUEST');
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    })
      .then((granted) => {
        if (granted) {
          startLocation();
        } else {
          console.log('reQuestPermission ==> not granted');
        }
      })
      .catch((err) => {
        console.log('reQuestPermission ==> ', err);
      });
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

    // setTimeout(() => {
    //   reQuestPermission();
    // }, 300);

    return () => {
      console.log('END');
      KeepAwake.deactivate();
      // if (locationSubscription !== undefined) {
      //   locationSubscription.
      // }
    };
  }, []);

  return (
    <View style={styles.fullscreen}>
      <MapView
        showsUserLocation
        followsUserLocation={false}
        loadingEnabled
        zoomControlEnabled={true}
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        onPress={(event: MapPressEvent) => {
          if (event.nativeEvent.coordinate != null) {
            let lat = event.nativeEvent.coordinate.latitude;
            let lng = event.nativeEvent.coordinate.longitude;
            setUserLocation((userL) => {
              return [
                ...userL,
                ...[
                  {
                    latitude: lat,
                    longitude: lng,
                  },
                ],
              ];
            });
          }
        }}
      >
        <Polyline
          coordinates={userLocation.map((value: Location) => {
            return { latitude: value.latitude, longitude: value.longitude };
          })}
          strokeColor="green" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={3}
        />
        {userLocation.map((loc: Location, indexLoc: number) => {
          return (
            <Marker
              key={`${indexLoc}`}
              id={`${indexLoc}`}
              identifier={`${indexLoc}`}
              draggable
              title={'Hello Test'}
              description={'Test Description'}
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
                console.log('event===> ', event.nativeEvent);
                let lcs = userLocation.map(
                  (location: Location, index: number) => {
                    let lat = event.nativeEvent.coordinate.latitude;
                    let lng = event.nativeEvent.coordinate.longitude;

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
