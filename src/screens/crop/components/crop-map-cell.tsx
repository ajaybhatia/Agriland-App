import { View, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import type { CropResponse } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';
import Header from '@/ui/components/Header';
import colors from '@/ui/theme/colors';

type Props = {
  cropItem?: CropResponse;
};

const CropMapCell = ({ cropItem }: Props) => {
  const mapRef = React.useRef<MapView>(null);

  const { t } = useTranslation();
  // const center = geolib.getCenter(
  //   cropItem?.
  //     ? farmInfo?.coordinates.map((x) => {
  //         return {
  //           latitude: x.lat ?? 0.0,
  //           longitude: x.lng ?? 0.0,
  //           altitude: x.altitude ?? 0.0,
  //         };
  //       })
  //     : [
  //         {
  //           latitude: 0.0,
  //           longitude: 0.0,
  //         },
  //       ]
  // );

  return (
    <View mx={4}>
      <CardWithShadow mx={1}>
        <View
          flex={1}
          h={150}
          overflow={'hidden'}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          borderBottomLeftRadius={10}
          borderBottomRightRadius={10}
        >
          {cropItem?.coordinates ? (
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
              // initialCamera={{
              //   center:
              //     typeof center === 'boolean'
              //       ? { latitude: 0.0, longitude: 0.0 }
              //       : center,
              //   heading: 0,
              //   pitch: 0,
              //   zoom: 17,
              // }}
            >
              {/* {farmInfo?.coordinates && farmInfo?.coordinates?.length > 0 && (
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
        <VStack
          px={5}
          py={3}
          position={'absolute'}
          left={0}
          right={0}
          top={0}
          bottom={0}
        >
          <Header
            title={cropItem?.name ?? ''}
            mt={1}
            color={colors.TITLE_COLOR}
            fontSize={13}
            fontWeight={'800'}
          />
        </VStack>
      </CardWithShadow>
    </View>
  );
};

export default CropMapCell;

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
