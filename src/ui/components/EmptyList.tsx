import { Text, View } from 'native-base';
import React from 'react';

import { black } from '../theme/colors';

type Props = {
  value?: String;
};
export default function EmptyList({ value = 'Data not found' }: Props) {
  return (
    <View flex={1} pt={150} justifyContent={'center'} alignItems={'center'}>
      <Text color={black}>{value}</Text>
    </View>
  );
}
