import { Box } from 'native-base';
import type { PropsWithChildren } from 'react';
import React from 'react';

type Props = {
  bgColor?: string;
  shadow?: string;
  mx?: number;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  overflow?: string;
};
export default function CardWithShadow({
  bgColor = 'white',
  shadow = '5',
  mx = 5,
  borderColor = 'white',
  borderWidth = 1,
  borderRadius,
  children,
  overflow = 'hidden',
}: PropsWithChildren<Props>) {
  return (
    <Box
      borderWidth={borderWidth}
      borderColor={borderColor}
      bgColor={bgColor}
      my={2}
      mx={mx}
      shadow={shadow}
      overflow={overflow}
      borderRadius={borderRadius ? borderRadius : 'xl'}
    >
      {children}
    </Box>
  );
}
