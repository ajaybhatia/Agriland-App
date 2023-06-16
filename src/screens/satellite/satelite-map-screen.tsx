import { useNavigation } from '@react-navigation/native';
import { Button, Icon, IconButton, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '@/ui/theme/colors';

import SateLiteReportModal from './satelite-report-modal';

type Props = {};

const SateliteMapScreen = (props: Props) => {
  let zoomLevel = 18;
  const mapRef = React.useRef<MapView>(null);
  const nav = useNavigation();
  const [isReportVisible, setReportVisible] = useState<boolean>(false);

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

  return (
    <View flex={1}>
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
      />
      <VStack position={'absolute'} right={5} bottom={10}>
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
      </VStack>
      <Button
        onPress={() => setReportVisible(true)}
        backgroundColor={colors.button_color}
        borderRadius={8}
        width={'65%'}
        position={'absolute'}
        bottom={10}
        fontWeight={'normal'}
        fontSize={20}
        overflow={'hidden'}
        alignSelf={'center'}
      >
        {'Reports'}
      </Button>

      <Modal
        coverScreen={true}
        backdropColor="white"
        style={{ margin: 0 }}
        isVisible={isReportVisible}
        onDismiss={() => setReportVisible(false)}
        onModalHide={() => setReportVisible(false)}
      >
        <SateLiteReportModal onDismiss={() => setReportVisible(false)} />
      </Modal>
    </View>
  );
};

export default SateliteMapScreen;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  map: { flex: 1, backgroundColor: 'green' },
});
