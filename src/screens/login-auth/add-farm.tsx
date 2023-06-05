import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet } from 'react-native';

import { usePutApiAccountUpdatefcmtoken } from '@/apis/endpoints/api';
import Stepper from '@/ui/components/Stepper';
import { button_color } from '@/ui/theme/colors';

import AddCropMaps from '../crop/add-crop-maps';
import AddFramCropMaps from '../farm/add-farm-maps';
import AddUserInfo from '../user-info/add-user-info';

const AddFarmScreen = () => {
  const [active, setActive] = useState(0);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const putToken = usePutApiAccountUpdatefcmtoken();
  const onNextSubmit = () => {
    setActive((p) => {
      headerTitle(p + 1);
      return p + 1;
    });
  };
  const onPreviousSubmit = () => {
    setActive((p) => {
      headerTitle(p - 1);
      return p - 1;
    });
  };
  const headerTitle = (v: Number) => {
    if (v === 0) {
      navigation.setOptions({ title: t('create-new-account') });
    } else if (v === 1) {
      navigation.setOptions({ title: t('form-data') });
    } else if (v === 2) {
      navigation.setOptions({ title: t('register-crop') });
    }
  };

  useEffect(() => {
    const getToken = async () => {
      // Register the device with FCM
      await messaging().registerDeviceForRemoteMessages();

      // Get the token
      const token = await messaging().getToken();
      putToken.mutate({
        params: {
          fcmToken: token,
        },
      });
    };
    headerTitle(active);
    getToken();
  }, []);

  const content = [
    {
      content: <AddUserInfo onNextSubmit={onNextSubmit} />,
      title: t('account-data'),
    },
    // { content: <MyComponent />, title: t('form-data') },
    {
      content: <AddFramCropMaps onNextStep={onNextSubmit} />,
      title: t('form-data'),
    },
    {
      content: <AddCropMaps onPreviousSubmit={onPreviousSubmit} />,
      title: t('enter-crop'),
    },
  ];

  return (
    <View style={styles.fullscreen} pt={5}>
      <View flex={1}>
        <Stepper
          stepStyle={styles.stepStyle}
          stepTextStyle={styles.stepTxtStyle}
          selectedBackgroundColor={button_color}
          selectedBorderColor={button_color}
          selectedTextColor={'white'}
          xSpace={22}
          active={active}
          showButton={false}
          content={content}
          wrapperStyle={{ flex: 1 }}
          titleTextStyle={{ fontSize: 11, marginTop: 5, color: button_color }}
          onNext={() => setActive((p) => p + 1)}
          onBack={() => setActive((p) => p - 1)}
          onFinish={() => Alert.alert('Finish')}
        />
      </View>
    </View>
  );
};

export default AddFarmScreen;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  stepStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: button_color,
    opacity: 1,
  },
  stepTxtStyle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: button_color,
  },
});
