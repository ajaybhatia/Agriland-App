import { View } from 'native-base';
import React from 'react';

import AddCropMaps, { AddCropRegisterType } from './add-crop-maps';

const CropRegistration = () => {
  return (
    <View flex={1}>
      <AddCropMaps registerType={AddCropRegisterType.FROM_HOME} />
    </View>
  );
};

export default CropRegistration;
