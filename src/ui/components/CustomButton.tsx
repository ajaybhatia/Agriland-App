import { Button } from 'native-base';
import type { ResponsiveValue } from 'native-base/lib/typescript/components/types';
import React from 'react';

import { colors } from '../theme';

type Props = {
  onPress?: () => void;
  title: string;
  width?: ResponsiveValue<(string & {}) | (number & {})>;
  mt?: number;
  mb?: number;
  isLoading?: boolean;
};

function CustomButton({
  onPress,
  title,
  width = '80%',
  mt = 10,
  isLoading,
  mb,
}: Props) {
  return (
    <Button
      isLoading={isLoading}
      onPress={onPress}
      backgroundColor={colors.button_color}
      mt={mt}
      mb={mb}
      borderRadius={8}
      width={width}
      overflow={'hidden'}
      alignSelf={'center'}
      _text={{
        fontWeight: '400',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        fontStyle: 'normal',
      }}
    >
      {title}
    </Button>
  );
}

export default CustomButton;
