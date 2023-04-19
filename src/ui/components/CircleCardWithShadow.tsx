import React, {PropsWithChildren} from 'react';

import {Box} from 'native-base';
import {SizeType} from 'native-base/lib/typescript/components/types';

type Props = {
  bgColor?: string;
  shadow?: string;
  size?: SizeType;
  borderColor?: string;
  borderWidth?: SizeType;
  overflow?: string;
};
export default function CircleCardWithShadow({
  bgColor = 'white',
  overflow,
  shadow = '5',
  size = '40',
  borderColor = 'white',
  borderWidth = 1,
  children,
}: PropsWithChildren<Props>) {
  if (overflow) {
    return (
      <Box
        borderColor={borderColor}
        borderWidth={borderWidth}
        bgColor={bgColor}
        my={2}
        mx={2}
        w={size}
        h={size}
        overflow={overflow}
        shadow={shadow}
        borderRadius={'full'}>
        {children}
      </Box>
    );
  } else {
    return (
      <Box
        borderColor={borderColor}
        borderWidth={borderWidth}
        bgColor={bgColor}
        my={2}
        mx={2}
        w={size}
        h={size}
        shadow={shadow}
        borderRadius={'full'}>
        {children}
      </Box>
    );
  }
}
