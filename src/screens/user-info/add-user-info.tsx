import { Button, View } from 'native-base';
import React from 'react';
import { I18nManager } from 'react-native';

import { translate, useSelectedLanguage } from '@/core';
import type { Language } from '@/core/i18n/resources';
import type { Option } from '@/ui';
import Header from '@/ui/components/Header';
import RoundInput from '@/ui/components/RoundInput';
import colors from '@/ui/theme/colors';

function AddUserInfo() {
  const { language, setLanguage } = useSelectedLanguage();

  const onSelect = React.useCallback(
    (option: Option) => {
      setLanguage(option.value as Language);
      if ((option.value as Language) === 'en') {
        I18nManager.forceRTL(false); // false for LTR direction
      } else {
        I18nManager.forceRTL(true);
      }
    },
    [setLanguage]
  );

  return (
    <View flex={1} mx={5}>
      <Header title="Account Data" mt={10} />
      <RoundInput mt={5} placeholder="name" />
      <RoundInput mt={5} placeholder="e-mail" />
      <RoundInput mt={5} placeholder="mobile" />
      {/* <RoundInput mt={5} placeholder="password" />
      <Header
        title="Register as a company?"
        mt={5}
        fontSize={13}
        fontWeight={'normal'}
      />
      <Radio.Group
        name="exampleGroup"
        defaultValue="1"
        accessibilityLabel="pick a size"
      >
        <Stack
          mt={3}
          direction={{
            base: 'row',
            md: 'row',
          }}
          alignItems={{
            base: 'flex-start',
            md: 'center',
          }}
          space={4}
          w="75%"
          maxW="300px"
        >
          <Radio value="1" colorScheme="red" size="sm" my={1}>
            Yes
          </Radio>
          <Radio value="0" colorScheme="red" size="sm" my={1}>
            No
          </Radio>
        </Stack>
      </Radio.Group> */}

      <Button
        position={'absolute'}
        backgroundColor={colors.button_color}
        bottom={10}
        onPress={() => {
          if (I18nManager.isRTL) {
            onSelect({ label: translate('settings.english'), value: 'en' });
          } else {
            onSelect({ label: translate('settings.arabic'), value: 'ar' });
          }
        }}
        borderRadius={8}
        width={'80%'}
        fontWeight={'normal'}
        fontSize={20}
        overflow={'hidden'}
        alignSelf={'center'}
      >
        Continue
      </Button>
    </View>
  );
}
export default AddUserInfo;
