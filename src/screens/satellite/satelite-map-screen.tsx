import { useNavigation } from '@react-navigation/native';
import { Button, Icon, IconButton, View, VStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import MapView, { Marker, Overlay, PROVIDER_GOOGLE } from 'react-native-maps';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  usePostApiFarmonautGetfieldareaindeximage,
  usePostApiFarmonautGetfieldreport,
  usePostApiFarmonautGetsenseddays,
} from '@/apis/endpoints/api';
import type {
  ActivityDays,
  FarmImageCoordinates,
  ResponseDTO,
} from '@/apis/model';
import { useSatelliteFarm } from '@/core/satellite-farm';
import AppLoader from '@/ui/components/AppLoader';
import colors from '@/ui/theme/colors';

type Props = {};

const SateliteMapScreen = (props: Props) => {
  const senseDays = usePostApiFarmonautGetsenseddays();
  const fieldAreaIndexImg = usePostApiFarmonautGetfieldareaindeximage();
  const findFieldPdf = usePostApiFarmonautGetfieldreport();
  const selectedFarm = useSatelliteFarm.use.selectedFarm();
  let zoomLevel = 18;
  const mapRef = React.useRef<MapView>(null);
  const nav = useNavigation();
  const [isReportVisible, setReportVisible] = useState<boolean>(false);
  const [fieldData, setFieldData] = useState<
    FarmImageCoordinates | undefined
  >();

  function getFarmInfo(sensedDay: string) {
    fieldAreaIndexImg.mutate(
      {
        data: {
          fieldID: '1686736168414',
          imageType: 'ndwi',
          sensedDay: sensedDay,
          uid: '0x61vkpvHEMkbPYiAnrNVQIFtqY2',
        },
      },
      {
        onSuccess: (data: FarmImageCoordinates) => {
          if (data) {
            console.log('FarmImageCoordinates ===> ', data);
            setFieldData(data);
            if (
              data.fieldMinLat &&
              data.fieldMinLong &&
              data.fieldMinLat !== '' &&
              data.fieldMinLong !== ''
            ) {
              moveToMap(Number(data.fieldMinLat), Number(data.fieldMinLong));
            }
          } else {
            Toast.show({
              type: 'error',
              text1: 'Something went wrong!',
            });
          }
        },
        onError(error) {
          console.log('error getSenseDays ==> ', error);
          Toast.show({
            type: 'error',
            text1: error.message,
          });
        },
      }
    );
  }

  // senseDayApi
  function getSenseDays() {
    if (selectedFarm && selectedFarm.id) {
      console.log('getSenseDays ===> ', {
        fieldID: '1686736168414', //selectedFarm.id,
        uid: '0x61vkpvHEMkbPYiAnrNVQIFtqY2',
      });
      senseDays.mutate(
        {
          data: {
            fieldID: '1686736168414', //selectedFarm.id,
            uid: '0x61vkpvHEMkbPYiAnrNVQIFtqY2',
          },
        },
        {
          onSuccess: (data: ActivityDays) => {
            if (data && data.days) {
              // let keys = Object.keys(JSON.parse(data.result));
              // if (keys.length > 0) {
              //   getFarmInfo(keys[0]);
              // }
              if (data.days.length > 0) {
                getFarmInfo(data.days[0]);
              }
            } else {
              Toast.show({
                type: 'error',
                text1: 'Something went wrong!',
              });
            }
          },
          onError(error) {
            console.log('error getSenseDays ==> ', error);
            Toast.show({
              type: 'error',
              text1: error.message,
            });
          },
        }
      );
    }
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
  function moveToMap(latitude: number, longitude: number) {
    if (mapRef && mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: latitude,
            longitude: longitude,
          },
          heading: 1,
          pitch: 1,
          zoom: 18,
        },
        { duration: 1000 }
      );
    }
  }

  const getPdfUrl = useCallback(() => {
    findFieldPdf.mutate(
      {
        data: {
          fieldID: '1686736168414',
          language: 'ar',
          reportFormat: 'ndwi',
          sensedDay: '20230610',
          uid: '0x61vkpvHEMkbPYiAnrNVQIFtqY2',
        },
      },
      {
        onSuccess: (data: ResponseDTO) => {
          if (data) {
            console.log('getPdfUrl ===> ', data);
            if (data.result && data.result.url) {
              onDownLoadReport(data.result.url);
            }
          } else {
            Toast.show({
              type: 'error',
              text1: 'Something went wrong!',
            });
          }
        },
        onError(error) {
          console.log('error getSenseDays ==> ', error);
          Toast.show({
            type: 'error',
            text1: error.message,
          });
        },
      }
    );
  }, [fieldData]);

  const onDownLoadReport = (source: string) => {
    //const source = "https://www.africau.edu/images/default/sample.pdf";
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${dirs.DocumentDir}/${fieldData?.fieldID ?? 'farm'}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: `${fieldData?.fieldID ?? 'farm'}_${new Date().getTime()}`,
        description: 'File downloaded by download manager.',
        mime: 'application/pdf',
      },
    })
      .fetch('GET', source)
      .then((res) => {
        // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
        // whereas in android, the download manager is handling the download for us.
        if (Platform.OS === 'ios') {
          const filePath = res.path();
          let options = {
            type: 'application/pdf',
            url: filePath,
            saveToFiles: true,
          };
          Share.open(options)
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log('BLOB ERROR -> ', err));
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (
  //       mapRef &&
  //       mapRef.current &&
  //       selectedFarm &&
  //       selectedFarm.coordinates &&
  //       selectedFarm.coordinates.length > 0
  //     ) {
  //       moveToMap(
  //         selectedFarm?.coordinates[0]?.lat ?? 0.0,
  //         selectedFarm?.coordinates[0]?.lng ?? 0.0
  //       );
  //     }
  //   }, 300);
  // }, [selectedFarm]);

  useEffect(() => {
    getSenseDays();
  }, []);
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
        // initialCamera={
        //   selectedFarm &&
        //   selectedFarm.coordinates &&
        //   selectedFarm.coordinates.length > 0
        //     ? {
        //         center:
        //           selectedFarm &&
        //           selectedFarm.coordinates &&
        //           selectedFarm.coordinates.length > 0
        //             ? {
        //                 latitude: selectedFarm.coordinates[0]?.lat ?? 0.0,
        //                 longitude: selectedFarm.coordinates[0]?.lng ?? 0.0,
        //               }
        //             : { latitude: 0.0, longitude: 0.0 },
        //         heading: 0,
        //         pitch: 0,
        //         zoom: 17,
        //       }
        //     : undefined
        // }
      >
        {fieldData &&
          fieldData.fieldMinLat &&
          fieldData.fieldMinLong &&
          fieldData.fieldMinLat !== '' &&
          fieldData.fieldMinLong !== '' &&
          fieldData.fieldMaxLat &&
          fieldData.fieldMaxLong &&
          fieldData.fieldMaxLat !== '' &&
          fieldData.fieldMaxLong !== '' &&
          fieldData.imageUrl &&
          fieldData.imageUrl !== '' && (
            <Overlay
              image={{
                uri: fieldData.imageUrl,
              }}
              bounds={[
                [Number(fieldData.fieldMinLat), Number(fieldData.fieldMinLong)],
                [Number(fieldData.fieldMaxLat), Number(fieldData.fieldMaxLong)],
              ]}
            />
          )}

        {selectedFarm &&
          selectedFarm.coordinates &&
          selectedFarm.coordinates.length > 0 && (
            <Marker
              coordinate={{
                latitude: selectedFarm.coordinates[0]?.lat ?? 0.0,
                longitude: selectedFarm.coordinates[0]?.lng ?? 0.0,
              }}
            />
          )}
      </MapView>
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
        isLoading={findFieldPdf.isLoading}
        disabled={findFieldPdf.isLoading}
        onPress={getPdfUrl}
        //onPress={() => setReportVisible(true)}
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
        {'Download Report'}
      </Button>
      {/* <View
        width={'85%'}
        position={'absolute'}
        bottom={10}
        alignSelf={'flex-start'}
      >
        <SateliteReportCell />
      </View> */}

      {(senseDays.isLoading || fieldAreaIndexImg.isLoading) && <AppLoader />}

      {/* <Modal
        coverScreen={true}
        backdropColor="white"
        style={{ margin: 0 }}
        isVisible={isReportVisible}
        onDismiss={() => setReportVisible(false)}
        onModalHide={() => setReportVisible(false)}
      >
        <SateLiteReportModal onDismiss={() => setReportVisible(false)} />
      </Modal> */}
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
