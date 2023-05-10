import { View, VStack } from 'native-base';
import React from 'react';
import Counter from 'react-native-counters';

import { BORDER_COLOR_DARK } from '../theme/colors';
import Header from './Header';

type Props = {
  title?: string;
  defaultValue?: number;
  onNewNumber?: (value: number) => void;
};

export default function CounterInput({
  title,
  defaultValue,
  onNewNumber,
}: Props) {
  return (
    <VStack mt={3}>
      {title && (
        <Header title={title} fontWeight={'700'} fontSize={17} mb={2} />
      )}
      <View
        borderWidth={2}
        borderColor={BORDER_COLOR_DARK}
        borderRadius={15}
        bgColor={'white'}
        py={3}
        px={3}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Counter
          start={defaultValue}
          min={1}
          max={100000000}
          buttonStyle={{
            borderColor: BORDER_COLOR_DARK,
            borderWidth: 2,
            backgroundColor: BORDER_COLOR_DARK,
          }}
          buttonTextStyle={{
            color: '#FFF',
          }}
          countTextStyle={{
            color: '#333',
          }}
          onChange={(v: number, type: any) => {
            console.log('onChange ==> ', v, type);
            onNewNumber && onNewNumber(v);
          }}
        />
        {/* <IconButton
          onPress={removeNumber}
          borderColor={'white'}
          borderWidth={2}
          borderRadius={10}
          tintColor={BORDER_COLOR_DARK}
          backgroundColor={BORDER_COLOR_DARK}
          size={8}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name={'minus'}
              size={'md'}
              color={'white'}
            />
          }
        />
        <BodyTitle
          numberOfLines={1}
          title={`${numberValue}`}
          fontSize={12}
          fontWeight={200}
        />
        <IconButton
          onPress={addNumber}
          borderColor={'white'}
          borderWidth={2}
          borderRadius={10}
          tintColor={BORDER_COLOR_DARK}
          backgroundColor={BORDER_COLOR_DARK}
          size={8}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name={'plus'}
              size={'md'}
              color={'white'}
            />
          }
        /> */}
      </View>
    </VStack>
  );
}
