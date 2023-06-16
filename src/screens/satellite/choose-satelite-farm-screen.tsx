import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'native-base';
import React, { useCallback, useState } from 'react';

import type { FarmResponse } from '@/apis/model';
import colors from '@/ui/theme/colors';

import FarmerListCell from '../home/components/farmer-list-cell';

type Props = {};

const ChooseSateliteFarmScreen = (props: Props) => {
  const [selectedFarm, setSelectedFarm] = useState<FarmResponse | undefined>();
  const nav = useNavigation();
  const onSelectFarm = useCallback(
    (item: FarmResponse) => {
      setSelectedFarm(item);
    },
    [setSelectedFarm]
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
        Choose the far for which you want to view satellite
      </Text>
      <FarmerListCell
        onSelectedFarm={onSelectFarm}
        selectedFarm={selectedFarm}
      />
      <Button
        onPress={() => nav.navigate('SateliteDemoMapScreen')}
        backgroundColor={colors.button_color}
        borderRadius={8}
        width={'80%'}
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
