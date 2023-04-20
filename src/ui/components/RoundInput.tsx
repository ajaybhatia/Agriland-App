import { FormControl, Input, View } from 'native-base';
import React from 'react';
import { I18nManager } from 'react-native';

import { BORDER_COLOR_DARK } from '../theme/colors';

type Props = {
  value?: string;
  placeholder?: string;
  onChangeText?: ((text: string) => void) | undefined;
  mt?: number;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errors?: any;
  maxLength?: number | undefined;
};

export default function RoundInput({
  value = '',
  onChangeText,
  mt = 2,
  placeholder = 'Enter text here...',
  isDisabled = false,
  errors,
  isInvalid,
  maxLength,
}: Props) {
  return (
    <View>
      <FormControl isInvalid={isInvalid}>
        <Input
          mt={mt}
          multiline={true}
          py={3}
          isDisabled={isDisabled}
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
          placeholder={placeholder}
          borderWidth={2}
          value={value}
          borderColor={BORDER_COLOR_DARK}
          color="#000"
          bgColor={'white'}
          maxLength={maxLength}
          borderRadius={15}
          focusOutlineColor={BORDER_COLOR_DARK}
          variant="outline"
          size="xl"
          _input={{ color: '#000', fontSize: 12 }}
          onChangeText={onChangeText}
        />
        <FormControl.ErrorMessage>{errors}</FormControl.ErrorMessage>
      </FormControl>
    </View>
  );
}
