import { FlatList, View } from 'native-base';
import React from 'react';

import type { OperationItem } from './components/operation-item-cell';
import OperationItemCell from './components/operation-item-cell';

const AddOperationScreen = () => {
  const array: OperationItem[] = [
    {
      title: 'Services',
      btn1: 'Crop Registration',
      btn1Icon: 'crop-landscape',
      btn2: 'Station Booking',
      btn2Icon: 'directions-railway',
      btn3: 'Tests',
      btn3Icon: 'confirmation-num',
    },
    {
      title: 'Agricultural Market',
      btn1: 'Crop Marketing',
      btn2: 'Production Supplies',
      btn3: 'Crop Loan',
      btn1Icon: 'surround-sound',
      btn2Icon: 'sim-card',
      btn3Icon: 'money',
    },
    {
      title: 'Information Center',
      btn1: 'Weather Changes',
      btn2: 'Satellite Data',
      btn3: 'Social Media',
      btn1Icon: 'cloud',
      btn2Icon: 'satellite',
      btn3Icon: 'perm-media',
    },
  ];
  return (
    <View flex={1} backgroundColor={'white'}>
      <FlatList
        data={array}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({
          item,
          index,
        }: {
          item: OperationItem;
          index: number;
        }) => {
          return <OperationItemCell btns={item} />;
        }}
      />
    </View>
  );
};

export default AddOperationScreen;
