import { Button, FlatList, View } from 'native-base';
import React from 'react';

import colors from '@/ui/theme/colors';

import SateliteReportCell from './components/satelite-report-cell';

type Props = {
  onDismiss?: () => void;
};

const SateLiteReportModal = ({ onDismiss }: Props) => {
  return (
    <View flex={1}>
      <FlatList
        pagingEnabled
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(item, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        initialNumToRender={3}
        renderItem={({ item, index }: { item: string; index: number }) => (
          <SateliteReportCell />
        )}
        //estimatedItemSize={300}
      />
      <Button
        onPress={onDismiss}
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
        {'Dismiss'}
      </Button>
    </View>
  );
};

export default SateLiteReportModal;
