import { HStack, Icon, Text, View } from 'native-base';
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
import { Dimensions, I18nManager, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../theme/colors';

type Props = {
  isSeeAllShow?: boolean;
  iconColor?: ResponsiveValue<IColors | (string & {})>;
  iconSize?: ThemeComponentSizeType<'Icon'>;
  iconLeftSize?: ThemeComponentSizeType<'Icon'>;
  iconName?: string;
  iconLeftName?: string;
  title: string;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  as?: any;
  asLeft?: any;
  fontSize?: ResponsiveValue<IFontSize | number | (string & {})>;
  color?: string;
  fontWeight?: ResponsiveValue<IFontWeight | number | (string & {})>;
  btnTitle?: string;
  onRightIconClick?: () => void;
  numberOfLines?: number | undefined;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
};

export default function ListHeader({
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
  textAlign,
  iconLeftName,
  iconLeftSize,
  asLeft,
  isSeeAllShow = true,
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
      <HStack alignItems={'center'}>
        {iconLeftName && (
          <Icon
            color={iconColor}
            as={asLeft}
            name={iconLeftName}
            size={iconLeftSize}
          />
        )}
        <Text
          maxW={
            Dimensions.get('window').width - Dimensions.get('window').width / 2
          }
          numberOfLines={numberOfLines}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={'heading'}
          color={color}
          style={{
            textAlign: textAlign
              ? textAlign
              : I18nManager.isRTL
              ? 'left'
              : 'right',
          }}
        >
          {title}
        </Text>
      </HStack>

      {(btnTitle || iconName) && isSeeAllShow && (
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => onRightIconClick && onRightIconClick()}
        >
          <HStack alignItems={'center'}>
            {btnTitle && (
              <Text px={2} color={colors.TITLE_COLOR} fontStyle={'normal'}>
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
        </TouchableOpacity>
      )}
    </View>
  );
}
