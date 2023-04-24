import { Text, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet } from 'react-native';
import Stepper from 'react-native-stepper-ui';

import { button_color } from '@/ui/theme/colors';

import AddFramCropMaps from '../maps-views/add-farm-crop-maps';
import AddUserInfo from '../user-info/add-user-info';

const AddFarmScreen = () => {
  const [active, setActive] = useState(1);
  const { t } = useTranslation();
  const onUseInfoSubmit = () => {
    setActive((p) => p + 1);
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const MyComponent = () => {
    return (
      <View justifyContent={'center'} alignItems={'center'} flex={1}>
        <Text>{'map'}</Text>
      </View>
    );
  };

  const content = [
    {
      content: <AddUserInfo onNextSubmit={onUseInfoSubmit} />,
      title: t('account-data'),
    },
    // { content: <MyComponent />, title: t('form-data') },
    {
      content: <AddFramCropMaps />,
      title: t('form-data'),
    },
    {
      content: <AddFramCropMaps />,
      title: t('enter-crop'),
    },
  ];

  return (
    <View style={styles.fullscreen} marginTop={5}>
      <View flex={1}>
        {/* <AppHeader
          title="Create a new account"
          iconName={'arrow-u-right-top'}
        /> */}
        <Stepper
          stepStyle={styles.stepStyle}
          stepTextStyle={styles.stepTxtStyle}
          selectedBackgroundColor={button_color}
          selectedBorderColor={button_color}
          selectedTextColor={'white'}
          xSpace={10}
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
  },
  stepStyle: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: button_color,
    opacity: 1,
  },
  stepTxtStyle: {
    color: button_color,
  },
});
