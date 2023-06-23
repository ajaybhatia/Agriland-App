import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'native-base';
import React, { useCallback, useState } from 'react';

import type { FarmResponse } from '@/apis/model';
import { useSatelliteFarm } from '@/core/satellite-farm';
import colors from '@/ui/theme/colors';

import FarmerListCell from '../home/components/farmer-list-cell';

type Props = {};

const ChooseSateliteFarmScreen = (props: Props) => {
  const setSelectedFarmState = useSatelliteFarm.use.setData();
  const selectedFarm = useSatelliteFarm.use.selectedFarm();
  const [isLoading, setLoading] = useState<boolean>(true);
  const nav = useNavigation();
  const onSelectFarm = useCallback(
    (item: FarmResponse) => {
      setSelectedFarmState(item);
    },
    [setSelectedFarmState]
  );
  return (
    <View justifyContent={'center'} flex={1}>
      <Text
        fontSize={15}
        mx={5}
        fontFamily={'body'}
        mb={3}
        fontWeight={'600'}
        fontStyle={'normal'}
      >
        Choose the farm for which you want to view satellite
      </Text>
      <FarmerListCell
        onSelectedFarm={onSelectFarm}
        selectedFarm={selectedFarm}
        onLoading={setLoading}
      />
      <Button
        onPress={() => nav.navigate('SateliteDemoMapScreen')}
        backgroundColor={colors.button_color}
        borderRadius={8}
        disabled={!selectedFarm}
        width={'80%'}
        isLoading={isLoading}
        mt={'10'}
        fontWeight={'normal'}
        fontSize={20}
        overflow={'hidden'}
        alignSelf={'center'}
      >
        {'Continue'}
      </Button>
    </View>
  );
};

export default ChooseSateliteFarmScreen;
