import { HStack, Icon, Pressable, Text, View } from 'native-base';
import type {
  ResponsiveValue,
  ThemeComponentSizeType,
} from 'native-base/lib/typescript/components/types';
import type { IColors } from 'native-base/lib/typescript/theme/base/colors';
import type {
  IFontSize,
  IFontWeight,
} from 'native-base/lib/typescript/theme/base/typography';
import React from 'react';
import { I18nManager } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../theme/colors';

type Props = {
  iconColor?: ResponsiveValue<IColors | (string & {})>;
  iconSize?: ThemeComponentSizeType<'Icon'>;
  iconName?: string;
  title: string;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  as?: any;
  fontSize?: ResponsiveValue<IFontSize | number | (string & {})>;
  color?: string;
  fontWeight?: ResponsiveValue<IFontWeight | number | (string & {})>;
  btnTitle?: string;
  onRightIconClick?: () => void;
  numberOfLines?: number | undefined;
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
  as = MaterialCommunityIcons,
  btnTitle,
  onRightIconClick,
  iconColor = colors.TITLE_COLOR,
  numberOfLines,
}: Props) {
  return (
    <View
      ml={ml}
      mr={mr}
      mb={mb}
      mt={mt}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={btnTitle || iconName ? 'space-between' : 'flex-start'}
    >
      <Text
        numberOfLines={numberOfLines}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={'heading'}
        color={color}
        fontStyle={'normal'}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ textAlign: I18nManager.isRTL ? 'left' : 'right' }}
      >
        {title}
      </Text>
      {(btnTitle || iconName) && (
        <Pressable
          alignItems={'center'}
          onPress={() => onRightIconClick && onRightIconClick()}
        >
          <HStack alignItems={'center'}>
            {btnTitle && (
              <Text px={2} color={colors.TITLE_COLOR} fontStyle={'italic'}>
                {btnTitle}
              </Text>
            )}
            {iconName && (
              <Icon
                color={iconColor}
                as={as}
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
          </HStack>
        </Pressable>
      )}
    </View>
  );
}
