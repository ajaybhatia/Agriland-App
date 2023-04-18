import { Input, View } from 'native-base';
import React from 'react';

import { BORDER_COLOR_DARK } from '../theme/colors';

type Props = {
  value?: string;
  placeholder?: string;
  onChangeText?: ((text: string) => void) | undefined;
  mt?: number;
};

export default function RoundedInputPassword({
  value = '',
  onChangeText,
  mt = 2,
  placeholder = 'Enter text here...'
}: Props) {
  return (
    <View>
      <Input
        mt={mt}
        multiline={true}
        py={3}
        placeholder={placeholder}
        borderWidth={2}
        value={value}
        borderColor={BORDER_COLOR_DARK}
        color="#000"
        bgColor={'white'}
        borderRadius={15}
        focusOutlineColor={BORDER_COLOR_DARK}
        variant="outline"
        size="xl"
        _input={{ color: '#000', fontSize: 12 }}
        onChangeText={onChangeText}
      />
    </View>
  );
}
