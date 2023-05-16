import * as geolib from 'geolib';
import { View, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';

import type { CoOrdinates, FarmRequest } from '@/apis/model';
import type { FarmInfoModal } from '@/screens/farm/add-farm-maps';
import CardWithShadow from '@/ui/components/CardWithShadow';
import Header from '@/ui/components/Header';
import colors from '@/ui/theme/colors';

type Props = {
  onNextStep?: () => void;
  farmInfo: FarmRequest & FarmInfoModal;
};

const FarmListCell = ({ onNextStep, farmInfo }: Props) => {
  const mapRef = React.useRef<MapView>(null);

  const { t } = useTranslation();
  const center = geolib.getCenter(
    farmInfo?.coordinates
      ? farmInfo?.coordinates.map((x) => {
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
          {farmInfo?.coordinates ? (
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
              {farmInfo?.coordinates && farmInfo?.coordinates?.length > 0 && (
                <Polygon
                  fillColor={'rgba(256,256,256,0.5)'}
                  geodesic={true}
                  coordinates={
                    farmInfo?.coordinates &&
                    farmInfo?.coordinates?.map((value: CoOrdinates) => {
                      return {
                        latitude: value?.lat ?? 0.0,
                        longitude: value?.lng ?? 0.0,
                      };
                    })
                  }
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
              {/* {farmInfo?.coordinates &&
                farmInfo?.coordinates?.length > 0 &&
                farmInfo?.coordinates?.map(
                  (loc: CoOrdinates, indexLoc: number) => {
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
                          latitude: loc?.lat ?? 0.0,
                          longitude: loc?.lng ?? 0.0,
                        }}
                      />
                    );
                  }
                )} */}
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
            title={farmInfo?.name ?? ''}
            mt={1}
            color={colors.TITLE_COLOR}
            fontSize={13}
            fontWeight={'800'}
          />
          {/* <VStack>
            <HStack
              alignItems={'center'}
              justifyContent={'space-between'}
              flex={1}
            >
              <View alignItems={'center'} flex={0.5} flexDirection={'row'}>
                <View flex={0.2} alignItems={'flex-start'} overflow={'hidden'}>
                  <Header
                    numberOfLines={1}
                    title={t('city')}
                    color={colors.TITLE_COLOR}
                    fontSize={12}
                    fontWeight={'500'}
                  />
                </View>
                <View flex={0.8} alignItems={'flex-end'}>
                  <BodyTitle
                    numberOfLines={1}
                    title={farmInfo.city ?? ''}
                    color={colors.black}
                    fontSize={12}
                    fontWeight={'500'}
                  />
                </View>
              </View>
              <View alignItems={'center'} flex={0.5} flexDirection={'row'}>
                <View flex={0.5} alignItems={'flex-start'} overflow={'hidden'}>
                  <Header
                    numberOfLines={1}
                    title={t('governerate')}
                    color={colors.TITLE_COLOR}
                    fontSize={12}
                    fontWeight={'500'}
                  />
                </View>
                <View flex={0.5} alignItems={'flex-end'}>
                  <BodyTitle
                    numberOfLines={1}
                    title={farmInfo.governorate ?? ''}
                    color={colors.black}
                    fontSize={12}
                    fontWeight={'500'}
                  />
                </View>
              </View>
            </HStack>

            <HStack
              alignItems={'center'}
              justifyContent={'space-between'}
              flex={1}
            >
              <View alignItems={'center'} flex={0.5} flexDirection={'row'}>
                <View flex={0.5} alignItems={'flex-start'} overflow={'hidden'}>
                  <Header
                    numberOfLines={1}
                    title={t('organization')}
                    color={colors.TITLE_COLOR}
                    fontSize={12}
                    fontWeight={'500'}
                  />
                </View>
                <View flex={0.5} alignItems={'flex-end'}>
                  <BodyTitle
                    numberOfLines={1}
                    title={farmInfo.organization ?? ''}
                    color={colors.black}
                    fontSize={12}
                    fontWeight={'500'}
                  />
                </View>
              </View>

              <View alignItems={'center'} flex={0.5} flexDirection={'row'}>
                <View flex={0.3} alignItems={'flex-start'}>
                  <Header
                    numberOfLines={1}
                    title={t('village')}
                    color={colors.TITLE_COLOR}
                    fontSize={12}
                    fontWeight={'500'}
                  />
                </View>
                <View flex={0.7} alignItems={'flex-end'}>
                  <BodyTitle
                    numberOfLines={1}
                    title={farmInfo.village ?? ''}
                    color={colors.black}
                    fontSize={12}
                    fontWeight={'500'}
                  />
                </View>
              </View>
            </HStack>
          </VStack> */}
          {/* <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Header
              title={'Area'}
              color={colors.TITLE_COLOR}
              fontSize={12}
              fontWeight={'500'}
            />
            <BodyTitle
              numberOfLines={1}
              ml={2}
              title={farmInfo.a ?? ""}
              color={colors.black}
              fontSize={12}
              fontWeight={'500'}
            />
          </HStack> */}
          {/* <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Header
              title={t('address')}
              color={colors.TITLE_COLOR}
              fontSize={12}
              fontWeight={'500'}
            />
            <BodyTitle
              numberOfLines={1}
              ml={2}
              title={farmInfo.address ?? ''}
              color={colors.black}
              fontSize={12}
              fontWeight={'500'}
            />
          </HStack> */}
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
