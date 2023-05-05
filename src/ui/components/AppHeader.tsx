import { Icon, Text, View } from 'native-base';
import type {
  ResponsiveValue,
  ThemeComponentSizeType,
} from 'native-base/lib/typescript/components/types';
import type {
  IFontSize,
  IFontWeight,
} from 'native-base/lib/typescript/theme/base/typography';
import React from 'react';
import { I18nManager, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../theme/colors';

type Props = {
  iconSize?: ThemeComponentSizeType<'Icon'>;
  iconName?: string;
  title: string;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  fontSize?: ResponsiveValue<IFontSize | number | (string & {})>;
  color?: string;
  fontWeight?: ResponsiveValue<IFontWeight | number | (string & {})>;
  onBackPress?: () => void;
};

export default function AppHeader({
  iconName,
  title,
  color = '#000',
  fontSize = 'xl',
  fontWeight = '700',
  iconSize = 'lg',
  onBackPress,
}: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View shadow={2} backgroundColor={'white'}>
      <View
        flexDirection={'row'}
        alignItems={'center'}
        py={3}
        mt={insets.top}
        // style={{
        //   shadowColor: '#000',
        //   shadowOffset: {
        //     width: 0,
        //     height: 2,
        //   },
        //   shadowOpacity: 0.25,
        //   shadowRadius: 3.84,

        //   elevation: 5,
        // }}
      >
        {iconName && (
          <Pressable onPress={() => onBackPress && onBackPress()}>
            <Icon
              as={MaterialCommunityIcons}
              name={iconName ? iconName : 'arrow-u-right-top'}
              size={iconSize}
              color={colors.button_color}
              marginLeft={4}
            />
          </Pressable>
        )}
        <Text
          marginLeft={iconName ? 4 : 0}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={color}
          width={iconName ? undefined : '100%'}
          alignSelf={'center'}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            textAlign: iconName
              ? I18nManager.isRTL
                ? 'left'
                : 'right'
              : 'center',
          }} //}}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}
