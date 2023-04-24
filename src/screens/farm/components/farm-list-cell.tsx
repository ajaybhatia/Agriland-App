import { HStack, VStack, View } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from 'react-native-maps';

import BodyTitle from '@/ui/components/BodyTitle';
import CardWithShadow from '@/ui/components/CardWithShadow';
import Header from '@/ui/components/Header';
import type { Location } from 'react-native-location';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '@/ui/theme/colors';
import { useTranslation } from 'react-i18next';

type Props = {
  onNextStep?: () => void;
};

const FarmListCell = ({ onNextStep }: Props) => {
  const mapRef = React.useRef<MapView>(null);
  const [userLocation, setUserLocation] = React.useState<Location[]>([
    { latitude: 31.47121730777592, longitude: 76.02227490395308 },
    { latitude: 31.47123789673949, longitude: 76.02287337183952 },
    { latitude: 31.471197862639507, longitude: 76.02355867624283 },
    { latitude: 31.470742902486244, longitude: 76.02373033761978 },
    { latitude: 31.470302524116125, longitude: 76.02319557219744 },
    { latitude: 31.47053186427911, longitude: 76.02243214845657 },
    { latitude: 31.47121730777592, longitude: 76.02227490395308 },
  ]);
  const { t } = useTranslation();

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
            zoomControlEnabled={false}
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialCamera={{
              center: {
                latitude:
                  userLocation.length > 1
                    ? userLocation[userLocation.length - 2].latitude
                    : 0.0,
                longitude:
                  userLocation.length > 1
                    ? userLocation[userLocation.length - 2].longitude
                    : 0.0,
              },
              heading: 0,
              pitch: 1,
              zoom: 17,
            }}
          >
            {userLocation.length > 0 && (
              <Polygon
                fillColor={'rgba(256,256,256,0.5)'}
                geodesic={true}
                coordinates={userLocation.map((value: Location) => {
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
            )}
            {userLocation.map((loc: Location, indexLoc: number) => {
              return (
                <Marker
                  icon={require('@assets/location.png')}
                  key={`${indexLoc}`}
                  id={`${indexLoc}`}
                  identifier={`${indexLoc}`}
                  //draggable
                  s
                  // title={'Hello Test'}
                  // description={'Test Description'}
                  nativeID={`${indexLoc}`}
                  coordinate={{
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                  }}
                />
              );
            })}
          </MapView>
        </View>
        <VStack px={5} py={3}>
          <Header
            title={'Ai AIM Farm'}
            mt={1}
            color={colors.TITLE_COLOR}
            fontSize={13}
            fontWeight={'700'}
          />
          <VStack>
            <HStack
              alignItems={'center'}
              justifyContent={'space-between'}
              w={'100%'}
            >
              <HStack alignItems={'center'} w={'48%'} bgColor={'amber.300'}>
                <Header
                  title={'City'}
                  color={colors.TITLE_COLOR}
                  fontSize={12}
                  fontWeight={'500'}
                />
                <BodyTitle
                  ml={2}
                  title={'Hoshiarpur'}
                  color={colors.black}
                  fontSize={12}
                  fontWeight={'500'}
                />
              </HStack>
              <HStack alignItems={'center'} w={'48%'} bgColor={'blue.100'}>
                <Header
                  title={'Governate'}
                  color={colors.TITLE_COLOR}
                  fontSize={12}
                  fontWeight={'500'}
                />
                <BodyTitle
                  ml={2}
                  title={'Hoshiarpur'}
                  color={colors.black}
                  fontSize={12}
                  fontWeight={'500'}
                />
              </HStack>
            </HStack>

            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <HStack alignItems={'center'} w={'48%'}>
                <Header
                  title={'Orgnization'}
                  color={colors.TITLE_COLOR}
                  fontSize={12}
                  fontWeight={'500'}
                />
                <BodyTitle
                  ml={2}
                  title={'Hoshiarpur Hoshiarpur Hoshiarpur Hoshiarpur'}
                  color={colors.black}
                  fontSize={12}
                  fontWeight={'500'}
                />
              </HStack>
              <HStack alignItems={'center'} w={'48%'}>
                <Header
                  title={'Village'}
                  color={colors.TITLE_COLOR}
                  fontSize={12}
                  fontWeight={'500'}
                />
                <BodyTitle
                  ml={2}
                  title={'Hoshiarpur'}
                  color={colors.black}
                  fontSize={12}
                  fontWeight={'500'}
                />
              </HStack>
            </HStack>
          </VStack>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Header
              title={'Area'}
              color={colors.TITLE_COLOR}
              fontSize={12}
              fontWeight={'500'}
            />
            <BodyTitle
              ml={2}
              title={'Hoshiarpur'}
              color={colors.black}
              fontSize={12}
              fontWeight={'500'}
            />
          </HStack>
        </VStack>
      </CardWithShadow>
    </View>
  );
};

export default FarmListCell;

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
