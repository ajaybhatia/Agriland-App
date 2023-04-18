import { Icon, Text, View } from 'native-base';
import type {
  ResponsiveValue,
  ThemeComponentSizeType,
} from 'native-base/lib/typescript/components/types';
import type { IFontWeight } from 'native-base/lib/typescript/theme/base/typography';
import React from 'react';
import { I18nManager } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  iconSize?: ThemeComponentSizeType<'Icon'>;
  iconName?: string;
  title: string;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  fontSize?: number | string;
  color?: string;
  fontWeight?: ResponsiveValue<IFontWeight | number | (string & {})>;
};

export default function Header({
  iconName,
  title,
  ml = 0,
  mr = 0,
  mb = 0,
  mt = 0,
  color = '#000',
  fontSize = 'lg',
  fontWeight = 'medium',
  iconSize = '2xl',
}: Props) {
  return (
    <View
      ml={ml}
      mr={mr}
      mb={mb}
      mt={mt}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={color}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ textAlign: I18nManager.isRTL ? 'left' : 'right' }}
      >
        {title}
      </Text>

      {iconName && (
        <Icon
          as={MaterialCommunityIcons}
          name={
            iconName
              ? iconName
              : !I18nManager.isRTL
              ? 'arrow-right-thin'
              : 'arrow-left-thin'
          }
          size={iconSize}
        />
      )}
    </View>
  );
}
