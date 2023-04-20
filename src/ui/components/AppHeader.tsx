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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  fontWeight = 'extrabold',
  iconSize = 'xl',
  onBackPress,
}: Props) {
  return (
    <View
      flexDirection={'row'}
      alignItems={'center'}
      backgroundColor={'white'}
      py={3}
      shadow={2}
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
            color={'#000'}
            marginLeft={4}
          />
        </Pressable>
      )}
      <Text
        marginLeft={4}
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={color}
        alignSelf={'center'}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ textAlign: I18nManager.isRTL ? 'left' : 'right' }}
      >
        {title}
      </Text>
    </View>
  );
}
