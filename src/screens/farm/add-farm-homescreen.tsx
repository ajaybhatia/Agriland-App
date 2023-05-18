import { View } from 'native-base';
import React from 'react';

import AddFramCropMaps, { AddfarmFrom } from './add-farm-maps';

const AddFarmHomeScreen = () => {
  return (
    <View flex={1}>
      <AddFramCropMaps addFarmFrom={AddfarmFrom.HOMESCREEN} />
    </View>
  );
};

export default AddFarmHomeScreen;
